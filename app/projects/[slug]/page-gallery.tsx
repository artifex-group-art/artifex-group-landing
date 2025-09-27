'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Calendar,
	User,
	Eye,
	Tag,
	Heart,
	MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

	const allImages = project.images || []
	const heroImage = allImages[0]?.url || project.imageUrl || '/placeholder.svg'

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative h-[80vh] overflow-hidden'>
				<motion.img
					src={heroImage}
					alt={project.title}
					className='w-full h-full object-cover'
					initial={{ scale: 1.1 }}
					animate={{ scale: 1 }}
					transition={{ duration: 1.5, ease: 'easeOut' }}
				/>
				<div className='absolute inset-0 bg-black/50' />

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

				{/* Project Info Badge */}
				<div className='absolute top-8 right-8 z-10'>
					<Badge className='backdrop-blur-sm bg-white/20 text-white border-white/20'>
						{allImages.length} {allImages.length === 1 ? 'Image' : 'Images'}
					</Badge>
				</div>

				{/* Hero Content */}
				<div className='absolute bottom-0 left-0 right-0 p-8 lg:p-16'>
					<div className='max-w-6xl mx-auto'>
						<motion.div
							className='flex items-center gap-4 mb-6 flex-wrap'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							{project.featured && (
								<Badge className='bg-primary text-primary-foreground'>
									<Heart className='h-3 w-3 mr-1' />
									Featured
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
							className='text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{project.title}
						</motion.h1>

						<motion.div
							className='flex items-center text-white/80 mb-6'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<User className='h-4 w-4 mr-2' />
							<span>By {project.author.name || 'ARTIFEX GROUP'}</span>
						</motion.div>

						<motion.p
							className='text-white/90 text-lg lg:text-xl max-w-3xl leading-relaxed'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							{project.description}
						</motion.p>
					</div>
				</div>
			</section>

			{/* Project Gallery - All Images */}
			{allImages.length > 0 && (
				<section className='py-20 bg-card/50'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						<motion.div
							className='text-center mb-16'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4'>
								Project Gallery
							</h2>
							<p className='text-muted-foreground text-lg'>
								Explore every detail and perspective of this architectural
								masterpiece
							</p>
						</motion.div>

						{/* Masonry Grid Layout */}
						<motion.div
							className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, staggerChildren: 0.1 }}
						>
							{allImages.map((image, index) => (
								<motion.div
									key={image.id}
									className='break-inside-avoid group cursor-pointer'
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ y: -8 }}
								>
									<div className='relative overflow-hidden rounded-xl bg-muted shadow-lg hover:shadow-2xl transition-all duration-500'>
										<img
											src={image.url}
											alt={
												image.caption || `${project.title} - Image ${index + 1}`
											}
											className='w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110'
											style={{
												aspectRatio: 'auto',
												maxHeight: `${300 + (index % 3) * 100}px`,
											}}
										/>

										{/* Overlay with image info */}
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
											<div className='absolute bottom-0 left-0 right-0 p-4'>
												{image.caption && (
													<p className='text-white text-sm font-medium mb-2'>
														{image.caption}
													</p>
												)}
												<div className='flex items-center justify-between'>
													<span className='text-white/80 text-xs'>
														Image {index + 1} of {allImages.length}
													</span>
													<Eye className='h-4 w-4 text-white/80' />
												</div>
											</div>
										</div>

										{/* Image number badge */}
										<div className='absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm'>
											{index + 1}
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{/* Project Details */}
			<section className='py-20'>
				<div className='max-w-4xl mx-auto px-6 lg:px-8'>
					<motion.div
						className='grid grid-cols-1 md:grid-cols-2 gap-8'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						<div className='bg-card p-8 rounded-xl border border-border'>
							<h3 className='text-xl font-semibold text-foreground mb-6 flex items-center'>
								<Eye className='h-5 w-5 mr-3 text-primary' />
								Project Information
							</h3>
							<div className='space-y-4 text-sm'>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Status</span>
									<Badge variant='outline'>Published</Badge>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Created</span>
									<span className='text-foreground font-medium'>
										{new Date(project.createdAt).toLocaleDateString()}
									</span>
								</div>
								{project.category && (
									<div className='flex justify-between items-center'>
										<span className='text-muted-foreground'>Category</span>
										<Badge variant='secondary'>{project.category.name}</Badge>
									</div>
								)}
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Images</span>
									<span className='text-foreground font-medium'>
										{allImages.length} photo{allImages.length !== 1 ? 's' : ''}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Type</span>
									<Badge variant={project.featured ? 'default' : 'outline'}>
										{project.featured ? 'Featured Project' : 'Standard Project'}
									</Badge>
								</div>
							</div>
						</div>

						<div className='bg-card p-8 rounded-xl border border-border'>
							<h3 className='text-xl font-semibold text-foreground mb-6 flex items-center'>
								<User className='h-5 w-5 mr-3 text-primary' />
								Contact Information
							</h3>
							<div className='space-y-4 text-sm'>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Architect</span>
									<span className='text-foreground font-medium'>
										{project.author.name || 'ARTIFEX GROUP'}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Email</span>
									<span className='text-foreground font-medium'>
										{project.author.email || 'info@artifex.com'}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Company</span>
									<span className='text-foreground font-medium'>
										ARTIFEX GROUP
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-muted-foreground'>Location</span>
									<span className='text-foreground font-medium flex items-center'>
										<MapPin className='h-3 w-3 mr-1' />
										Uzbekistan
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
						transition={{ delay: 0.4 }}
					>
						<div className='bg-primary/5 p-8 lg:p-12 rounded-xl border border-primary/10'>
							<h3 className='text-2xl lg:text-3xl font-bold text-foreground mb-4'>
								Inspired by Our Work?
							</h3>
							<p className='text-muted-foreground mb-8 text-lg'>
								Let's collaborate to bring your architectural vision to life
								with our expertise and creativity.
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Button size='lg' className='px-8'>
									Start Your Project
								</Button>
								<Button
									size='lg'
									variant='outline'
									onClick={() => router.push('/')}
									className='px-8'
								>
									View More Projects
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
