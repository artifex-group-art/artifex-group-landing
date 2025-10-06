'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// DB dan projectlar ma'lumotini olish uchun interface (Prisma schema ga mos)
interface ProjectImage {
	id: string
	url: string
	fileName: string
	caption?: string
	order: number
}

interface Category {
	id: string
	name: string
	slug: string
}

interface Project {
	id: string
	title: string
	description: string
	imageUrl?: string
	slug: string
	published: boolean
	featured: boolean
	category?: Category
	images: ProjectImage[]
	createdAt: string
	updatedAt: string
}

// Real API dan projectlarni olish
const getProjects = async (): Promise<Project[]> => {
	try {
		const response = await fetch('/api/projects/published')
		if (!response.ok) {
			throw new Error('Failed to fetch projects')
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching projects:', error)
		return []
	}
}

export default function ProjectsSection() {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setError(null)
				const projectsData = await getProjects()
				setProjects(projectsData)
			} catch (error) {
				console.error('Error loading projects:', error)
				setError('Projectlarni yuklashda xatolik yuz berdi')
			} finally {
				setLoading(false)
			}
		}

		loadProjects()
	}, [])

	const handleProjectClick = (slug: string) => {
		router.push(`/projects/${slug}`)
	}

	if (loading) {
		return (
			<section id='projects' className='py-32 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-16'>
					<div className='text-center space-y-8'>
						<div>
							<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
								Project Portfolio
							</h2>
							<div className='w-24 h-1 bg-primary/20 mx-auto mt-6 mb-8'></div>
							<p className='text-primary/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'>
								With over 20 years of design and construction experience,
								ARTIFEX GROUP has successfully delivered landmark projects
								across different regions
							</p>
						</div>
					</div>
				</div>

				{/* Loading Grid */}
				<div className='grid grid-cols-3 gap-0'>
					{[...Array(6)].map((_, i) => (
						<div key={i} className='aspect-[4/5] bg-gray-200 animate-pulse' />
					))}
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section id='projects' className='py-32 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-16'>
					<div className='text-center space-y-8'>
						<div>
							<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
								Project Portfolio
							</h2>
							<div className='w-24 h-1 bg-primary/20 mx-auto mt-6 mb-8'></div>
							<p className='text-primary/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'>
								With over 20 years of design and construction experience,
								ARTIFEX GROUP has successfully delivered landmark projects
								across different regions
							</p>
						</div>
					</div>
				</div>

				{/* Error Message */}
				<div className='flex items-center justify-center h-64'>
					<p className='text-red-500 text-center font-medium'>{error}</p>
				</div>
			</section>
		)
	}

	if (projects.length === 0) {
		return (
			<section id='projects' className='py-32 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-16'>
					<div className='text-center space-y-8'>
						<div>
							<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
								Project Portfolio
							</h2>
							<div className='w-24 h-1 bg-primary/20 mx-auto mt-6 mb-8'></div>
							<p className='text-primary/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'>
								With over 20 years of design and construction experience,
								ARTIFEX GROUP has successfully delivered landmark projects
								across different regions
							</p>
						</div>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center h-64'>
					<p className='text-gray-500 text-center font-medium'>
						No projects found at the moment
					</p>
				</div>
			</section>
		)
	}

	return (
		<section id='projects' className='py-32 bg-white'>
			{/* Section Header */}
			<motion.div
				className='max-w-7xl mx-auto px-6 lg:px-8 mb-16'
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
			>
				<div className='text-center space-y-8'>
					<div>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Project Portfolio
						</h2>
						<div className='w-24 h-1 bg-primary/20 mx-auto mt-6 mb-8'></div>
						<p className='text-primary/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'>
							With over 20 years of design and construction experience, ARTIFEX
							GROUP has successfully delivered landmark projects across
							different regions
						</p>
					</div>

					{/* Statistics */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12'
					>
						<div className='text-center p-6 bg-muted/30 rounded-xl border border-primary/10'>
							<div className='text-4xl lg:text-5xl font-heading font-bold text-primary mb-2'>
								300+
							</div>
							<div className='text-sm lg:text-base text-primary/70 font-medium'>
								Residential Villas
							</div>
						</div>
						<div className='text-center p-6 bg-muted/30 rounded-xl border border-primary/10'>
							<div className='text-4xl lg:text-5xl font-heading font-bold text-primary mb-2'>
								10+
							</div>
							<div className='text-sm lg:text-base text-primary/70 font-medium'>
								High-Rise Buildings
							</div>
						</div>
						<div className='text-center p-6 bg-muted/30 rounded-xl border border-primary/10'>
							<div className='text-4xl lg:text-5xl font-heading font-bold text-primary mb-2'>
								20+
							</div>
							<div className='text-sm lg:text-base text-primary/70 font-medium'>
								Commercial & Retail Complexes
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>

			{/* Projects Grid */}
			<motion.div
				className='grid grid-cols-3 gap-0'
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
			>
				{projects.map((project, index) => {
					// Birinchi rasmni olish (images array dan yoki imageUrl dan)
					const firstImage =
						project.images[0]?.url || project.imageUrl || '/placeholder.jpg'

					return (
						<motion.div
							key={project.id}
							className='aspect-[4/5] overflow-hidden group cursor-pointer relative'
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							onClick={() => handleProjectClick(project.slug)}
						>
							<img
								src={firstImage}
								alt={project.title}
								className='w-full h-full object-cover transition-all duration-500'
							/>
							{/* Hover qoralashish effekti */}
							<div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500' />

							{/* Hover da project title ko'rsatish (ixtiyoriy) */}
							<div className='absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
								<h3 className='text-white font-medium text-sm bg-black/50 backdrop-blur-sm px-2 py-1 rounded'>
									{project.title}
								</h3>
							</div>
						</motion.div>
					)
				})}
			</motion.div>
		</section>
	)
}
