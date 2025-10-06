import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const showAll = searchParams.get('all') === 'true'

		const whoWeAreImages = await prisma.whoWeAreImage.findMany({
			where: showAll
				? {}
				: {
						active: true,
				  },
			orderBy: {
				order: 'asc',
			},
		})

		return NextResponse.json(whoWeAreImages)
	} catch (error) {
		console.error('Error fetching who we are images:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch who we are images' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { imageUrl, order, fileName, fileSize, mimeType, s3Key } = body

		if (!imageUrl) {
			return NextResponse.json(
				{ error: 'Image URL is required' },
				{ status: 400 }
			)
		}

		// Extract filename from URL if not provided
		const finalFileName =
			fileName || imageUrl.split('/').pop() || 'who-we-are-image'

		const whoWeAreImage = await prisma.whoWeAreImage.create({
			data: {
				url: imageUrl,
				fileName: finalFileName,
				s3Key: s3Key || null,
				fileSize: fileSize || null,
				mimeType: mimeType || null,
				order: order || 0,
				active: true,
			},
		})

		return NextResponse.json(whoWeAreImage, { status: 201 })
	} catch (error) {
		console.error('Error creating who we are image:', error)
		return NextResponse.json(
			{ error: 'Failed to create who we are image' },
			{ status: 500 }
		)
	}
}
