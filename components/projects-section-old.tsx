'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

interface Project {
	id: string
	title: string
	description: string
	imageUrl: string
	slug: string
	featured: boolean
	createdAt: string
}

export function ProjectsSection() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchProjects()
	}, [])

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects/published')
			if (response.ok) {
				const data = await response.json()
				setProjects(data)
			}
		} catch (error) {
			console.error('Error fetching projects:', error)
		} finally {
			setLoading(false)
		}
	}

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
				<motion.h2
					className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-16 text-center leading-tight'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
				>
					Introducing our modern and national projects
				</motion.h2>

				{projects.length === 0 ? (
					<div className='text-center py-16'>
						<p className='text-muted-foreground text-lg'>
							No projects available at the moment.
						</p>
					</div>
				) : (
					<div className='overflow-x-auto'>
						<motion.div
							ref={scrollRef}
							className='flex gap-8 pb-4'
							style={{ width: 'max-content' }}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							{projects.map((project, index) => (
								<motion.div
									key={project.id}
									className='relative group cursor-pointer flex-shrink-0'
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									whileHover={{ scale: 1.05 }}
								>
									<Link href={`/projects/${project.slug}`}>
										<div className='w-80 h-96 bg-muted rounded-lg overflow-hidden relative'>
											{project.featured && (
												<div className='absolute top-4 left-4 z-10'>
													<span className='bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium'>
														Featured
													</span>
												</div>
											)}
											<img
												src={project.imageUrl || '/placeholder.svg'}
												alt={project.title}
												className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
											/>
											<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300' />
											<motion.div
												className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent'
												initial={{ opacity: 0, y: 20 }}
												whileHover={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3 }}
											>
												<h3 className='font-heading font-medium text-xl text-white mb-2'>
													{project.title}
												</h3>
												<p className='text-white/80 text-sm line-clamp-2'>
													{project.description}
												</p>
											</motion.div>
										</div>
									</Link>
								</motion.div>
							))}
						</motion.div>
					</div>
				)}
			</div>
		</section>
	)
}
