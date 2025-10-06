'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Heart, Sparkles } from 'lucide-react'

const philosophyPoints = [
	{
		icon: Lightbulb,
		title: 'Innovation',
		description: 'Constantly seeking new ideas to transform spaces',
	},
	{
		icon: Heart,
		title: 'Meaning',
		description: 'Every design reflects purpose and connection',
	},
	{
		icon: Sparkles,
		title: 'Future Thinking',
		description: 'Building for tomorrow, not just today',
	},
]

export function PhilosophySection() {
	return (
		<section
			id='philosophy'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-muted/30'
		>
			{/* Background Decoration */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl' />
				<div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl' />
			</div>

			<div className='max-w-6xl mx-auto relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-16'
				>
					{/* Heading */}
					<div className='text-center space-y-4'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='font-heading font-semibold text-4xl lg:text-5xl text-primary leading-tight'
						>
							Our Philosophy
						</motion.h2>
						<div className='w-24 h-1 bg-primary/20 mx-auto'></div>
					</div>

					{/* Main Content */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className='space-y-8'
					>
						<p className='font-body text-lg lg:text-xl text-primary/80 leading-relaxed text-center max-w-4xl mx-auto'>
							At{' '}
							<span className='font-semibold text-primary'>ARTIFEX GROUP</span>,
							we believe design must unite comfort and functionality with
							aesthetics and purpose. Every project we deliver reflects our core
							values: innovation, meaning, and future thinking.
						</p>

						{/* Core Values */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12'>
							{philosophyPoints.map((point, index) => {
								const Icon = point.icon
								return (
									<motion.div
										key={point.title}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
										className='group relative'
									>
										<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300' />
										<div className='relative p-8 text-center space-y-4'>
											<div className='inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300'>
												<Icon
													className='w-8 h-8 text-primary'
													strokeWidth={1.5}
												/>
											</div>
											<h3 className='font-heading text-xl font-semibold text-primary'>
												{point.title}
											</h3>
											<p className='font-body text-primary/70 leading-relaxed'>
												{point.description}
											</p>
										</div>
									</motion.div>
								)
							})}
						</div>

						{/* Quote Section */}
						<motion.div
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
										<p className='font-heading text-2xl lg:text-3xl font-medium text-white text-center leading-relaxed'>
											We don't build for today — we build for the future.
										</p>
										<p className='font-body text-lg text-white/90 text-center max-w-3xl mx-auto'>
											Our team constantly seeks new ideas to transform ordinary
											spaces into environments that inspire, heal, and connect.
										</p>
									</blockquote>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
