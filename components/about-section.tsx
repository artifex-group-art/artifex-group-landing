'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutSection() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	}

	const leftVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: 'easeInOut',
			},
		},
	}

	const rightVariants = {
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<section className='py-32 px-6 lg:px-8 relative overflow-hidden bg-background'>
			<div className='absolute inset-0 pointer-events-none'>
				{/* Geometric grid pattern */}
				<div className='absolute top-0 left-0 w-full h-full opacity-30'>
					<div className='grid grid-cols-12 h-full'>
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className='border-r border-primary/20' />
						))}
					</div>
				</div>

				{/* Floating geometric shapes */}
				<motion.div
					className='absolute top-20 right-20 w-32 h-32 border-2 border-primary/50 rotate-45'
					animate={{ rotate: [45, 90, 45] }}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'linear',
					}}
				/>
				<motion.div
					className='absolute bottom-32 left-16 w-24 h-24 bg-primary/20 rounded-full'
					animate={{ scale: [1, 1.2, 1] }}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				{/* Tech-style lines */}
				<div className='absolute top-1/3 left-0 w-64 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />
				<div className='absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent' />
			</div>

			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					className='grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
				>
					{/* Left Column - Text Content */}
					<motion.div
						className='lg:col-span-2 relative'
						variants={leftVariants}
					>
						<div className='absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-primary/80 to-transparent' />

						<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-8 leading-tight relative'>
							We focused on modern design
							<div className='absolute -bottom-2 left-0 w-32 h-px bg-primary/80' />
						</h2>

						<div className='space-y-6 font-body text-lg text-primary/80 leading-relaxed'>
							<div className='flex items-center gap-4 mb-6'>
								<div className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-primary/90 rounded-full animate-pulse' />
									<span className='text-sm font-mono text-primary/90'>
										15+ Years Experience
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<div
										className='w-2 h-2 bg-primary/70 rounded-full animate-pulse'
										style={{ animationDelay: '0.5s' }}
									/>
									<span className='text-sm font-mono text-primary/70'>
										200+ Projects
									</span>
								</div>
							</div>

							<p>
								ARTIFEX GROUP is an international architectural company that
								specializes in creating innovative spaces that blend
								functionality with aesthetic excellence. Our approach combines
								contemporary design principles with sustainable practices.
							</p>
							<p>
								We believe that architecture should not only serve its purpose
								but also inspire and elevate the human experience. Every project
								we undertake is a testament to our commitment to quality,
								innovation, and environmental responsibility.
							</p>
							<p>
								From residential complexes to commercial spaces, our portfolio
								reflects our dedication to creating environments that enhance
								the way people live, work, and interact.
							</p>

							<div className='grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-primary/10'>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='font-mono text-primary/90'>
											Innovation
										</span>
										<span className='font-mono text-primary/90'>95%</span>
									</div>
									<div className='h-1 bg-primary/10 rounded-full overflow-hidden'>
										<motion.div
											className='h-full bg-primary/90 rounded-full'
											initial={{ width: 0 }}
											whileInView={{ width: '95%' }}
											transition={{ duration: 2, delay: 0.5 }}
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-sm'>
										<span className='font-mono text-primary/90'>
											Sustainability
										</span>
										<span className='font-mono text-primary/90'>88%</span>
									</div>
									<div className='h-1 bg-primary/10 rounded-full overflow-hidden'>
										<motion.div
											className='h-full bg-primary/90 rounded-full'
											initial={{ width: 0 }}
											whileInView={{ width: '88%' }}
											transition={{ duration: 2, delay: 0.7 }}
										/>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right Column - Founder Photo and Quote */}
					<motion.div className='space-y-8 relative' variants={rightVariants}>
						<div className='relative'>
							<div className='absolute -inset-4 border border-primary/40 rounded-lg' />
							<div className='absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/80' />
							<div className='absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/80' />
							<div className='absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary/80' />
							<div className='absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/80' />

							<div className='aspect-[2/3] max-w-xs bg-muted rounded-lg overflow-hidden relative'>
								<Image
									width={600}
									height={600}
									src='/founder.jpg'
									alt='Rustam Khaitmetov, Founder'
									className='w-full h-full object-cover grayscale'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent' />
							</div>
						</div>

						<blockquote className='space-y-4 relative'>
							<div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/80 via-primary/60 to-transparent' />
							<p className='font-body text-lg text-primary/80 leading-relaxed italic pl-6'>
								"ARTIFEX GROUP is not just a company; it is a team of
								professionals united by a common vision of creating spaces that
								inspire and transform."
							</p>
							<footer className='text-sm font-medium text-primary/90 pl-6 flex items-center gap-2'>
								<div className='w-2 h-2 bg-primary/90 rounded-full' />— Rustam
								Khaitmetov, Founder of Artifex
							</footer>
						</blockquote>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
