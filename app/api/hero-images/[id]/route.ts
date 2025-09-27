import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deleteFromS3 } from '@/lib/s3-upload'

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params
		const body = await request.json()
		const { imageUrl, order, isActive } = body

		const updateData: any = {}

		if (imageUrl !== undefined) updateData.url = imageUrl
		if (order !== undefined) updateData.order = order
		if (isActive !== undefined) updateData.active = isActive

		const heroImage = await prisma.heroImage.update({
			where: { id },
			data: updateData,
		})

		return NextResponse.json(heroImage)
	} catch (error) {
		console.error('Error updating hero image:', error)
		return NextResponse.json(
			{ error: 'Failed to update hero image' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params

		// Get image from database
		const heroImage = await prisma.heroImage.findUnique({
			where: { id },
		})

		if (!heroImage) {
			return NextResponse.json({ error: 'Image not found' }, { status: 404 })
		}

		// Delete from S3 if s3Key exists
		if (heroImage.s3Key) {
			try {
				await deleteFromS3(heroImage.s3Key)
			} catch (error) {
				console.error('Error deleting from S3:', error)
				// Continue with database deletion even if S3 deletion fails
			}
		}

		// Delete from database
		await prisma.heroImage.delete({
			where: { id },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Error deleting hero image:', error)
		return NextResponse.json(
			{ error: 'Failed to delete hero image' },
			{ status: 500 }
		)
	}
}
