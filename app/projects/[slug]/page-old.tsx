'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Project {
	id: string
	title: string
	description: string
	imageUrl: string
	slug: string
	featured: boolean
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
		if (params.slug) {
			fetchProject(params.slug as string)
		}
	}, [params.slug])

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

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative h-[70vh] overflow-hidden'>
				<motion.img
					src={project.imageUrl}
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

				{/* Content */}
				<div className='absolute bottom-0 left-0 right-0 p-8 lg:p-16'>
					<div className='max-w-4xl'>
						<motion.div
							className='flex items-center gap-4 mb-6'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							{project.featured && (
								<Badge
									variant='secondary'
									className='bg-primary text-primary-foreground'
								>
									Featured Project
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

			{/* Content Section */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-4xl mx-auto px-6 lg:px-8'>
					<motion.div
						className='prose prose-lg max-w-none'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
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
						animate={{ opacity: 1, y: 0 }}
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
						animate={{ opacity: 1, y: 0 }}
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
		</div>
	)
}
