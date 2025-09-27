'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Upload,
	X,
	Image as ImageIcon,
	CheckCircle,
	AlertCircle,
} from 'lucide-react'

interface HeroImage {
	id: string
	url: string
	fileName: string
	fileSize?: number
	order: number
	active: boolean
	createdAt: string
}

interface HeroImageUploadProps {
	onUploadSuccess: (image: HeroImage) => void
	onUploadError: (error: string) => void
}

export default function HeroImageUpload({
	onUploadSuccess,
	onUploadError,
}: HeroImageUploadProps) {
	const [isDragging, setIsDragging] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [uploadStatus, setUploadStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle')
	const [statusMessage, setStatusMessage] = useState('')

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}, [])

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
	}, [])

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)

		const files = Array.from(e.dataTransfer.files)
		if (files.length > 0) {
			handleFileUpload(files[0])
		}
	}, [])

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files
			if (files && files.length > 0) {
				handleFileUpload(files[0])
			}
		},
		[]
	)

	const handleFileUpload = async (file: File) => {
		// Validate file type
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
		if (!allowedTypes.includes(file.type)) {
			setUploadStatus('error')
			setStatusMessage('Only JPEG, PNG, and WebP images are allowed')
			onUploadError('Only JPEG, PNG, and WebP images are allowed')
			return
		}

		// Validate file size (max 10MB)
		const maxSize = 10 * 1024 * 1024 // 10MB
		if (file.size > maxSize) {
			setUploadStatus('error')
			setStatusMessage('File size must be less than 10MB')
			onUploadError('File size must be less than 10MB')
			return
		}

		setIsUploading(true)
		setUploadStatus('idle')

		try {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('order', '0') // Default order

			const response = await fetch('/api/hero-images', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Upload failed')
			}

			const uploadedImage = await response.json()

			setUploadStatus('success')
			setStatusMessage('Image uploaded successfully!')
			onUploadSuccess(uploadedImage)

			// Reset status after 3 seconds
			setTimeout(() => {
				setUploadStatus('idle')
				setStatusMessage('')
			}, 3000)
		} catch (error) {
			console.error('Upload error:', error)
			const errorMessage =
				error instanceof Error ? error.message : 'Upload failed'
			setUploadStatus('error')
			setStatusMessage(errorMessage)
			onUploadError(errorMessage)

			// Reset status after 5 seconds
			setTimeout(() => {
				setUploadStatus('idle')
				setStatusMessage('')
			}, 5000)
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<div className='space-y-4'>
			{/* Upload Area */}
			<div
				className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
					isDragging
						? 'border-blue-500 bg-blue-50'
						: isUploading
						? 'border-yellow-500 bg-yellow-50'
						: uploadStatus === 'success'
						? 'border-green-500 bg-green-50'
						: uploadStatus === 'error'
						? 'border-red-500 bg-red-50'
						: 'border-gray-300 hover:border-gray-400 bg-gray-50'
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input
					type='file'
					accept='image/*'
					onChange={handleFileSelect}
					className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
					disabled={isUploading}
				/>

				<div className='flex flex-col items-center space-y-4'>
					{isUploading ? (
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
							className='w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full'
						/>
					) : uploadStatus === 'success' ? (
						<CheckCircle className='w-12 h-12 text-green-500' />
					) : uploadStatus === 'error' ? (
						<AlertCircle className='w-12 h-12 text-red-500' />
					) : (
						<>
							{isDragging ? (
								<Upload className='w-12 h-12 text-blue-500' />
							) : (
								<ImageIcon className='w-12 h-12 text-gray-400' />
							)}
						</>
					)}

					<div className='space-y-2'>
						<p className='text-lg font-medium text-gray-900'>
							{isUploading
								? 'Uploading...'
								: isDragging
								? 'Drop your image here'
								: 'Drag & drop an image or click to browse'}
						</p>
						<p className='text-sm text-gray-500'>
							Supports JPEG, PNG, WebP (max 10MB)
						</p>
					</div>
				</div>
			</div>

			{/* Status Message */}
			<AnimatePresence>
				{statusMessage && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className={`p-4 rounded-lg flex items-center space-x-2 ${
							uploadStatus === 'success'
								? 'bg-green-100 text-green-800 border border-green-200'
								: 'bg-red-100 text-red-800 border border-red-200'
						}`}
					>
						{uploadStatus === 'success' ? (
							<CheckCircle className='w-5 h-5' />
						) : (
							<AlertCircle className='w-5 h-5' />
						)}
						<span className='font-medium'>{statusMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
