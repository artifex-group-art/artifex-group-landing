import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

// GET - Bitta newsni olish
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params

		const news = await prisma.news.findUnique({
			where: { id },
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				images: {
					orderBy: {
						order: 'asc',
					},
				},
			},
		})

		if (!news) {
			return NextResponse.json({ error: 'News not found' }, { status: 404 })
		}

		return NextResponse.json(news)
	} catch (error) {
		console.error('Error fetching news:', error)
		return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
	}
}

// PUT - Newsni yangilash (admin only)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = params
		const { title, description, content, published, featured, images } =
			await request.json()

		// Agar title o'zgargan bo'lsa, slug ni ham yangilaymiz
		let updateData: any = {
			title,
			description,
			content,
			published,
			featured,
		}

		if (title) {
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '')

			// Slug unique ekanligini tekshirish (o'z ID sidan tashqari)
			const existingNews = await prisma.news.findFirst({
				where: {
					slug,
					NOT: { id },
				},
			})

			if (existingNews) {
				return NextResponse.json(
					{ error: 'News with this title already exists' },
					{ status: 400 }
				)
			}

			updateData.slug = slug
		}

		// Agar images berilgan bo'lsa, eski rasmlarni o'chirib yangisini qo'shamiz
		if (images) {
			await prisma.newsImage.deleteMany({
				where: { newsId: id },
			})

			updateData.images = {
				create: images.map((image: any, index: number) => ({
					url: image.url,
					fileName: image.fileName,
					fileSize: image.fileSize || null,
					mimeType: image.mimeType || null,
					caption: image.caption || null,
					order: index,
				})),
			}
		}

		const news = await prisma.news.update({
			where: { id },
			data: updateData,
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				images: {
					orderBy: {
						order: 'asc',
					},
				},
			},
		})

		return NextResponse.json(news)
	} catch (error) {
		console.error('Error updating news:', error)
		return NextResponse.json(
			{ error: 'Failed to update news' },
			{ status: 500 }
		)
	}
}

// DELETE - Newsni o'chirish (admin only)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = params

		await prisma.news.delete({
			where: { id },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Error deleting news:', error)
		return NextResponse.json(
			{ error: 'Failed to delete news' },
			{ status: 500 }
		)
	}
}
