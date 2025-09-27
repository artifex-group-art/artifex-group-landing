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
			<section id='projects' className='py-16 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Our Projects
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Explore our portfolio of architectural excellence and innovative
							design solutions
						</p>
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
			<section id='projects' className='py-16 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Our Projects
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Explore our portfolio of architectural excellence and innovative
							design solutions
						</p>
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
			<section id='projects' className='py-16 bg-white'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Our Projects
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Explore our portfolio of architectural excellence and innovative
							design solutions
						</p>
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
		<section id='projects' className='py-16 bg-white'>
			{/* Section Header */}
			<motion.div
				className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
			>
				<div className='text-center'>
					<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
						Our Projects
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Explore our portfolio of architectural excellence and innovative
						design solutions
					</p>
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
