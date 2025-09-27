import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const showAll = searchParams.get('all') === 'true'

		// Hero background images ni olish
		const heroImages = await prisma.heroImage.findMany({
			where: showAll
				? {}
				: {
						active: true,
				  },
			orderBy: {
				order: 'asc',
			},
		})

		return NextResponse.json(heroImages)
	} catch (error) {
		console.error('Error fetching hero images:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch hero images' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { imageUrl, order } = body

		if (!imageUrl) {
			return NextResponse.json(
				{ error: 'Image URL is required' },
				{ status: 400 }
			)
		}

		// Save to database
		const heroImage = await prisma.heroImage.create({
			data: {
				url: imageUrl,
				fileName: 'hero-image',
				order: order || 1,
				active: true,
			},
		})

		return NextResponse.json(heroImage, { status: 201 })
	} catch (error) {
		console.error('Error creating hero image:', error)
		return NextResponse.json(
			{ error: 'Failed to create hero image' },
			{ status: 500 }
		)
	}
}
