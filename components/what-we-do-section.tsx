'use client'

import { m } from 'framer-motion'
import {
	Building2,
	Layers,
	Box,
	Share2,
	Package,
	HardHat,
	Clapperboard,
	ClipboardCheck,
} from 'lucide-react'

const services = [
	{
		icon: Building2,
		title: 'Master Planning & Urban Design',
		description: 'Strategic planning for sustainable urban development',
	},
	{
		icon: Layers,
		title: 'Architectural Design',
		description: 'Residential, commercial, and institutional projects',
	},
	{
		icon: Box,
		title: 'Façade Engineering',
		description: 'Custom system development and engineering',
	},
	{
		icon: Share2,
		title: 'BIM-Based Design',
		description: 'Digital coordination and advanced modeling',
	},
	{
		icon: Package,
		title: 'Material Supply',
		description: 'Premium materials for façade systems',
	},
	{
		icon: HardHat,
		title: 'Construction Support',
		description: 'Site management and technical assistance',
	},
	{
		icon: Clapperboard,
		title: '3D Visualization',
		description: 'Animation and concept modeling',
	},
	{
		icon: ClipboardCheck,
		title: 'Construction Management',
		description: 'Complete project organization and oversight',
	},
]

export function WhatWeDoSection() {
	return (
		<section
			id='what-we-do'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-background'
		>
			<div className='max-w-7xl mx-auto'>
				<m.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-16'
				>
					{/* Heading */}
					<div className='text-center space-y-4'>
						<m.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='font-heading font-semibold text-4xl lg:text-5xl text-primary leading-tight'
						>
							What We Do
						</m.h2>
						<div className='w-24 h-1 bg-primary/20 mx-auto'></div>
						<m.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className='font-body text-lg text-primary/70 max-w-3xl mx-auto'
						>
							ARTIFEX GROUP delivers a full spectrum of architectural and
							development services — from concept to completion.
						</m.p>
					</div>

					{/* Services Grid */}
					<div>
						<m.h3
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='font-heading text-2xl lg:text-3xl text-primary mb-8 text-center'
						>
							Our Services
						</m.h3>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{services.map((service, index) => {
								const Icon = service.icon
								return (
									<m.div
										key={service.title}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.05 }}
										viewport={{ once: true }}
										className='group p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 hover:from-green-100 hover:to-green-200/50 dark:hover:from-green-900/30 dark:hover:to-green-800/20 rounded-xl border border-green-200/50 hover:border-green-300/70 transition-all duration-300 hover:shadow-lg'
									>
										<div className='flex flex-col items-center text-center space-y-4'>
											<div className='p-3 bg-green-100/50 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200/70 dark:group-hover:bg-green-800/40 transition-colors duration-300'>
												<Icon className='w-8 h-8 text-primary' />
											</div>
											<h4 className='font-heading font-semibold text-base text-primary'>
												{service.title}
											</h4>
											<p className='font-body text-sm text-primary/60 leading-relaxed'>
												{service.description}
											</p>
										</div>
									</m.div>
								)
							})}
						</div>
					</div>

					{/* Beyond Design Section */}
					<m.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						className='mt-16 relative'
					>
						<div className='bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-10 lg:p-16 shadow-2xl'>
							<div className='relative'>
								{/* Quote Mark */}
								<div className='absolute -top-8 -left-4 text-8xl font-serif text-white/20 leading-none'>
									"
								</div>
								<blockquote className='relative z-10 space-y-6'>
									<h3 className='font-heading text-2xl lg:text-3xl font-semibold text-white text-center leading-relaxed'>
										Beyond Design
									</h3>
									<p className='font-body text-lg text-white/90 text-center max-w-3xl mx-auto leading-relaxed'>
										We go beyond design to provide full-scale construction
										management and execution. From site planning and logistics
										to procurement, scheduling, supervision, and quality control
										— we organize and oversee every stage of the building
										process.
									</p>
									<p className='font-body text-lg text-white text-center max-w-3xl mx-auto font-medium'>
										Our mission is to ensure each project moves efficiently from
										vision to reality, maintaining the highest standards of
										efficiency, safety, and quality.
									</p>
								</blockquote>
							</div>
						</div>
					</m.div>
				</m.div>
			</div>
		</section>
	)
}
