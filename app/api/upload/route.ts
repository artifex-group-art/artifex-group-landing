import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { uploadToS3 } from '@/lib/s3'

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const data = await request.formData()
		const file = data.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
		}

		// Validate file size (10MB max)
		if (file.size > 10 * 1024 * 1024) {
			return NextResponse.json(
				{ error: 'File size exceeds 10MB limit' },
				{ status: 400 }
			)
		}

		// Validate file type (images only)
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'Only image files are allowed' },
				{ status: 400 }
			)
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const url = await uploadToS3(buffer, file.name, file.type)

		return NextResponse.json({
			url,
			fileName: file.name,
			fileSize: file.size,
			mimeType: file.type,
		})
	} catch (error) {
		console.error('Error uploading file:', error)
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 }
		)
	}
}
