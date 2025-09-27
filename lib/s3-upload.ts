import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// S3 Client Configuration
const s3Client = new S3Client({
	region: process.env.AWS_REGION || 'us-east-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!

export interface UploadResult {
	url: string
	key: string
	fileName: string
}

/**
 * Upload file to S3 bucket
 */
export async function uploadToS3(
	file: Buffer,
	fileName: string,
	contentType: string
): Promise<UploadResult> {
	// Generate unique key for S3
	const timestamp = Date.now()
	const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
	const key = `hero-images/${timestamp}-${sanitizedFileName}`

	try {
		const command = new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
			Body: file,
			ContentType: contentType,
			ACL: 'public-read', // Make images publicly accessible
		})

		await s3Client.send(command)

		// Generate public URL
		const url = `https://${BUCKET_NAME}.s3.${
			process.env.AWS_REGION || 'us-east-1'
		}.amazonaws.com/${key}`

		return {
			url,
			key,
			fileName: sanitizedFileName,
		}
	} catch (error) {
		console.error('Error uploading to S3:', error)
		throw new Error('Failed to upload image to S3')
	}
}

/**
 * Delete file from S3 bucket
 */
export async function deleteFromS3(key: string): Promise<void> {
	try {
		const command = new DeleteObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		})

		await s3Client.send(command)
	} catch (error) {
		console.error('Error deleting from S3:', error)
		throw new Error('Failed to delete image from S3')
	}
}

/**
 * Generate presigned URL for secure uploads (alternative method)
 */
export async function generatePresignedUrl(
	fileName: string,
	contentType: string
): Promise<{ url: string; key: string }> {
	const timestamp = Date.now()
	const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
	const key = `hero-images/${timestamp}-${sanitizedFileName}`

	try {
		const command = new PutObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
			ContentType: contentType,
			ACL: 'public-read',
		})

		const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1 hour

		return { url, key }
	} catch (error) {
		console.error('Error generating presigned URL:', error)
		throw new Error('Failed to generate presigned URL')
	}
}

/**
 * Validate image file
 */
export function validateImageFile(file: any): {
	isValid: boolean
	error?: string
} {
	// Check file size (max 10MB)
	const maxSize = 10 * 1024 * 1024 // 10MB
	if (file.size > maxSize) {
		return { isValid: false, error: 'File size must be less than 10MB' }
	}

	// Check file type
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
	if (!allowedTypes.includes(file.type)) {
		return {
			isValid: false,
			error: 'Only JPEG, PNG, and WebP images are allowed',
		}
	}

	return { isValid: true }
}
