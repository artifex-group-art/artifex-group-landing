import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			where: {
				published: true,
			},
			include: {
				category: true,
				images: {
					orderBy: { order: 'asc' },
				},
			},
			orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
		})

		return NextResponse.json(projects)
	} catch (error) {
		console.error('Error fetching published projects:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		)
	}
}
