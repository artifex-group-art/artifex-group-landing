import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params

		await prisma.whoWeAreImage.delete({
			where: {
				id,
			},
		})

		return NextResponse.json(
			{ message: 'Image deleted successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error deleting who we are image:', error)
		return NextResponse.json(
			{ error: 'Failed to delete who we are image' },
			{ status: 500 }
		)
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params
		const body = await request.json()
		const { order, active } = body

		const updatedImage = await prisma.whoWeAreImage.update({
			where: {
				id,
			},
			data: {
				...(order !== undefined && { order }),
				...(active !== undefined && { active }),
			},
		})

		return NextResponse.json(updatedImage)
	} catch (error) {
		console.error('Error updating who we are image:', error)
		return NextResponse.json(
			{ error: 'Failed to update who we are image' },
			{ status: 500 }
		)
	}
}
