'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Calendar,
	User,
	Ruler,
	Building2,
	Compass,
	DraftingCompass,
	MapPin,
	Square,
	Triangle,
	Circle,
	Grid3X3,
	Layers,
	Move3D
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
					<p className='mt-4 text-slate-600 font-mono text-sm'>Loading project specifications...</p>
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
						The architectural project you're looking for doesn't exist or has been removed from our portfolio.
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
			{/* Technical Header Section */}
			<section className='relative h-screen overflow-hidden border-b-2 border-slate-900'>
				{/* Blueprint Grid Background */}
				<div className='absolute inset-0 opacity-[0.03]'>
					<div 
						className='w-full h-full'
						style={{
							backgroundImage: `
								linear-gradient(to right, #1e293b 1px, transparent 1px),
								linear-gradient(to bottom, #1e293b 1px, transparent 1px)
							`,
							backgroundSize: '60px 60px'
						}}
					/>
				</div>

				{/* Hero Image */}
				<motion.img
					src={heroImage}
					alt={project.title}
					className='w-full h-full object-cover'
					initial={{ scale: 1.1 }}
					animate={{ scale: 1 }}
					transition={{ duration: 2, ease: 'easeOut' }}
				/>
				
				{/* Technical Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent' />

				{/* Navigation */}
				<div className='absolute top-8 left-8 z-10'>
					<Button
						onClick={() => router.back()}
						variant='outline'
						className='bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 font-mono'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						BACK
					</Button>
				</div>

				{/* Technical Info Badge */}
				<div className='absolute top-8 right-8 z-10 text-right'>
					<div className='bg-white/10 backdrop-blur-sm border border-white/20 p-4 font-mono text-white text-xs'>
						<div className='mb-2'>PROJECT NO. {String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}</div>
						<div className='mb-2'>SCALE 1:100</div>
						<div>{allImages.length} VISUALS</div>
					</div>
				</div>

				{/* Technical Corner Elements */}
				<div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white/60'>
					<div className='border-t-2 border-white/20 w-16'></div>
					<span className='text-xs font-mono mt-2 block text-center'>ELEVATION</span>
				</div>

				{/* Project Information */}
				<div className='absolute bottom-0 left-0 right-0 p-8 lg:p-16'>
					<div className='max-w-6xl mx-auto'>
						{/* Technical Badges */}
						<motion.div
							className='flex items-center gap-4 mb-8 flex-wrap'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							<div className='bg-white text-slate-900 px-4 py-2 font-mono text-sm font-bold'>
								{project.category?.name.toUpperCase() || 'ARCHITECTURE'}
							</div>
							{project.featured && (
								<div className='bg-slate-900 text-white px-4 py-2 font-mono text-sm border border-white/20'>
									FEATURED PROJECT
								</div>
							)}
							<div className='border border-white/20 text-white px-4 py-2 font-mono text-sm'>
								{new Date(project.createdAt).getFullYear()}
							</div>
						</motion.div>

						{/* Project Title */}
						<motion.h1
							className='text-5xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-tight'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{project.title.split(' ').map((word, index) => (
								<span key={index} className={index % 2 === 1 ? 'font-bold' : 'font-light'}>
									{word}{' '}
								</span>
							))}
						</motion.h1>

						{/* Technical Details */}
						<motion.div
							className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<div className='border-l-2 border-white/20 pl-6'>
								<div className='text-white/60 font-mono text-xs mb-2'>ARCHITECT</div>
								<div className='text-white font-bold'>{project.author.name || 'ARTIFEX GROUP'}</div>
							</div>
							<div className='border-l-2 border-white/20 pl-6'>
								<div className='text-white/60 font-mono text-xs mb-2'>LOCATION</div>
								<div className='text-white font-bold'>UZBEKISTAN</div>
							</div>
							<div className='border-l-2 border-white/20 pl-6'>
								<div className='text-white/60 font-mono text-xs mb-2'>STATUS</div>
								<div className='text-white font-bold'>COMPLETED</div>
							</div>
						</motion.div>

						{/* Description */}
						<motion.p
							className='text-white/90 text-lg lg:text-xl max-w-4xl leading-relaxed'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							{project.description}
						</motion.p>
					</div>
				</div>
			</section>

			{/* Technical Drawings Gallery */}
			{allImages.length > 0 && (
				<section className='py-24 bg-white border-b-2 border-slate-900'>
					<div className='max-w-7xl mx-auto px-6 lg:px-8'>
						{/* Section Header */}
						<motion.div
							className='mb-16'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className='flex items-center justify-between mb-8'>
								<div>
									<h2 className='text-4xl lg:text-5xl font-light text-slate-900 mb-4'>
										TECHNICAL
										<span className='font-bold block'>DOCUMENTATION</span>
									</h2>
									<p className='text-slate-600 text-lg'>
										Comprehensive visual documentation and architectural details
									</p>
								</div>
								<div className='text-right font-mono text-sm text-slate-600'>
									<div className='mb-2'>DRAWING SET</div>
									<div className='text-2xl font-bold text-slate-900'>{allImages.length}</div>
								</div>
							</div>
						</motion.div>

						{/* Images Grid */}
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, staggerChildren: 0.1 }}
						>
							{allImages.map((image, index) => (
								<TechnicalImageCard
									key={image.id}
									image={image}
									project={project}
									index={index}
								/>
							))}
						</motion.div>
					</div>
				</section>
			)}

			{/* Project Specifications */}
			<section className='py-24 bg-slate-50'>
				<div className='max-w-6xl mx-auto px-6 lg:px-8'>
					<motion.div
						className='grid grid-cols-1 lg:grid-cols-2 gap-16'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						{/* Project Information */}
						<div className='bg-white border-2 border-slate-900 p-8'>
							<h3 className='text-2xl font-bold text-slate-900 mb-8 font-mono flex items-center'>
								<Building2 className='h-6 w-6 mr-3' />
								PROJECT SPECIFICATIONS
							</h3>
							<div className='space-y-6'>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-slate-200'>
									<span className='text-slate-600 font-mono text-sm'>PROJECT TYPE</span>
									<span className='text-slate-900 font-bold'>{project.category?.name || 'Architecture'}</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-slate-200'>
									<span className='text-slate-600 font-mono text-sm'>COMPLETION</span>
									<span className='text-slate-900 font-bold'>
										{new Date(project.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
										})}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-slate-200'>
									<span className='text-slate-600 font-mono text-sm'>CLASSIFICATION</span>
									<span className='text-slate-900 font-bold'>
										{project.featured ? 'Featured Project' : 'Standard Project'}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-slate-200'>
									<span className='text-slate-600 font-mono text-sm'>DRAWINGS</span>
									<span className='text-slate-900 font-bold'>
										{allImages.length} Visual{allImages.length !== 1 ? 's' : ''}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-slate-200'>
									<span className='text-slate-600 font-mono text-sm'>STATUS</span>
									<span className='text-green-600 font-bold'>PUBLISHED</span>
								</div>
							</div>
						</div>

						{/* Contact Information */}
						<div className='bg-slate-900 text-white p-8'>
							<h3 className='text-2xl font-bold mb-8 font-mono flex items-center'>
								<User className='h-6 w-6 mr-3' />
								DESIGN TEAM
							</h3>
							<div className='space-y-6'>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-white/20'>
									<span className='text-white/60 font-mono text-sm'>LEAD ARCHITECT</span>
									<span className='text-white font-bold'>
										{project.author.name || 'ARTIFEX GROUP'}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-white/20'>
									<span className='text-white/60 font-mono text-sm'>CONTACT</span>
									<span className='text-white font-bold'>
										{project.author.email || 'info@artifex.com'}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-white/20'>
									<span className='text-white/60 font-mono text-sm'>FIRM</span>
									<span className='text-white font-bold'>ARTIFEX GROUP</span>
								</div>
								<div className='grid grid-cols-2 gap-4 py-4 border-b border-white/20'>
									<span className='text-white/60 font-mono text-sm'>LOCATION</span>
									<span className='text-white font-bold flex items-center'>
										<MapPin className='h-4 w-4 mr-2' />
										UZBEKISTAN
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div
						className='mt-20 bg-white border-2 border-slate-900 p-12 text-center'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-3xl font-bold text-slate-900 mb-6 font-mono'>
							INTERESTED IN SIMILAR WORK?
						</h3>
						<p className='text-slate-600 mb-8 text-lg max-w-2xl mx-auto'>
							Let's collaborate to create exceptional architectural solutions that push the boundaries 
							of design innovation and sustainable development.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Button 
								size='lg' 
								className='bg-slate-900 text-white hover:bg-slate-800 font-mono px-8'
							>
								<DraftingCompass className='h-4 w-4 mr-2' />
								START NEW PROJECT
							</Button>
							<Button
								size='lg'
								variant='outline'
								onClick={() => router.push('/')}
								className='border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-mono px-8'
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

interface TechnicalImageCardProps {
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

function TechnicalImageCard({ image, project, index }: TechnicalImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	const getDrawingType = (index: number) => {
		const types = ['PLAN', 'ELEVATION', 'SECTION', 'DETAIL', 'PERSPECTIVE', '3D VIEW']
		return types[index % types.length]
	}

	const getDrawingIcon = (index: number) => {
		const icons = [Square, Triangle, Circle, Grid3X3, Layers, Move3D]
		const Icon = icons[index % icons.length]
		return Icon
	}

	const Icon = getDrawingIcon(index)

	return (
		<motion.div
			className='group cursor-pointer'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -8 }}
		>
			<div className='bg-white border-2 border-slate-200 overflow-hidden transition-all duration-500 hover:border-slate-900 hover:shadow-xl'>
				{/* Technical Header */}
				<div className='bg-slate-900 text-white p-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Icon className='h-4 w-4' />
						<span className='font-mono text-sm font-bold'>
							{getDrawingType(index)} {String(index + 1).padStart(2, '0')}
						</span>
					</div>
					<div className='font-mono text-xs text-white/60'>
						1:{100 + index * 50}
					</div>
				</div>

				{/* Image */}
				<div className='relative aspect-[4/3] overflow-hidden'>
					<img
						src={image.url}
						alt={image.caption || `${project.title} - ${getDrawingType(index)} ${index + 1}`}
						className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
							imageLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						onLoad={() => setImageLoaded(true)}
					/>

					{/* Loading skeleton */}
					{!imageLoaded && (
						<div className='absolute inset-0 bg-slate-200 animate-pulse' />
					)}

					{/* Technical Overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

					{/* Drawing Number */}
					<div className='absolute bottom-4 right-4 bg-white/90 px-2 py-1 font-mono text-xs text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						DWG-{String(index + 1).padStart(3, '0')}
					</div>
				</div>

				{/* Technical Footer */}
				<div className='p-4 bg-slate-50 border-t border-slate-200'>
					<div className='flex items-center justify-between'>
						<div>
							<h4 className='font-bold text-slate-900 text-sm mb-1'>
								{image.caption || `${getDrawingType(index)} Drawing`}
							</h4>
							<p className='text-slate-600 text-xs font-mono'>
								{image.fileName || `drawing-${index + 1}.jpg`}
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<Compass className='h-3 w-3 text-slate-400' />
							<Ruler className='h-3 w-3 text-slate-400' />
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}