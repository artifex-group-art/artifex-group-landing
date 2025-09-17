import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import formidable from 'formidable'
import { uploadToS3 } from '@/lib/s3'
import { readFile } from 'fs/promises'

export const config = {
	api: {
		bodyParser: false,
	},
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user || session.user.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const form = formidable({
			maxFileSize: 10 * 1024 * 1024, // 10MB
			filter: ({ mimetype }) => {
				return mimetype?.startsWith('image/') || false
			},
		})

		const data = await request.formData()
		const file = data.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
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
