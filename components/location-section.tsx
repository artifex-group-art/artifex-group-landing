'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2 } from 'lucide-react'

const locations = [
	{
		title: 'Main Office',
		type: 'Office',
		address: 'Madinah, Saudi Arabia',
		mapUrl: 'https://maps.app.goo.gl/NGfL1YKEf5ybSeu7A',
		embedUrl:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.3956744862697!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890',
		icon: Building2,
	},
	{
		title: 'Administration',
		type: 'Administration Office',
		address: 'Madinah, Saudi Arabia',
		mapUrl: 'https://maps.app.goo.gl/HkZNRuBNyKrunuu19',
		embedUrl:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.3956744862697!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890',
		icon: MapPin,
	},
]

export function LocationSection() {
	return (
		<section
			id='location'
			className='py-32 px-6 lg:px-8 relative overflow-hidden bg-muted/20'
		>
			{/* Background Decoration */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl' />
				<div className='absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl' />
			</div>

			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-16'
				>
					{/* Heading */}
					<div className='text-center space-y-4'>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='inline-flex items-center gap-2 mb-4'
						>
							<MapPin className='w-8 h-8 text-primary' />
							<h2 className='font-heading font-semibold text-4xl lg:text-5xl text-primary leading-tight'>
								Our Locations
							</h2>
						</motion.div>
						<div className='w-24 h-1 bg-primary/20 mx-auto'></div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							viewport={{ once: true }}
							className='font-body text-lg text-primary/70 max-w-3xl mx-auto leading-relaxed'
						>
							Visit us at our offices in Riyadh to discuss your next project
						</motion.p>
					</div>

					{/* Locations Grid */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{locations.map((location, index) => {
							const Icon = location.icon
							return (
								<motion.div
									key={location.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									className='group bg-background rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300'
								>
									{/* Map Container */}
									<div className='relative w-full h-64 lg:h-80 overflow-hidden'>
										<iframe
											src={location.embedUrl}
											width='100%'
											height='100%'
											style={{ border: 0 }}
											allowFullScreen
											loading='lazy'
											referrerPolicy='no-referrer-when-downgrade'
											className='w-full h-full'
										></iframe>
										{/* Overlay on hover */}
										<div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
									</div>

									{/* Location Info */}
									<div className='p-6 lg:p-8 space-y-4'>
										<div className='flex items-start gap-4'>
											<div className='p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors duration-300'>
												<Icon className='w-6 h-6 text-primary' />
											</div>
											<div className='flex-1'>
												<h3 className='font-heading text-2xl font-bold text-primary mb-1'>
													{location.title}
												</h3>
												<p className='text-primary/60 font-medium mb-3'>
													{location.type}
												</p>
												<p className='font-body text-primary/70 leading-relaxed flex items-center gap-2'>
													<MapPin className='w-4 h-4 text-primary/50' />
													{location.address}
												</p>
											</div>
										</div>

										{/* Action Button */}
										<a
											href={location.mapUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='block w-full text-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-heading font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'
										>
											Open in Google Maps
										</a>
									</div>
								</motion.div>
							)
						})}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
