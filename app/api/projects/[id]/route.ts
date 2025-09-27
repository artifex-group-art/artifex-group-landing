import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const project = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			include: {
				author: {
					select: {
						name: true,
						email: true,
					},
				},
				category: true,
				images: {
					orderBy: {
						order: 'asc',
					},
				},
			},
		})

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		return NextResponse.json(project)
	} catch (error) {
		console.error('Error fetching project:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch project' },
			{ status: 500 }
		)
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { title, description, imageUrl, published, featured } = body

		// Generate slug from title if title changed
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		const project = await prisma.project.update({
			where: {
				id: params.id,
			},
			data: {
				title,
				description,
				imageUrl,
				slug,
				published: published || false,
				featured: featured || false,
			},
			include: {
				author: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		})

		return NextResponse.json(project)
	} catch (error) {
		console.error('Error updating project:', error)
		return NextResponse.json(
			{ error: 'Failed to update project' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await prisma.project.delete({
			where: {
				id: params.id,
			},
		})

		return NextResponse.json({ message: 'Project deleted successfully' })
	} catch (error) {
		console.error('Error deleting project:', error)
		return NextResponse.json(
			{ error: 'Failed to delete project' },
			{ status: 500 }
		)
	}
}
