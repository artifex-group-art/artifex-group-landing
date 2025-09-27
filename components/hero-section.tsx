'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface HeroImage {
	id: string
	url: string
	fileName: string
	order: number
	active: boolean
}

// Animated Number Hook
const useAnimatedNumber = (end: number, duration: number = 2000) => {
	const [count, setCount] = useState(0)
	const [hasAnimated, setHasAnimated] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)
	const isInView = useInView(ref, { once: true })

	useEffect(() => {
		if (isInView && !hasAnimated) {
			setHasAnimated(true)
			let startTime: number
			const animate = (currentTime: number) => {
				if (!startTime) startTime = currentTime
				const progress = Math.min((currentTime - startTime) / duration, 1)

				// Easing function for smooth animation
				const easeOutCubic = 1 - Math.pow(1 - progress, 3)
				setCount(Math.floor(easeOutCubic * end))

				if (progress < 1) {
					requestAnimationFrame(animate)
				}
			}
			requestAnimationFrame(animate)
		}
	}, [isInView, end, duration, hasAnimated])

	return { count, ref }
}

// Statistics Component
const StatisticsSection = () => {
	const experience = useAnimatedNumber(15)
	const projects = useAnimatedNumber(100)
	const clients = useAnimatedNumber(10)

	return (
		<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12 items-center justify-center'>
			{/* Years of Experience */}
			<div className='text-center group'>
				<div className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110'>
					<span ref={experience.ref} className='drop-shadow-2xl'>
						{experience.count}
					</span>
					<span className='text-white/80'>+</span>
				</div>
				<div className='text-xs sm:text-sm md:text-base text-white/80 font-light tracking-[0.2em] uppercase'>
					Years Experience
				</div>
			</div>

			{/* Separator Line */}
			<div className='hidden sm:block w-px h-12 md:h-16 bg-white/30'></div>

			{/* Completed Projects */}
			<div className='text-center group'>
				<div className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110'>
					<span ref={projects.ref} className='drop-shadow-2xl'>
						{projects.count}
					</span>
					<span className='text-white/80'>+</span>
				</div>
				<div className='text-xs sm:text-sm md:text-base text-white/80 font-light tracking-[0.2em] uppercase'>
					Projects
				</div>
			</div>

			{/* Separator Line */}
			<div className='hidden sm:block w-px h-12 md:h-16 bg-white/30'></div>

			{/* Constant Clients */}
			<div className='text-center group'>
				<div className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110'>
					<span ref={clients.ref} className='drop-shadow-2xl'>
						{clients.count}
					</span>
					<span className='text-white/80'>+</span>
				</div>
				<div className='text-xs sm:text-sm md:text-base text-white/80 font-light tracking-[0.2em] uppercase'>
					Constant Clients
				</div>
			</div>
		</div>
	)
}

export default function HeroSection() {
	// Static hero images from public folder
	const staticHeroImages = [
		{
			id: '1',
			url: '/001.jpg',
			fileName: '001.jpg',
			order: 1,
			active: true,
		},
		{
			id: '2',
			url: '/002.jpg',
			fileName: '002.jpg',
			order: 2,
			active: true,
		},
		{
			id: '3',
			url: '/003.PNG',
			fileName: '003.PNG',
			order: 3,
			active: true,
		},
		{
			id: '4',
			url: '/004.jpg',
			fileName: '004.jpg',
			order: 4,
			active: true,
		},
	]

	const [heroImages, setHeroImages] = useState<HeroImage[]>(staticHeroImages)
	const [loading, setLoading] = useState(true)
	const [imagesLoaded, setImagesLoaded] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	// Preload images function
	const preloadImages = (images: HeroImage[]) => {
		if (images.length === 0) {
			setImagesLoaded(true)
			return
		}

		let loadedCount = 0
		const totalImages = images.length

		images.forEach(image => {
			const img = new Image()
			img.onload = () => {
				loadedCount++
				if (loadedCount === totalImages) {
					setImagesLoaded(true)
				}
			}
			img.onerror = () => {
				loadedCount++
				if (loadedCount === totalImages) {
					setImagesLoaded(true)
				}
			}
			img.src = image.url
		})
	}

	useEffect(() => {
		// Use static images instead of fetching from API
		preloadImages(staticHeroImages)
		setLoading(false)
	}, [])

	// Auto slide effect
	useEffect(() => {
		if (staticHeroImages.length > 0) {
			const interval = setInterval(() => {
				setCurrentImageIndex(prev => (prev + 1) % staticHeroImages.length)
			}, 5000) // 5 seconds auto slide

			return () => clearInterval(interval)
		}
	}, []) // Removed heroImages dependency since we're using static data

	const handleDotClick = (index: number) => {
		setCurrentImageIndex(index)
	}
	const titleVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const letterVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.46, 0.45, 0.94] as any,
			},
		},
	}

	const subtitleVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.46, 0.45, 0.94] as any,
				delay: 1.2,
			},
		},
	}

	return (
		<section
			id='hero'
			className='relative min-h-screen flex items-center justify-center overflow-hidden'
		>
			{/* Background Image Carousel */}
			<div className='absolute inset-0 z-0'>
				{!loading && imagesLoaded && staticHeroImages.length > 0 && (
					<div className='relative w-full h-full'>
						{staticHeroImages.map((image, index) => (
							<motion.div
								key={image.id}
								className='absolute inset-0 w-full h-full'
								initial={{
									x: index === 0 ? 0 : '100%',
									opacity: index === 0 ? 1 : 0,
								}}
								animate={{
									x:
										index === currentImageIndex
											? 0
											: index < currentImageIndex
											? '-100%'
											: '100%',
									opacity: index === currentImageIndex ? 1 : 0,
								}}
								transition={{
									duration: 0.8,
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
							>
								<img
									src={image.url}
									alt={image.fileName}
									className='w-full h-full object-cover'
								/>
								{/* Dark overlay for text readability */}
								<div className='absolute inset-0 bg-black/50' />
							</motion.div>
						))}
					</div>
				)}

				{/* Fallback background if no images or still loading */}
				{(loading || !imagesLoaded) && (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black' />
				)}
			</div>

			{/* Content */}
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
				<div className='flex items-center justify-center min-h-screen py-20 sm:py-0'>
					{loading || !imagesLoaded ? (
						/* Enhanced Loading State - ARTIFEX GROUP Style */
						<div className='text-center relative'>
							{/* Subtle background effect */}
							<div className='absolute inset-0 overflow-hidden pointer-events-none'>
								<motion.div
									className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 border border-white/5 rounded-full'
									animate={{
										scale: [1, 1.1, 1],
										opacity: [0.3, 0.1, 0.3],
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
							</div>

							{/* Main loading animation */}
							<div className='relative z-10'>
								{/* Minimalistic Loading Animation */}
								<div className='relative mb-6 sm:mb-8'>
									{/* Main rotating element */}
									<motion.div
										className='relative w-16 sm:w-20 h-16 sm:h-20 mx-auto'
										animate={{ rotate: 360 }}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: 'linear',
										}}
									>
										{/* Outer ring */}
										<div className='absolute inset-0 border-2 border-white/15 rounded-full'></div>
										{/* Active segment */}
										<div className='absolute inset-0 border-2 border-transparent border-t-white rounded-full'></div>
									</motion.div>

									{/* Simple center dot */}
									<motion.div
										className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/80 rounded-full'
										animate={{
											scale: [1, 1.3, 1],
											opacity: [0.8, 1, 0.8],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									/>
								</div>

								{/* Brand-styled loading text */}
								<motion.div
									className='space-y-4 sm:space-y-6'
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.5 }}
								>
									<div className='space-y-2'>
										<motion.h2
											className='font-heading font-bold text-2xl sm:text-4xl text-white tracking-[0.2em]'
											animate={{
												textShadow: [
													'0 0 20px rgba(255,255,255,0.3)',
													'0 0 30px rgba(255,255,255,0.5)',
													'0 0 20px rgba(255,255,255,0.3)',
												],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										>
											ARTIFEX
										</motion.h2>
										<motion.h3
											className='font-heading font-light text-lg sm:text-2xl text-white/80 tracking-[0.3em]'
											animate={{ opacity: [0.6, 1, 0.6] }}
											transition={{
												duration: 2.5,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: 0.5,
											}}
										>
											GROUP
										</motion.h3>
									</div>

									<motion.p
										className='text-white/70 text-xs sm:text-sm font-light tracking-widest uppercase'
										animate={{ opacity: [0.5, 1, 0.5] }}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									>
										{loading ? 'LOADING PORTFOLIO' : 'PREPARING EXPERIENCE'}
									</motion.p>

									{/* Elegant progress indicator */}
									<div className='relative w-48 sm:w-64 h-0.5 mx-auto'>
										<div className='absolute inset-0 bg-white/10 rounded-full'></div>
										<motion.div
											className='absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 via-white to-white/40 rounded-full'
											initial={{ width: '0%' }}
											animate={{
												width: ['20%', '80%', '20%'],
												x: ['-10%', '30%', '-10%'],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										/>
									</div>
								</motion.div>
							</div>
						</div>
					) : (
						/* Main Content - only show after loading */
						<motion.div
							className='w-full max-w-4xl text-center px-4'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
						>
							<div className='geometric-accent mb-6 sm:mb-8 relative'>
								<motion.h1
									className='font-heading font-bold text-4xl sm:text-7xl lg:text-9xl text-white leading-[0.85] tracking-tighter relative z-10 drop-shadow-2xl'
									variants={titleVariants}
									initial='hidden'
									animate='visible'
								>
									{'ARTIFEX'.split('').map((letter, index) => (
										<motion.span
											key={index}
											variants={letterVariants}
											className='inline-block'
										>
											{letter}
										</motion.span>
									))}
									<br />
									<span className='text-white/80 font-light'>
										{'GROUP'.split('').map((letter, index) => (
											<motion.span
												key={index + 7}
												variants={letterVariants}
												className='inline-block'
											>
												{letter}
											</motion.span>
										))}
									</span>
								</motion.h1>
							</div>

							{/* Statistics Section */}
							<motion.div
								className='flex items-center justify-center mt-8 sm:mt-12'
								variants={subtitleVariants}
								initial='hidden'
								animate='visible'
							>
								<StatisticsSection />
							</motion.div>
						</motion.div>
					)}
				</div>
			</div>

			{/* Carousel Dots */}
			{!loading && imagesLoaded && staticHeroImages.length > 0 && (
				<motion.div
					className='absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 2 }}
				>
					<div className='flex space-x-2'>
						{staticHeroImages.map((_, index) => (
							<button
								key={index}
								onClick={() => handleDotClick(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentImageIndex
										? 'bg-white scale-125 shadow-md'
										: 'bg-white/40 hover:bg-white/60'
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</motion.div>
			)}
		</section>
	)
}
