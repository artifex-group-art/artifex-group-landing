'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { m } from 'framer-motion'
import {
	ArrowLeft,
	Calendar,
	User,
	Building2,
	DraftingCompass,
	MapPin,
	Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

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
			const response = await fetch('/api/projects/published')
			if (response.ok) {
				const projects = await response.json()
				const foundProject = projects.find((p: Project) => p.slug === slug)

				if (foundProject) {
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
			<div className='min-h-screen flex items-center justify-center bg-slate-50'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto'></div>
					<p className='mt-4 text-slate-600 font-mono text-sm'>
						Loading project...
					</p>
				</div>
			</div>
		)
	}

	if (error || !project) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-slate-50'>
				<div className='text-center max-w-md'>
					<Building2 className='h-16 w-16 text-slate-400 mx-auto mb-6' />
					<h1 className='text-2xl font-bold text-slate-900 mb-4 font-mono'>
						PROJECT NOT FOUND
					</h1>
					<p className='text-slate-600 mb-8'>
						The project you're looking for doesn't exist or has been removed.
					</p>
					<Button
						onClick={() => router.push('/')}
						className='bg-slate-900 text-white hover:bg-slate-800 font-mono'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						BACK TO PORTFOLIO
					</Button>
				</div>
			</div>
		)
	}

	const allImages = project.images || []

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Header */}
			<header className='bg-white border-b border-slate-200 sticky top-0 z-50'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 py-4'>
					<div className='flex items-center justify-between'>
						<Button
							onClick={() => router.back()}
							variant='outline'
							className='border-slate-300 text-slate-700 hover:bg-slate-100 font-mono'
						>
							<ArrowLeft className='h-4 w-4 mr-2' />
							BACK
						</Button>

						<div className='text-right'>
							<h1 className='text-lg font-bold text-slate-900 font-mono'>
								{project.title.toUpperCase()}
							</h1>
							<p className='text-sm text-slate-600 font-mono'>
								PROJECT DETAILS
							</p>
						</div>
					</div>
				</div>
			</header>

			{/* Project Info Section */}
			<section className='py-12 bg-white border-b border-slate-200'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<m.div
						className='grid grid-cols-1 lg:grid-cols-3 gap-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Main Info */}
						<div className='lg:col-span-2'>
							<div className='flex items-center gap-4 mb-6 flex-wrap'>
								{project.featured && (
									<Badge className='bg-slate-900 text-white font-mono'>
										FEATURED PROJECT
									</Badge>
								)}
								{project.category && (
									<Badge
										variant='outline'
										className='border-slate-300 text-slate-700 font-mono'
									>
										{project.category.name.toUpperCase()}
									</Badge>
								)}
								<Badge
									variant='outline'
									className='border-slate-300 text-slate-700 font-mono'
								>
									{new Date(project.createdAt).getFullYear()}
								</Badge>
							</div>

							<h1 className='text-4xl lg:text-6xl font-light text-slate-900 mb-6 leading-tight'>
								{project.title.split(' ').map((word, index) => (
									<span
										key={index}
										className={index % 2 === 1 ? 'font-bold' : 'font-light'}
									>
										{word}{' '}
									</span>
								))}
							</h1>

							<p className='text-slate-600 text-lg leading-relaxed mb-8'>
								{project.description}
							</p>

							<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
								<div className='text-center border-l-2 border-slate-300 pl-4'>
									<div className='text-2xl font-bold text-slate-900 font-mono'>
										{allImages.length}
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										IMAGES
									</div>
								</div>
								<div className='text-center border-l-2 border-slate-300 pl-4'>
									<div className='text-2xl font-bold text-slate-900 font-mono'>
										{new Date(project.createdAt).getFullYear()}
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										YEAR
									</div>
								</div>
								<div className='text-center border-l-2 border-slate-300 pl-4'>
									<div className='text-2xl font-bold text-slate-900 font-mono'>
										UZ
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										LOCATION
									</div>
								</div>
								<div className='text-center border-l-2 border-slate-300 pl-4'>
									<div className='text-2xl font-bold text-slate-900 font-mono'>
										{project.category?.name || 'ARCH'}
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										TYPE
									</div>
								</div>
							</div>
						</div>

						{/* Side Info */}
						<div className='bg-slate-900 text-white p-8'>
							<h3 className='text-lg font-bold mb-6 font-mono flex items-center'>
								<User className='h-5 w-5 mr-3' />
								PROJECT TEAM
							</h3>
							<div className='space-y-4'>
								<div className='border-b border-white/20 pb-4'>
									<div className='text-white/60 font-mono text-xs mb-1'>
										ARCHITECT
									</div>
									<div className='text-white font-bold'>
										{project.author.name || 'ARTIFEX GROUP'}
									</div>
								</div>
								<div className='border-b border-white/20 pb-4'>
									<div className='text-white/60 font-mono text-xs mb-1'>
										CONTACT
									</div>
									<div className='text-white font-bold'>
										{project.author.email || 'info@artifex.com'}
									</div>
								</div>
								<div className='border-b border-white/20 pb-4'>
									<div className='text-white/60 font-mono text-xs mb-1'>
										FIRM
									</div>
									<div className='text-white font-bold'>ARTIFEX GROUP</div>
								</div>
								<div>
									<div className='text-white/60 font-mono text-xs mb-1'>
										STATUS
									</div>
									<div className='text-green-400 font-bold'>PUBLISHED</div>
								</div>
							</div>
						</div>
					</m.div>
				</div>
			</section>

			{/* Images Gallery - Masonry Layout */}
			{allImages.length > 0 && (
				<section className='py-16 bg-slate-50'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						{/* Gallery Header */}
						<m.div
							className='text-center mb-12'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className='inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 font-mono text-sm mb-6'>
								<Eye className='h-4 w-4' />
								PROJECT GALLERY
							</div>

							<h2 className='text-3xl lg:text-4xl font-bold text-slate-900 mb-4'>
								Visual Documentation
							</h2>
							<p className='text-slate-600 text-lg max-w-2xl mx-auto'>
								Comprehensive collection of project images showcasing every
								detail and perspective
							</p>
						</m.div>

						{/* Masonry Grid */}
						<m.div
							className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							{allImages.map((image, index) => (
								<ImageCard
									key={image.id}
									image={image}
									project={project}
									index={index}
								/>
							))}
						</m.div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
					<m.div
						className='bg-slate-900 text-white p-12 rounded-none'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-2xl lg:text-3xl font-bold mb-6 font-mono'>
							INTERESTED IN SIMILAR WORK?
						</h3>
						<p className='text-white/80 mb-8 text-lg max-w-2xl mx-auto'>
							Let's collaborate to create exceptional architectural solutions
							that push the boundaries of design innovation and sustainable
							development.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button
								size='lg'
								className='bg-white text-slate-900 hover:bg-slate-100 font-mono px-8'
							>
								<DraftingCompass className='h-4 w-4 mr-2' />
								START NEW PROJECT
							</Button>
							<Button
								size='lg'
								variant='outline'
								onClick={() => router.push('/')}
								className='border-white text-white hover:bg-white hover:text-slate-900 font-mono px-8'
							>
								VIEW MORE PROJECTS
							</Button>
						</div>
					</m.div>
				</div>
			</section>
		</div>
	)
}

interface ImageCardProps {
	image: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	project: Project
	index: number
}

function ImageCard({ image, project, index }: ImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Generate varied heights for masonry effect
	const getRandomHeight = (index: number) => {
		const heights = [300, 400, 350, 450, 320, 380, 500]
		return heights[index % heights.length]
	}

	return (
		<m.div
			className='break-inside-avoid mb-6 group'
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			<div className='bg-white border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:border-slate-400'>
				{/* Image */}
				<div
					className='relative overflow-hidden'
					style={{ height: `${getRandomHeight(index)}px` }}
				>
					<img
						src={image.url}
						alt={image.caption || `${project.title} - Image ${index + 1}`}
						className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setImageLoaded(true)}
					/>

					{/* Loading skeleton */}
					{!imageLoaded && (
						<div className='absolute inset-0 bg-slate-200 animate-pulse' />
					)}

					{/* Image number */}
					<div className='absolute top-4 left-4 bg-slate-900 text-white px-2 py-1 font-mono text-xs font-bold'>
						{String(index + 1).padStart(2, '0')}
					</div>

					{/* Overlay on hover */}
					<div className='absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
						<div className='text-center text-white'>
							<Eye className='h-8 w-8 mx-auto mb-2' />
							<p className='font-mono text-sm'>VIEW FULL SIZE</p>
						</div>
					</div>
				</div>

				{/* Caption */}
				{image.caption && (
					<div className='p-4 bg-white'>
						<p className='text-slate-700 text-sm leading-relaxed'>
							{image.caption}
						</p>
					</div>
				)}

				{/* Technical Info */}
				<div className='p-4 bg-slate-50 border-t border-slate-200'>
					<div className='flex items-center justify-between text-xs font-mono text-slate-600'>
						<span>IMG-{String(index + 1).padStart(3, '0')}</span>
						<span>{image.fileName || `image-${index + 1}.jpg`}</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}
