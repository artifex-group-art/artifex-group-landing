'use client'

import { m } from 'framer-motion'
import {
	Globe,
	Building,
	GraduationCap,
	Layers,
	Home,
	Shield,
} from 'lucide-react'
import Image from 'next/image'

const partnerships = [
	{
		icon: Building,
		title: 'Leading Global Firms',
		description: 'Partners in China, Russia, Europe, and the Middle East',
	},
	{
		icon: GraduationCap,
		title: 'Educational Planning',
		description: 'Strategic consulting with Consilium Engineering and others',
	},
	{
		icon: Home,
		title: 'Residential Technologies',
		description: 'Urban development studios worldwide',
	},
	{
		icon: Layers,
		title: 'Façade Systems',
		description: 'Manufacturers and sustainability-focused design firms',
	},
	{
		icon: Shield,
		title: 'UK Institutions',
		description: 'Educational institutions and research centers',
	},
]

export function PartnershipsSection() {
	return (
		<section
			id='partnerships'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-background'
		>
			{/* Background Decoration */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl' />
				<div className='absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl' />
			</div>

			<div className='max-w-7xl mx-auto relative z-10'>
				<m.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-16'
				>
					{/* Heading */}
					<div className='text-center space-y-4'>
						<m.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='inline-flex items-center gap-2 mb-4'
						>
							<Globe className='w-8 h-8 text-primary' />
							<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary leading-tight'>
								International Partnerships
							</h2>
						</m.div>
						<div className='w-24 h-1 bg-primary/20 mx-auto'></div>
						<m.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className='font-body text-lg text-primary/70 max-w-4xl mx-auto leading-relaxed'
						>
							ARTIFEX GROUP has established strong collaborations with leading
							companies and institutions worldwide
						</m.p>
					</div>

					{/* Partnerships Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
						{partnerships.map((partner, index) => {
							const Icon = partner.icon
							return (
								<m.div
									key={partner.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.08 }}
									viewport={{ once: true }}
									className='group relative p-6 bg-muted/30 hover:bg-muted/50 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-300'
								>
									<div className='flex flex-col items-center text-center space-y-3'>
										<div className='p-3 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300'>
											<Icon className='w-7 h-7 text-primary' />
										</div>
										<h4 className='font-heading font-semibold text-sm text-primary'>
											{partner.title}
										</h4>
										<p className='font-body text-xs text-primary/60 leading-relaxed'>
											{partner.description}
										</p>
									</div>
								</m.div>
							)
						})}
					</div>

					{/* Global Integration Statement */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						viewport={{ once: true }}
						className='bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 lg:p-10 border border-primary/10 text-center'
					>
						<p className='font-body text-base lg:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto'>
							Through these global alliances, ARTIFEX integrates{' '}
							<span className='font-semibold text-primary'>
								international standards
							</span>{' '}
							and{' '}
							<span className='font-semibold text-primary'>
								advanced technologies
							</span>{' '}
							into projects that respect local cultural context and
							environmental conditions.
						</p>
					</m.div>

					{/* ALUTECH Partnership - Premium Section */}
					<m.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						className='relative'
					>
						<div className='bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 rounded-3xl p-8 lg:p-12 border-2 border-green-200/50 shadow-xl'>
							{/* Logos Section - Professional Display */}
							<div className='flex items-center justify-center gap-8 lg:gap-12 mb-8'>
								<m.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.5 }}
									viewport={{ once: true }}
									className='relative w-32 h-32 lg:w-40 lg:h-40'
								>
									<Image
										src='/logo.png'
										alt='ARTIFEX GROUP Logo'
										fill
										className='object-contain'
									/>
								</m.div>

								<div className='flex flex-col items-center gap-2'>
									<div className='w-px h-16 bg-gradient-to-b from-transparent via-green-400 to-transparent' />
									<span className='text-2xl font-bold text-green-600 dark:text-green-400'>
										×
									</span>
									<div className='w-px h-16 bg-gradient-to-b from-transparent via-green-400 to-transparent' />
								</div>

								<m.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.6 }}
									viewport={{ once: true }}
									className='relative w-32 h-32 lg:w-40 lg:h-40'
								>
									<Image
										src='/alutech.png'
										alt='ALUTECH Logo'
										fill
										className='object-contain'
									/>
								</m.div>
							</div>

							{/* Title & Subtitle */}
							<div className='text-center mb-8'>
								<h3 className='font-heading text-3xl lg:text-4xl font-bold text-primary mb-3'>
									ARTIFEX × ALUTECH
								</h3>
								<p className='text-green-700 dark:text-green-300 font-semibold text-lg lg:text-xl'>
									Strategic Partner & Official Dealer in Saudi Arabia
								</p>
							</div>

							{/* Content Section */}
							<div className='max-w-3xl mx-auto space-y-6'>
								<p className='font-body text-base lg:text-lg text-primary/80 leading-relaxed text-center'>
									We are proud to be the strategic partner and official dealer
									of <span className='font-bold text-primary'>ALUTECH</span> in
									Saudi Arabia.
								</p>
								<p className='font-body text-base lg:text-lg text-primary/80 leading-relaxed text-center'>
									Our mission is to bring only the best solutions to the Kingdom
									— systems proven over time and implemented in hundreds of
									projects worldwide.
								</p>
								<div className='flex justify-center pt-4'>
									<div className='bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-xl shadow-lg'>
										<p className='font-heading font-bold text-lg lg:text-xl'>
											ARTIFEX — Uncompromising Quality
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Decorative Elements */}
						<div className='absolute -top-3 -right-3 w-24 h-24 bg-green-200/30 rounded-full blur-2xl -z-10' />
						<div className='absolute -bottom-3 -left-3 w-24 h-24 bg-green-200/30 rounded-full blur-2xl -z-10' />
					</m.div>
				</m.div>
			</div>
		</section>
	)
}
