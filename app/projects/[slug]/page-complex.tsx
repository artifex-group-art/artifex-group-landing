'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	User,
	Building2,
	DraftingCompass,
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

export default function ArchitecturalProjectDetailPage() {
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
						Loading project specifications...
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
						The architectural project you're looking for doesn't exist or has
						been removed from our portfolio.
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
	const heroImage = allImages[0]?.url || project.imageUrl || '/placeholder.svg'

	return (
		<div className='min-h-screen bg-slate-50'>
			{/* Simple Header Navigation */}
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
					<motion.div
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
								{project.title}
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
					</motion.div>
				</div>
			</section>

			{/* Professional Masonry Gallery */}
			{allImages.length > 0 && (
				<section className='py-20 bg-gradient-to-b from-slate-50 to-white'>
					<div className='max-w-[1600px] mx-auto px-6 lg:px-8'>
						{/* Gallery Header */}
						<motion.div
							className='text-center mb-16'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className='inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 font-mono text-sm mb-8 tracking-wider'>
								VISUAL DOCUMENTATION
							</div>
							<h2 className='text-4xl lg:text-6xl font-light text-slate-900 mb-6'>
								Project <span className='font-bold'>Gallery</span>
							</h2>
							<p className='text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed'>
								Comprehensive visual exploration showcasing every detail and
								perspective of this architectural masterpiece
							</p>
						</motion.div>

						{/* Creative Masonry Layout */}
						<motion.div
							className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8'
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1, staggerChildren: 0.15 }}
						>
							{allImages.map((image, index) => (
								<ProfessionalImageCard
									key={image.id}
									image={image}
									project={project}
									index={index}
								/>
							))}
						</motion.div>

						{/* Gallery Stats */}
						<motion.div
							className='mt-20 text-center'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.8 }}
						>
							<div className='inline-flex items-center gap-8 bg-white border border-slate-200 px-12 py-6 shadow-lg'>
								<div className='text-center'>
									<div className='text-3xl font-bold text-slate-900 font-mono'>
										{allImages.length}
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										TOTAL IMAGES
									</div>
								</div>
								<div className='w-px h-12 bg-slate-200'></div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-slate-900 font-mono'>
										4K
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										RESOLUTION
									</div>
								</div>
								<div className='w-px h-12 bg-slate-200'></div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-slate-900 font-mono'>
										HD
									</div>
									<div className='text-sm text-slate-600 font-mono tracking-wider'>
										QUALITY
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* Simple CTA Section */}
			<section className='py-16 bg-white'>
				<div className='max-w-4xl mx-auto px-6 lg:px-8 text-center'>
					<motion.div
						className='bg-slate-900 text-white p-12'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-2xl lg:text-3xl font-bold mb-6 font-mono'>
							INTERESTED IN SIMILAR WORK?
						</h3>
						<p className='text-white/80 mb-8 text-lg max-w-2xl mx-auto'>
							Let's collaborate to create exceptional architectural solutions.
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
					</motion.div>
				</div>
			</section>
		</div>
	)
}

interface ProfessionalImageCardProps {
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

function ProfessionalImageCard({
	image,
	project,
	index,
}: ProfessionalImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Creative height variations for masonry effect
	const getCreativeHeight = (index: number) => {
		const heights = [400, 600, 500, 700, 450, 550, 650, 480, 580, 520]
		return heights[index % heights.length]
	}

	// Special large image every 5th item
	const isLargeImage = (index + 1) % 5 === 0

	return (
		<motion.div
			className={`break-inside-avoid mb-8 group ${
				isLargeImage ? 'md:col-span-2 lg:col-span-2' : ''
			}`}
			initial={{ opacity: 0, scale: 0.8, y: 60 }}
			whileInView={{ opacity: 1, scale: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 0.8,
				delay: index * 0.1,
				type: 'spring',
				bounce: 0.3,
			}}
		>
			<div className='bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group overflow-hidden border border-slate-200/50'>
				{/* Professional Image Container */}
				<div
					className='relative overflow-hidden'
					style={{
						height: `${
							isLargeImage
								? getCreativeHeight(index) + 150
								: getCreativeHeight(index)
						}px`,
					}}
				>
					{/* Main Image */}
					<img
						src={image.url}
						alt={
							image.caption ||
							`${project.title} - Professional View ${index + 1}`
						}
						className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setImageLoaded(true)}
					/>

					{/* Premium Loading Skeleton */}
					{!imageLoaded && (
						<div className='absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse'>
							<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse'></div>
						</div>
					)}

					{/* Elegant Image Number Badge */}
					<div className='absolute top-6 left-6 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 font-mono text-sm font-bold tracking-wider'>
						{String(index + 1).padStart(2, '0')}
					</div>

					{/* Large Image Badge */}
					{isLargeImage && (
						<div className='absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 font-mono text-xs font-bold tracking-wider'>
							FEATURED
						</div>
					)}

					{/* Subtle Hover Indicator */}
					<div className='absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
				</div>

				{/* Professional Caption & Info */}
				<div className='p-6 bg-white'>
					{image.caption && (
						<p className='text-slate-700 text-base leading-relaxed mb-4 font-light'>
							{image.caption}
						</p>
					)}

					{/* Technical Details */}
					<div className='flex items-center justify-between pt-4 border-t border-slate-100'>
						<div className='flex items-center gap-4'>
							<div className='text-xs font-mono text-slate-500 tracking-wider'>
								IMG-{String(index + 1).padStart(3, '0')}
							</div>
							<div className='w-px h-4 bg-slate-200'></div>
							<div className='text-xs font-mono text-slate-500 tracking-wider'>
								{isLargeImage ? 'LARGE FORMAT' : 'STANDARD'}
							</div>
						</div>
						<div className='text-xs text-slate-400 font-mono'>
							{image.fileName || `image-${index + 1}.jpg`}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
