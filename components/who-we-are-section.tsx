'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface WhoWeAreImage {
	id: string
	url: string
	fileName: string
	order: number
	active: boolean
}

export function WhoWeAreSection() {
	const [images, setImages] = useState<WhoWeAreImage[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch('/api/who-we-are-images')
				if (response.ok) {
					const data = await response.json()
					// Sort by order and filter only active images
					const sortedImages = data
						.filter((img: WhoWeAreImage) => img.active)
						.sort((a: WhoWeAreImage, b: WhoWeAreImage) => a.order - b.order)
					setImages(sortedImages)
				}
			} catch (error) {
				console.error('Error fetching Who We Are images:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchImages()
	}, [])

	return (
		<section
			id='who-we-are'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-muted/30'
		>
			<div className='max-w-7xl mx-auto relative z-10'>
				<m.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, staggerChildren: 0.2 }}
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-16'
				>
					{/* Heading */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center'
					>
						<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary mb-4 leading-tight'>
							Who We Are
						</h2>
						<div className='w-24 h-1 bg-primary/20 mx-auto mt-6'></div>
					</m.div>

					{/* Content Grid - Text Left, Image Right */}
					<div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
						{/* Text Content - Left Side */}
						<m.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
							className='space-y-6 font-body text-lg text-primary/80 leading-relaxed order-2 lg:order-1'
						>
							<p>
								Founded in 2009,{' '}
								<span className='font-semibold text-primary'>
									ARTIFEX GROUP
								</span>{' '}
								is an international architecture and development company
								dedicated to creating spaces that inspire and improve lives.
							</p>

							<p>
								We design environments where people live, work, and learn,
								enhancing both functionality and aesthetics while bringing
								innovation into every project.
							</p>

							<div className='py-6 px-8 bg-primary/5 rounded-2xl border-l-4 border-primary'>
								<p className='mb-4'>
									Our team is a family of professionals united by a shared
									vision:
								</p>
								<p className='font-medium text-primary text-xl lg:text-2xl leading-relaxed'>
									to rethink, redesign, and reimagine architecture.
								</p>
							</div>

							<p>
								For us, architecture is not just about buildings — it's about
								creating impact with purpose.
							</p>

							<p className='font-medium text-primary text-xl'>
								We never repeat. Every project is a new opportunity to invent
								boldly, build creatively, and deliver solutions that shape the
								future.
							</p>
						</m.div>

						{/* Image - Right Side */}
						<m.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							viewport={{ once: true }}
							className='relative order-1 lg:order-2'
						>
							<div className='relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl'>
								<Image
									src='/who-we-are.jpg'
									alt='Artifex Group Team'
									fill
									sizes='(max-width: 1024px) 100vw, 50vw'
									className='object-cover'
									priority
								/>
								{/* Subtle overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
							</div>

							{/* Decorative element */}
							<div className='absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10' />
						</m.div>
					</div>

					{/* Images Gallery - Creative Masonry Layout */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						className='mt-16'
					>
						<h3 className='text-center font-heading text-2xl lg:text-3xl text-primary mb-8'>
							Our Team
						</h3>
						{loading ? (
							<div className='text-center py-8'>
								<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
							</div>
						) : images.length === 0 ? (
							<div className='text-center py-8 text-primary/60'>
								<p>No team images available yet.</p>
							</div>
						) : (
							<div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
								{images.map((image, index) => (
									<m.div
										key={image.id}
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.5, delay: index * 0.08 }}
										viewport={{ once: true }}
										className='group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500'
									>
										<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10' />
										<Image
											src={image.url}
											alt={image.fileName}
											fill
											className='object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out'
											sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw'
											priority={index < 3}
										/>
									</m.div>
								))}
							</div>
						)}
					</m.div>
				</m.div>
			</div>
		</section>
	)
}
