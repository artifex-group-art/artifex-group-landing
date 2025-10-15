'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { m } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function MinimalProjectDetailPage() {
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
			<div className='min-h-screen flex items-center justify-center'>
				<div className='w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
			</div>
		)
	}

	if (error || !project) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl mb-4'>Project not found</h1>
					<Button onClick={() => router.push('/')} variant='outline'>
						← Back
					</Button>
				</div>
			</div>
		)
	}

	const allImages = project.images || []

	return (
		<div className='min-h-screen bg-white text-black overflow-hidden'>
			{/* Floating Header */}
			<header className='fixed top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-50'>
				<div className='flex items-center justify-between backdrop-blur-md bg-black/5 border border-black/10 rounded-full px-4 md:px-6 py-2 md:py-3'>
					<Button
						onClick={() => router.back()}
						variant='ghost'
						size='sm'
						className='text-black hover:bg-black/10 rounded-full text-sm md:text-base'
					>
						<ArrowLeft className='w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2' />
						Back
					</Button>
				</div>
			</header>

			{/* Asymmetric Layout */}
			<div className='pt-24 relative'>
				{/* Project Title - Auto Height */}
				<m.div
					className='absolute left-4 md:left-8 lg:left-12 top-72 md:top-64 lg:top-32 z-20 max-w-lg md:max-w-2xl lg:max-w-2xl'
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
				>
					<div className='backdrop-blur-md bg-white/80 border border-black/10 p-4 md:p-5 lg:p-6 rounded-2xl shadow-lg'>
						<h1 className='text-xl sm:text-2xl lg:text-3xl font-medium mb-3 leading-tight text-black'>
							{project.title}
						</h1>
						<p className='text-black/70 text-sm md:text-base font-normal leading-relaxed mb-4'>
							{project.description}
						</p>
						<div className='flex flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-2 text-xs font-mono text-black/50'>
							<span className='px-2 md:px-3 py-1 bg-black/5 rounded-full border border-black/10 text-xs'>
								{new Date(project.createdAt).getFullYear()}
							</span>
							{project.category && (
								<span className='px-2 md:px-3 py-1 bg-black/5 rounded-full border border-black/10 text-xs'>
									{project.category.name}
								</span>
							)}
							<span className='px-2 md:px-3 py-1 bg-black/5 rounded-full border border-black/10 text-xs'>
								{project.author.name || 'Artifex Group'}
							</span>
						</div>
					</div>
				</m.div>

				{/* Gallery Layout */}
				{allImages.length > 0 && (
					<>
						{/* First Image - Right Side */}
						<m.div
							className='absolute right-2 md:right-2 lg:right-4 top-16 md:top-18 lg:top-24 w-[calc(100vw-20px)] sm:w-[600px] md:w-[750px] lg:w-[800px] h-[40vh] sm:h-[75vh] md:h-[90vh] lg:h-[90vh] z-10'
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, delay: 0.5 }}
						>
							<div className='relative w-full h-full overflow-hidden rounded-2xl bg-black/5 border border-black/10 shadow-xl group'>
								<Image
									src={allImages[0].url}
									alt={allImages[0].caption || 'Main project image'}
									fill
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 750px, 800px'
									className='object-cover transition-transform duration-500 group-hover:scale-105'
									priority
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
								{/* Hover Overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
							</div>
						</m.div>

						{/* Remaining Images - Grid Layout */}
						{allImages.length > 1 && (
							<section className='pt-[100vh] md:pt-[120vh] lg:pt-[120vh] px-4 md:px-6 lg:px-8'>
								{/* Section Heading */}
								<m.div
									className='text-center mb-8 md:mb-12 lg:mb-16'
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 1, delay: 0.2 }}
								>
									<h2 className='text-2xl sm:text-3xl lg:text-4xl font-light mb-4 text-black'>
										Project Gallery
									</h2>
									<p className='text-black/60 text-base md:text-lg max-w-2xl mx-auto px-4'>
										Explore detailed views and additional perspectives of this
										architectural project
									</p>
								</m.div>

								<div className='space-y-0'>
									{/* Mobile Layout - 2 images per row */}
									<div className='block sm:hidden'>
										{Array.from(
											{ length: Math.ceil((allImages.length - 1) / 2) },
											(_, rowIndex) => (
												<div
													key={`mobile-${rowIndex}`}
													className='flex w-full h-48'
												>
													{allImages
														.slice(1 + rowIndex * 2, 1 + (rowIndex + 1) * 2)
														.map((image, index) => {
															const actualIndex = rowIndex * 2 + index
															return (
																<GridImageCard
																	key={image.id}
																	image={image}
																	index={actualIndex}
																	positionInRow={index}
																	isMobile={true}
																/>
															)
														})}
												</div>
											)
										)}
									</div>

									{/* Desktop Layout - 3 images per row */}
									<div className='hidden sm:block'>
										{Array.from(
											{ length: Math.ceil((allImages.length - 1) / 3) },
											(_, rowIndex) => (
												<div
													key={`desktop-${rowIndex}`}
													className='flex w-full h-56 md:h-64 lg:h-80'
												>
													{allImages
														.slice(1 + rowIndex * 3, 1 + (rowIndex + 1) * 3)
														.map((image, index) => {
															const actualIndex = rowIndex * 3 + index
															return (
																<GridImageCard
																	key={image.id}
																	image={image}
																	index={actualIndex}
																	positionInRow={index}
																	isMobile={false}
																/>
															)
														})}
												</div>
											)
										)}
									</div>
								</div>
							</section>
						)}
					</>
				)}

				{/* CTA Section */}
				<m.section
					className='py-12 md:py-18 lg:py-24 px-4 md:px-8 lg:px-12'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1, delay: 0.3 }}
				>
					<div className='max-w-4xl mx-auto text-center'>
						<h2 className='text-2xl sm:text-3xl lg:text-4xl font-light mb-4 md:mb-6 text-black'>
							Want to create a similar project?
						</h2>
						<p className='text-black/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4'>
							Our professional team is ready to bring your most complex
							architectural projects to life
						</p>
						<m.div
							className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.5 }}
						>
							<button className='px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-black/80 hover:scale-105 text-sm md:text-base'>
								Contact Us
							</button>
							<button className='px-6 md:px-8 py-3 md:py-4 border border-black/20 text-black rounded-full font-medium transition-all duration-300 hover:bg-black/5 hover:scale-105 text-sm md:text-base'>
								View Portfolio
							</button>
						</m.div>
					</div>
				</m.section>

				{/* Simplified Progress Indicator */}
				<div className='fixed right-8 top-1/2 -translate-y-1/2 z-10'>
					<div className='flex flex-col gap-1'>
						{allImages.map((_, index) => (
							<m.div
								key={index}
								className='w-0.5 h-8 bg-black/20 rounded-full overflow-hidden'
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
							>
								<m.div
									className='w-full bg-black rounded-full'
									initial={{ height: 0 }}
									whileInView={{ height: '100%' }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.8 }}
								/>
							</m.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

interface CleanImageCardProps {
	image: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	index: number
	total: number
}

function CleanImageCard({ image, index, total }: CleanImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Asymmetric positioning
	const isLeftAligned = index % 3 === 0
	const offsetClass = isLeftAligned
		? 'ml-0'
		: index % 3 === 1
		? 'ml-20'
		: 'ml-40'

	return (
		<m.div
			className={`relative ${offsetClass} mb-6`}
			initial={{ opacity: 0, y: 100, scale: 0.8 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 1.2,
				delay: index * 0.2,
				type: 'spring',
				bounce: 0.2,
			}}
		>
			{/* Image Container - Uniform Size */}
			<div className='relative overflow-hidden rounded-2xl aspect-[4/3] bg-black/5 border border-black/10'>
				{/* Subtle Border Effect */}
				<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000'></div>

				<Image
					src={image.url}
					alt={image.caption || `Image ${index + 1}`}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className={`object-cover rounded-2xl transition-all duration-1000 hover:scale-105 ${
						imageLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setImageLoaded(true)}
				/>

				{/* Loading State */}
				{!imageLoaded && (
					<div className='absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 animate-pulse rounded-2xl'>
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse'></div>
					</div>
				)}

				{/* Subtle Hover Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl'></div>
			</div>

			{/* Caption */}
			{image.caption && (
				<m.p
					className='mt-4 text-black/60 text-sm font-light max-w-md'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
				>
					{image.caption}
				</m.p>
			)}

			{/* Progress Line */}
			<m.div
				className='mt-6 h-px bg-gradient-to-r from-black/40 to-transparent'
				initial={{ width: 0 }}
				whileInView={{ width: `${((index + 1) / total) * 100}%` }}
				viewport={{ once: true }}
				transition={{ delay: index * 0.2 + 1, duration: 1 }}
			/>
		</m.div>
	)
}

interface ScatteredImageCardProps {
	image: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	index: number
	total: number
}

function ScatteredImageCard({ image, index, total }: ScatteredImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Scattered positioning logic
	const positions = [
		'col-span-4 col-start-1 row-span-2',
		'col-span-3 col-start-6 row-span-1',
		'col-span-5 col-start-8 row-span-3',
		'col-span-3 col-start-2 row-span-2',
		'col-span-4 col-start-5 row-span-1',
		'col-span-3 col-start-9 row-span-2',
		'col-span-5 col-start-1 row-span-3',
		'col-span-4 col-start-7 row-span-2',
	]

	const sizes = [
		'h-128',
		'h-112',
		'h-144',
		'h-120',
		'h-104',
		'h-136',
		'h-160',
		'h-124',
	]

	const position = positions[index % positions.length]
	const size = sizes[index % sizes.length]

	return (
		<m.div
			className={`${position} ${size} mb-1`}
			initial={{ opacity: 0, y: 100, scale: 0.8 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 1.2,
				delay: index * 0.3,
				type: 'spring',
				bounce: 0.2,
			}}
		>
			{/* Image Container */}
			<div
				className={`relative overflow-hidden rounded-2xl ${size} bg-black/5 border border-black/10`}
			>
				<Image
					src={image.url}
					alt={image.caption || `Image ${index + 2}`}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className={`object-cover rounded-2xl transition-all duration-1000 hover:scale-105 ${
						imageLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setImageLoaded(true)}
				/>

				{/* Loading State */}
				{!imageLoaded && (
					<div className='absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 animate-pulse rounded-2xl'>
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse'></div>
					</div>
				)}

				{/* Hover Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl'></div>
			</div>
		</m.div>
	)
}

interface GridImageCardProps {
	image: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	index: number
	positionInRow: number
	isMobile?: boolean
}

function GridImageCard({
	image,
	index,
	positionInRow,
	isMobile = false,
}: GridImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Define random widths for mobile (2 columns) and desktop (3 columns)
	const mobileWidthDistributions = [
		['w-[45%]', 'w-[55%]'], // Row pattern 1 for mobile
		['w-[60%]', 'w-[40%]'], // Row pattern 2 for mobile
		['w-[40%]', 'w-[60%]'], // Row pattern 3 for mobile
		['w-[55%]', 'w-[45%]'], // Row pattern 4 for mobile
	]

	const desktopWidthDistributions = [
		['w-[30%]', 'w-[40%]', 'w-[30%]'], // Row pattern 1 for desktop
		['w-[35%]', 'w-[25%]', 'w-[40%]'], // Row pattern 2 for desktop
		['w-[45%]', 'w-[30%]', 'w-[25%]'], // Row pattern 3 for desktop
		['w-[25%]', 'w-[45%]', 'w-[30%]'], // Row pattern 4 for desktop
		['w-[40%]', 'w-[35%]', 'w-[25%]'], // Row pattern 5 for desktop
	]

	let width = 'w-[33.33%]' // default width

	if (isMobile) {
		const mobileRowPattern =
			Math.floor(index / 2) % mobileWidthDistributions.length
		width =
			mobileWidthDistributions[mobileRowPattern]?.[positionInRow] || 'w-[50%]'
	} else {
		const rowPattern = Math.floor(index / 3) % desktopWidthDistributions.length
		width =
			desktopWidthDistributions[rowPattern]?.[positionInRow] || 'w-[33.33%]'
	}

	return (
		<m.div
			className={`${width} h-full`}
			initial={{ opacity: 0, y: 100, scale: 0.8 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{
				duration: 1.2,
				delay: index * 0.1,
				type: 'spring',
				bounce: 0.2,
			}}
		>
			{/* Image Container */}
			<div className='relative overflow-hidden h-full bg-black/5'>
				<Image
					src={image.url}
					alt={image.caption || `Image ${index + 2}`}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className={`object-cover transition-all duration-1000 hover:scale-105 ${
						imageLoaded ? 'opacity-100' : 'opacity-0'
					}`}
					onLoad={() => setImageLoaded(true)}
				/>

				{/* Loading State */}
				{!imageLoaded && (
					<div className='absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 animate-pulse'>
						<div className='absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-pulse'></div>
					</div>
				)}

				{/* Hover Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500'></div>
			</div>
		</m.div>
	)
}
