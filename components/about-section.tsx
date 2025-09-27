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
		<section
			id='about'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-background'
		>
			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					className='grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
				>
					{/* Left Column - Text Content */}
					<motion.div className='lg:col-span-2' variants={leftVariants}>
						<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-8 leading-tight'>
							We focused on modern design
						</h2>

						<div className='space-y-6 font-body text-lg text-primary/80 leading-relaxed'>
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
						</div>
					</motion.div>

					{/* Right Column - Founder Photo and Quote */}
					<motion.div className='space-y-8' variants={rightVariants}>
						<div className='relative'>
							<div className='aspect-[2/3] max-w-sm bg-muted rounded-lg overflow-hidden relative border border-primary/20 shadow-sm'>
								<Image
									width={600}
									height={600}
									src='/founder.jpg'
									alt='Rustam Khaitmetov, Founder'
									className='w-full h-full object-cover'
								/>
							</div>
						</div>

						<blockquote className='space-y-4'>
							<p className='font-body text-lg text-primary/80 leading-relaxed italic'>
								"ARTIFEX GROUP is not just a company; it is a team of
								professionals united by a common vision of creating spaces that
								inspire and transform."
							</p>
							<footer className='text-sm font-medium text-primary/90'>
								— Rustam Khaitmetov, Founder of Artifex
							</footer>
						</blockquote>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
