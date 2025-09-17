import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!

export async function uploadToS3(
	buffer: Buffer,
	fileName: string,
	mimeType: string
): Promise<string> {
	const key = `projects/${Date.now()}-${fileName}`

	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key,
		Body: buffer,
		ContentType: mimeType,
		ACL: 'public-read',
	})

	await s3Client.send(command)

	return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

export async function deleteFromS3(url: string): Promise<void> {
	try {
		const key = url.split('.amazonaws.com/')[1]
		if (!key) return

		const command = new DeleteObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key,
		})

		await s3Client.send(command)
	} catch (error) {
		console.error('Error deleting from S3:', error)
	}
}

export async function getPresignedUploadUrl(
	fileName: string,
	mimeType: string
): Promise<{ uploadUrl: string; imageUrl: string }> {
	const key = `projects/${Date.now()}-${fileName}`

	const command = new PutObjectCommand({
		Bucket: BUCKET_NAME,
		Key: key,
		ContentType: mimeType,
		ACL: 'public-read',
	})

	const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
	const imageUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

	return { uploadUrl, imageUrl }
}
