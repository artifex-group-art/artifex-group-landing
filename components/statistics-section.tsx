'use client'

import { m } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CountUpProps {
	target: number
	suffix?: string
	duration?: number
}

function CountUp({ target, suffix = '', duration = 2 }: CountUpProps) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		let startTime: number
		let animationFrame: number

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime
			const progress = Math.min(
				(currentTime - startTime) / (duration * 1000),
				1
			)

			// Easing function for smooth animation
			const easeOutCubic = 1 - Math.pow(1 - progress, 3)
			setCount(Math.floor(target * easeOutCubic))

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate)
			}
		}

		animationFrame = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animationFrame)
	}, [target, duration])

	return (
		<span className='font-heading font-bold text-5xl lg:text-6xl text-primary'>
			{count}
			{suffix}
		</span>
	)
}

export function StatisticsSection() {
	return (
		<section className='py-20 px-6 lg:px-8 bg-muted/30'>
			<div className='max-w-7xl mx-auto'>
				<m.div
					className='grid grid-cols-1 md:grid-cols-4 gap-12 items-center'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					{/* Years of Experience */}
					<m.div
						className='text-center'
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<CountUp target={15} suffix='+' />
						<p className='font-body text-sm text-muted-foreground uppercase tracking-wider mt-2'>
							Years Experience
						</p>
					</m.div>

					{/* Projects Completed */}
					<m.div
						className='text-center'
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
					>
						<CountUp target={200} suffix='+' />
						<p className='font-body text-sm text-muted-foreground uppercase tracking-wider mt-2'>
							Projects Completed
						</p>
					</m.div>

					{/* Team Members */}
					<m.div
						className='text-center'
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						viewport={{ once: true }}
					>
						<CountUp target={25} suffix='+' />
						<p className='font-body text-sm text-muted-foreground uppercase tracking-wider mt-2'>
							Team Members
						</p>
					</m.div>

					{/* Countries */}
					<m.div
						className='text-center'
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						viewport={{ once: true }}
					>
						<CountUp target={5} />
						<p className='font-body text-sm text-muted-foreground uppercase tracking-wider mt-2'>
							Countries
						</p>
					</m.div>
				</m.div>
			</div>
		</section>
	)
}
