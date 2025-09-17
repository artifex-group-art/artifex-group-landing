'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
	ArrowLeft,
	Calendar,
	User,
	Eye,
	Images,
	ChevronLeft,
	ChevronRight,
	X,
	Tag,
	MapPin,
	Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface Project {
	id: string
	title: string
	description: string
	imageUrl?: string
	slug: string
	featured: boolean
	published: boolean
	category?: {
		id: string
		name: string
		slug: string
	}
	images: Array<{
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}>
	createdAt: string
	author: {
		name: string
		email: string
	}
}

export default function ProjectDetailPage() {
	const params = useParams()
	const router = useRouter()
	const [project, setProject] = useState<Project | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [showGallery, setShowGallery] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		if (params?.slug) {
			fetchProject(params.slug as string)
		}
	}, [params?.slug])

	const fetchProject = async (slug: string) => {
		try {
			// Since we don't have a direct slug endpoint, we'll fetch all published projects
			// and find the one with matching slug
			const response = await fetch('/api/projects/published')
			if (response.ok) {
				const projects = await response.json()
				const foundProject = projects.find((p: Project) => p.slug === slug)

				if (foundProject) {
					// Get full project details
					const detailResponse = await fetch(`/api/projects/${foundProject.id}`)
					if (detailResponse.ok) {
						const projectDetail = await detailResponse.json()
						setProject(projectDetail)
					} else {
						setError('Project not found')
					}
				} else {
					setError('Project not found')
				}
			} else {
				setError('Failed to fetch project')
			}
		} catch (error) {
			console.error('Error fetching project:', error)
			setError('Failed to fetch project')
		} finally {
			setLoading(false)
		}
	}

	const openGallery = (index: number) => {
		setCurrentImageIndex(index)
		setShowGallery(true)
	}

	const nextImage = () => {
		if (project?.images) {
			setCurrentImageIndex(prev =>
				prev === project.images.length - 1 ? 0 : prev + 1
			)
		}
	}

	const prevImage = () => {
		if (project?.images) {
			setCurrentImageIndex(prev =>
				prev === 0 ? project.images.length - 1 : prev - 1
			)
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
			</div>
		)
	}

	if (error || !project) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-foreground mb-4'>
						Project Not Found
					</h1>
					<p className='text-muted-foreground mb-6'>
						The project you're looking for doesn't exist or has been removed.
					</p>
					<Button onClick={() => router.push('/')}>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back to Home
					</Button>
				</div>
			</div>
		)
	}

	const heroImage =
		project.images?.[0]?.url || project.imageUrl || '/placeholder.svg'
	const allImages = project.images || []

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative h-[70vh] overflow-hidden'>
				<motion.img
					src={heroImage}
					alt={project.title}
					className='w-full h-full object-cover'
					initial={{ scale: 1.1 }}
					animate={{ scale: 1 }}
					transition={{ duration: 1.5, ease: 'easeOut' }}
				/>
				<div className='absolute inset-0 bg-black/40' />

				{/* Navigation */}
				<div className='absolute top-8 left-8 z-10'>
					<Button
						onClick={() => router.back()}
						variant='secondary'
						className='backdrop-blur-sm bg-white/20 text-white border-white/20 hover:bg-white/30'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back
					</Button>
				</div>

				{/* Gallery Button */}
				{allImages.length > 1 && (
					<div className='absolute top-8 right-8 z-10'>
						<Button
							onClick={() => openGallery(0)}
							variant='secondary'
							className='backdrop-blur-sm bg-white/20 text-white border-white/20 hover:bg-white/30'
						>
							<Images className='h-4 w-4 mr-2' />
							View Gallery ({allImages.length})
						</Button>
					</div>
				)}

				{/* Content */}
				<div className='absolute bottom-0 left-0 right-0 p-8 lg:p-16'>
					<div className='max-w-4xl'>
						<motion.div
							className='flex items-center gap-4 mb-6 flex-wrap'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							{project.featured && (
								<Badge className='bg-primary text-primary-foreground'>
									Featured Project
								</Badge>
							)}
							{project.category && (
								<Badge
									variant='secondary'
									className='bg-secondary/80 text-secondary-foreground'
								>
									<Tag className='h-3 w-3 mr-1' />
									{project.category.name}
								</Badge>
							)}
							<div className='flex items-center text-white/80 text-sm'>
								<Calendar className='h-4 w-4 mr-2' />
								{new Date(project.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</div>
						</motion.div>

						<motion.h1
							className='text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{project.title}
						</motion.h1>

						<motion.div
							className='flex items-center text-white/80'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<User className='h-4 w-4 mr-2' />
							<span>By {project.author.name || 'ARTIFEX GROUP'}</span>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Image Gallery Section */}
			{allImages.length > 1 && (
				<section className='py-16 bg-muted/20'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						<motion.div
							className='text-center mb-12'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className='text-3xl font-bold text-foreground mb-4'>
								Project Gallery
							</h2>
							<p className='text-muted-foreground'>
								Explore different perspectives and details of this project
							</p>
						</motion.div>

						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, staggerChildren: 0.1 }}
						>
							{allImages.map((image, index) => (
								<motion.div
									key={image.id}
									className='relative aspect-video overflow-hidden rounded-lg cursor-pointer group'
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ scale: 1.05 }}
									onClick={() => openGallery(index)}
								>
									<img
										src={image.url}
										alt={
											image.caption || `${project.title} - Image ${index + 1}`
										}
										className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
									<div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										{image.caption && (
											<p className='text-white text-sm'>{image.caption}</p>
										)}
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{/* Content Section */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-4xl mx-auto px-6 lg:px-8'>
					<motion.div
						className='prose prose-lg max-w-none'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
					>
						<div className='bg-card p-8 lg:p-12 rounded-xl border border-border'>
							<h2 className='text-2xl font-bold text-foreground mb-6 flex items-center'>
								<Eye className='h-6 w-6 mr-3 text-primary' />
								Project Overview
							</h2>
							<div className='text-muted-foreground leading-relaxed whitespace-pre-wrap'>
								{project.description}
							</div>
						</div>
					</motion.div>

					{/* Project Details */}
					<motion.div
						className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.8 }}
					>
						<div className='bg-card p-6 rounded-lg border border-border'>
							<h3 className='text-lg font-semibold text-foreground mb-4'>
								Project Information
							</h3>
							<div className='space-y-3 text-sm'>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Status</span>
									<span className='text-foreground font-medium'>Published</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Created</span>
									<span className='text-foreground font-medium'>
										{new Date(project.createdAt).toLocaleDateString()}
									</span>
								</div>
								{project.category && (
									<div className='flex justify-between'>
										<span className='text-muted-foreground'>Category</span>
										<span className='text-foreground font-medium'>
											{project.category.name}
										</span>
									</div>
								)}
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Images</span>
									<span className='text-foreground font-medium'>
										{allImages.length} photo{allImages.length !== 1 ? 's' : ''}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Type</span>
									<span className='text-foreground font-medium'>
										{project.featured ? 'Featured Project' : 'Standard Project'}
									</span>
								</div>
							</div>
						</div>

						<div className='bg-card p-6 rounded-lg border border-border'>
							<h3 className='text-lg font-semibold text-foreground mb-4'>
								Contact Information
							</h3>
							<div className='space-y-3 text-sm'>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Architect</span>
									<span className='text-foreground font-medium'>
										{project.author.name || 'ARTIFEX GROUP'}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Email</span>
									<span className='text-foreground font-medium'>
										{project.author.email || 'info@artifex.com'}
									</span>
								</div>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Company</span>
									<span className='text-foreground font-medium'>
										ARTIFEX GROUP
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div
						className='mt-16 text-center'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 1 }}
					>
						<div className='bg-primary/5 p-8 rounded-xl border border-primary/10'>
							<h3 className='text-2xl font-bold text-foreground mb-4'>
								Interested in Our Work?
							</h3>
							<p className='text-muted-foreground mb-6'>
								Get in touch with us to discuss your next architectural project.
							</p>
							<Button size='lg' className='mr-4'>
								Contact Us
							</Button>
							<Button
								size='lg'
								variant='outline'
								onClick={() => router.push('/')}
							>
								View More Projects
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Gallery Modal */}
			<Dialog open={showGallery} onOpenChange={setShowGallery}>
				<DialogContent className='max-w-6xl w-full h-[90vh] p-0 overflow-hidden'>
					<div className='relative w-full h-full bg-black'>
						{project && allImages.length > 0 && (
							<>
								{/* Close Button */}
								<Button
									onClick={() => setShowGallery(false)}
									variant='ghost'
									size='sm'
									className='absolute top-4 right-4 z-20 text-white hover:bg-white/20'
								>
									<X className='h-6 w-6' />
								</Button>

								{/* Image Counter */}
								<div className='absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
									{currentImageIndex + 1} / {allImages.length}
								</div>

								{/* Main Image */}
								<AnimatePresence mode='wait'>
									<motion.img
										key={currentImageIndex}
										src={allImages[currentImageIndex]?.url}
										alt={
											allImages[currentImageIndex]?.caption ||
											`${project.title} - Image ${currentImageIndex + 1}`
										}
										className='w-full h-full object-contain'
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.3 }}
									/>
								</AnimatePresence>

								{/* Navigation Buttons */}
								{allImages.length > 1 && (
									<>
										<Button
											onClick={prevImage}
											variant='ghost'
											size='sm'
											className='absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20'
										>
											<ChevronLeft className='h-8 w-8' />
										</Button>
										<Button
											onClick={nextImage}
											variant='ghost'
											size='sm'
											className='absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20'
										>
											<ChevronRight className='h-8 w-8' />
										</Button>
									</>
								)}

								{/* Caption */}
								{allImages[currentImageIndex]?.caption && (
									<div className='absolute bottom-4 left-4 right-4 z-20 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm'>
										<p className='text-sm lg:text-base'>
											{allImages[currentImageIndex].caption}
										</p>
									</div>
								)}

								{/* Thumbnail Strip */}
								{allImages.length > 1 && (
									<div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm'>
										{allImages.map((image, index) => (
											<button
												key={image.id}
												onClick={() => setCurrentImageIndex(index)}
												className={`w-12 h-8 rounded overflow-hidden border-2 transition-colors ${
													index === currentImageIndex
														? 'border-white'
														: 'border-transparent hover:border-white/50'
												}`}
											>
												<img
													src={image.url}
													alt={`Thumbnail ${index + 1}`}
													className='w-full h-full object-cover'
												/>
											</button>
										))}
									</div>
								)}
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
