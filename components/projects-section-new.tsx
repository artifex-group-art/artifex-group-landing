'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, Calendar, Tag, Images } from 'lucide-react'

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
}

interface Category {
	id: string
	name: string
	slug: string
	_count: {
		projects: number
	}
}

export function ProjectsSection() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [projects, setProjects] = useState<Project[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedCategory, setSelectedCategory] = useState<string>('all')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const [projectsRes, categoriesRes] = await Promise.all([
				fetch('/api/projects/published'),
				fetch('/api/categories'),
			])

			if (projectsRes.ok) {
				const projectsData = await projectsRes.json()
				setProjects(projectsData)
			}

			if (categoriesRes.ok) {
				const categoriesData = await categoriesRes.json()
				setCategories(
					categoriesData.filter((cat: Category) => cat._count.projects > 0)
				)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setLoading(false)
		}
	}

	const filteredProjects =
		selectedCategory === 'all'
			? projects
			: projects.filter(project => project.category?.id === selectedCategory)

	const featuredProjects = filteredProjects.filter(project => project.featured)
	const regularProjects = filteredProjects.filter(project => !project.featured)

	if (loading) {
		return (
			<section className='py-32 bg-card'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='flex justify-center items-center min-h-[400px]'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className='py-32 bg-card'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
				>
					<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-4 leading-tight'>
						Introducing our modern and national projects
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Explore our diverse portfolio of innovative architectural solutions
						across different categories
					</p>
				</motion.div>

				{/* Category Filter */}
				{categories.length > 0 && (
					<motion.div
						className='flex flex-wrap justify-center gap-3 mb-12'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Button
							variant={selectedCategory === 'all' ? 'default' : 'outline'}
							onClick={() => setSelectedCategory('all')}
							className='flex items-center space-x-2'
						>
							<Tag className='h-4 w-4' />
							<span>All Projects ({projects.length})</span>
						</Button>
						{categories.map(category => (
							<Button
								key={category.id}
								variant={
									selectedCategory === category.id ? 'default' : 'outline'
								}
								onClick={() => setSelectedCategory(category.id)}
								className='flex items-center space-x-2'
							>
								<Tag className='h-4 w-4' />
								<span>
									{category.name} ({category._count.projects})
								</span>
							</Button>
						))}
					</motion.div>
				)}

				{filteredProjects.length === 0 ? (
					<div className='text-center py-16'>
						<Tag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
						<p className='text-muted-foreground text-lg'>
							{selectedCategory === 'all'
								? 'No projects available at the moment.'
								: 'No projects found in this category.'}
						</p>
					</div>
				) : (
					<div className='space-y-16'>
						{/* Featured Projects */}
						{featuredProjects.length > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<h3 className='text-2xl font-semibold text-foreground mb-8 flex items-center space-x-2'>
									<Eye className='h-6 w-6 text-primary' />
									<span>Featured Projects</span>
								</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
									{featuredProjects.map((project, index) => (
										<ProjectCard
											key={project.id}
											project={project}
											index={index}
											featured
										/>
									))}
								</div>
							</motion.div>
						)}

						{/* Regular Projects */}
						{regularProjects.length > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								{featuredProjects.length > 0 && (
									<h3 className='text-2xl font-semibold text-foreground mb-8 flex items-center space-x-2'>
										<Calendar className='h-6 w-6 text-primary' />
										<span>All Projects</span>
									</h3>
								)}
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
									{regularProjects.map((project, index) => (
										<ProjectCard
											key={project.id}
											project={project}
											index={index}
										/>
									))}
								</div>
							</motion.div>
						)}
					</div>
				)}
			</div>
		</section>
	)
}

interface ProjectCardProps {
	project: Project
	index: number
	featured?: boolean
}

function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
	const primaryImage =
		project.images?.[0]?.url || project.imageUrl || '/placeholder.svg'
	const imageCount = project.images?.length || 0

	return (
		<motion.div
			className='group cursor-pointer'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -8 }}
		>
			<Link href={`/projects/${project.slug}`}>
				<div
					className={`relative overflow-hidden rounded-xl bg-muted ${
						featured ? 'h-80 lg:h-96' : 'h-64 lg:h-80'
					} transition-all duration-500 group-hover:shadow-2xl`}
				>
					{/* Image */}
					<img
						src={primaryImage}
						alt={project.title}
						className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					/>

					{/* Overlay */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />

					{/* Badges */}
					<div className='absolute top-4 left-4 flex flex-wrap gap-2'>
						{featured && (
							<Badge className='bg-primary text-primary-foreground'>
								Featured
							</Badge>
						)}
						{project.category && (
							<Badge variant='secondary' className='bg-background/90'>
								{project.category.name}
							</Badge>
						)}
						{imageCount > 1 && (
							<Badge
								variant='outline'
								className='bg-background/90 flex items-center space-x-1'
							>
								<Images className='h-3 w-3' />
								<span>{imageCount}</span>
							</Badge>
						)}
					</div>

					{/* Content */}
					<motion.div
						className='absolute bottom-0 left-0 right-0 p-6'
						initial={{ opacity: 0, y: 20 }}
						whileHover={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<h3
							className={`font-heading font-semibold text-white mb-2 ${
								featured ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
							}`}
						>
							{project.title}
						</h3>
						<p className='text-white/90 text-sm lg:text-base line-clamp-2 mb-3'>
							{project.description}
						</p>
						<div className='flex items-center justify-between'>
							<span className='text-white/70 text-xs lg:text-sm'>
								{new Date(project.createdAt).toLocaleDateString()}
							</span>
							<motion.div
								className='text-white/80 group-hover:text-white'
								whileHover={{ scale: 1.1 }}
							>
								<Eye className='h-4 w-4' />
							</motion.div>
						</div>
					</motion.div>

					{/* Hover Effect */}
					<div className='absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-300' />
				</div>
			</Link>
		</motion.div>
	)
}
