import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			include: {
				_count: {
					select: {
						projects: {
							where: {
								published: true,
							},
						},
					},
				},
			},
			orderBy: {
				name: 'asc',
			},
		})

		return NextResponse.json(categories)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch categories' },
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
		const { name, description } = body

		// Generate slug from name
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		const category = await prisma.category.create({
			data: {
				name,
				description,
				slug,
			},
		})

		return NextResponse.json(category, { status: 201 })
	} catch (error) {
		console.error('Error creating category:', error)
		return NextResponse.json(
			{ error: 'Failed to create category' },
			{ status: 500 }
		)
	}
}
