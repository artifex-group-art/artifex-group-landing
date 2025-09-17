'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
	Upload,
	X,
	Image as ImageIcon,
	Loader2,
	MoveUp,
	MoveDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageUploadProps {
	images: UploadedImage[]
	onChange: (images: UploadedImage[]) => void
	maxImages?: number
}

export interface UploadedImage {
	url: string
	fileName: string
	fileSize: number
	mimeType: string
	caption?: string
}

export function ImageUpload({
	images,
	onChange,
	maxImages = 10,
}: ImageUploadProps) {
	const [uploading, setUploading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			if (images.length + acceptedFiles.length > maxImages) {
				alert(`Maximum ${maxImages} images allowed`)
				return
			}

			setUploading(true)
			setUploadProgress(0)

			try {
				const uploadPromises = acceptedFiles.map(async (file, index) => {
					const formData = new FormData()
					formData.append('file', file)

					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formData,
					})

					if (!response.ok) {
						throw new Error('Upload failed')
					}

					const result = await response.json()
					setUploadProgress(((index + 1) / acceptedFiles.length) * 100)

					return result
				})

				const results = await Promise.all(uploadPromises)
				onChange([...images, ...results])
			} catch (error) {
				console.error('Upload error:', error)
				alert('Failed to upload images')
			} finally {
				setUploading(false)
				setUploadProgress(0)
			}
		},
		[images, maxImages, onChange]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
		},
		multiple: true,
		disabled: uploading || images.length >= maxImages,
	})

	const removeImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index)
		onChange(newImages)
	}

	const updateCaption = (index: number, caption: string) => {
		const newImages = [...images]
		newImages[index] = { ...newImages[index], caption }
		onChange(newImages)
	}

	const moveImage = (index: number, direction: 'up' | 'down') => {
		if (
			(direction === 'up' && index === 0) ||
			(direction === 'down' && index === images.length - 1)
		) {
			return
		}

		const newImages = [...images]
		const targetIndex = direction === 'up' ? index - 1 : index + 1
		;[newImages[index], newImages[targetIndex]] = [
			newImages[targetIndex],
			newImages[index],
		]
		onChange(newImages)
	}

	return (
		<div className='space-y-4'>
			{/* Upload Zone */}
			{images.length < maxImages && (
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
						isDragActive
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25 hover:border-primary/50'
					} ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
				>
					<input {...getInputProps()} />
					<div className='flex flex-col items-center space-y-4'>
						{uploading ? (
							<>
								<Loader2 className='h-8 w-8 animate-spin text-primary' />
								<p className='text-sm text-muted-foreground'>
									Uploading images...
								</p>
								<Progress value={uploadProgress} className='w-full max-w-xs' />
							</>
						) : (
							<>
								<Upload className='h-8 w-8 text-muted-foreground' />
								<div>
									<p className='text-sm font-medium'>
										{isDragActive
											? 'Drop images here'
											: 'Drag & drop images here, or click to select'}
									</p>
									<p className='text-xs text-muted-foreground mt-1'>
										PNG, JPG, WebP up to 10MB each (max {maxImages} images)
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{/* Image List */}
			{images.length > 0 && (
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label className='text-sm font-medium'>
							Uploaded Images ({images.length}/{maxImages})
						</Label>
						{images.length > 0 && (
							<Badge variant='secondary'>{images.length} images</Badge>
						)}
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<AnimatePresence>
							{images.map((image, index) => (
								<motion.div
									key={image.url}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className='relative group border rounded-lg p-4 space-y-3'
								>
									{/* Image Preview */}
									<div className='aspect-video bg-muted rounded-lg overflow-hidden relative'>
										<img
											src={image.url}
											alt={image.fileName}
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />

										{/* Controls */}
										<div className='absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity'>
											<Button
												size='sm'
												variant='secondary'
												onClick={() => moveImage(index, 'up')}
												disabled={index === 0}
											>
												<MoveUp className='h-3 w-3' />
											</Button>
											<Button
												size='sm'
												variant='secondary'
												onClick={() => moveImage(index, 'down')}
												disabled={index === images.length - 1}
											>
												<MoveDown className='h-3 w-3' />
											</Button>
											<Button
												size='sm'
												variant='destructive'
												onClick={() => removeImage(index)}
											>
												<X className='h-3 w-3' />
											</Button>
										</div>

										{/* Order Badge */}
										<div className='absolute top-2 left-2'>
											<Badge variant='secondary' className='text-xs'>
												{index + 1}
											</Badge>
										</div>
									</div>

									{/* Image Info */}
									<div className='space-y-2'>
										<div className='text-xs text-muted-foreground'>
											<p className='font-medium truncate'>{image.fileName}</p>
											<p>
												{(image.fileSize / 1024 / 1024).toFixed(1)} MB •{' '}
												{image.mimeType}
											</p>
										</div>

										{/* Caption Input */}
										<div>
											<Label htmlFor={`caption-${index}`} className='sr-only'>
												Caption
											</Label>
											<Input
												id={`caption-${index}`}
												placeholder='Add caption (optional)'
												value={image.caption || ''}
												onChange={e => updateCaption(index, e.target.value)}
												className='text-sm'
											/>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			)}
		</div>
	)
}
