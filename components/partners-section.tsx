'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

const partners = [
	{ name: 'Partner 1', logo: '/architectural-firm-logo-minimalist.jpg' },
	{ name: 'Partner 2', logo: '/construction-company-logo-clean.jpg' },
	{ name: 'Partner 3', logo: '/engineering-firm-logo-modern.jpg' },
	{ name: 'Partner 4', logo: '/design-studio-logo-geometric.jpg' },
	{ name: 'Partner 5', logo: '/real-estate-company-logo-professional.jpg' },
]

export function PartnersSection() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94] as any,
			},
		},
	}

	return (
		<section className='py-32 px-6 lg:px-8'>
			<div className='max-w-6xl mx-auto text-center'>
				<m.h2
					className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-16 leading-tight'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
				>
					Organizations that partnered with us
				</m.h2>

				<m.div
					className='flex flex-wrap justify-center items-center gap-12 lg:gap-16'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
				>
					{partners.map((partner, index) => (
						<m.div
							key={index}
							className='group cursor-pointer'
							variants={itemVariants}
							whileHover={{
								y: -5,
								transition: { type: 'spring', stiffness: 300 },
							}}
						>
							<Image
								src={partner.logo || '/placeholder.svg'}
								alt={partner.name}
								width={120}
								height={48}
								className='h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100'
							/>
						</m.div>
					))}
				</m.div>
			</div>
		</section>
	)
}
