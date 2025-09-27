import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

// GET - Barcha newslar yoki published newslar
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const publishedOnly = searchParams.get('published') === 'true'
		const all = searchParams.get('all') === 'true'

		const where = publishedOnly
			? { published: true }
			: all
			? {}
			: { published: true }

		const news = await prisma.news.findMany({
			where,
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
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(news)
	} catch (error) {
		console.error('Error fetching news:', error)
		return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
	}
}

// POST - Yangi news yaratish (admin only)
export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { title, description, content, published, featured, images } =
			await request.json()

		// Slug yaratish (title dan)
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		// Slug unique ekanligini tekshirish
		const existingNews = await prisma.news.findUnique({
			where: { slug },
		})

		if (existingNews) {
			return NextResponse.json(
				{ error: 'News with this title already exists' },
				{ status: 400 }
			)
		}

		// Ensure user exists in database
		let authorId = session.user.id
		if (authorId === 'admin') {
			// Create or get admin user from database
			const adminUser = await prisma.user.upsert({
				where: { email: session.user.email! },
				update: {},
				create: {
					email: session.user.email!,
					name: session.user.name || 'Admin',
					role: 'ADMIN',
				},
			})
			authorId = adminUser.id
		}

		const news = await prisma.news.create({
			data: {
				title,
				description,
				content,
				slug,
				published: published || false,
				featured: featured || false,
				authorId,
				...(images &&
					images.length > 0 && {
						images: {
							create: images.map((image: any, index: number) => ({
								url: image.url,
								fileName: image.fileName,
								fileSize: image.fileSize || null,
								mimeType: image.mimeType || null,
								caption: image.caption || null,
								order: index,
							})),
						},
					}),
			},
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

		return NextResponse.json(news, { status: 201 })
	} catch (error) {
		console.error('Error creating news:', error)
		return NextResponse.json(
			{ error: 'Failed to create news' },
			{ status: 500 }
		)
	}
}
