import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			include: {
				author: {
					select: {
						name: true,
						email: true,
					},
				},
				category: {
					select: {
						id: true,
						name: true,
						slug: true,
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

		return NextResponse.json(projects)
	} catch (error) {
		console.error('Error fetching projects:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { title, description, categoryId, published, featured, images } = body

		// Generate slug from title
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		// Ensure admin user exists in database
		let authorId = session.user.id
		if (session.user.id === 'admin') {
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

		const project = await prisma.project.create({
			data: {
				title,
				description,
				slug,
				categoryId,
				published: published || false,
				featured: featured || false,
				authorId,
				imageUrl: images?.[0]?.url || null, // Backward compatibility
				images: {
					create:
						images?.map((img: any, index: number) => ({
							url: img.url,
							fileName: img.fileName,
							fileSize: img.fileSize,
							mimeType: img.mimeType,
							caption: img.caption,
							order: index,
						})) || [],
				},
			},
			include: {
				author: {
					select: {
						name: true,
						email: true,
					},
				},
				category: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
				images: {
					orderBy: {
						order: 'asc',
					},
				},
			},
		})

		return NextResponse.json(project, { status: 201 })
	} catch (error) {
		console.error('Error creating project:', error)
		return NextResponse.json(
			{ error: 'Failed to create project' },
			{ status: 500 }
		)
	}
}
