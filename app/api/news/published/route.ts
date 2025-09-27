import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Faqat published newslarni olish
export async function GET() {
	try {
		const news = await prisma.news.findMany({
			where: {
				published: true,
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
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(news)
	} catch (error) {
		console.error('Error fetching published news:', error)
		return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
	}
}
