'use client'

import { useState } from 'react'
import Image from 'next/image'
import HeroSection from '@/components/hero-section'
import { WhoWeAreSection } from '@/components/who-we-are-section'
import { WhatWeDoSection } from '@/components/what-we-do-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { PartnershipsSection } from '@/components/partnerships-section'
import { LocationSection } from '@/components/location-section'
import { AboutSection } from '@/components/about-section'
import ProjectsSection from '@/components/projects-section'
import NewsSection from '@/components/news-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import BurgerMenu from '@/components/burger-menu'
import Navigation from '@/components/navigation'

export default function Home() {
	const [isNavigationOpen, setIsNavigationOpen] = useState(false)

	const toggleNavigation = () => {
		setIsNavigationOpen(!isNavigationOpen)
	}

	const closeNavigation = () => {
		setIsNavigationOpen(false)
	}

	return (
		<main className='min-h-screen bg-white'>
			{/* Fixed Header */}
			<header className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6'>
				{/* Logo */}
				<div className='flex items-center'>
					<Image
						src='/logo.png'
						alt='Artifex Group Logo'
						width={160}
						height={80}
						className='h-20 w-auto object-contain drop-shadow-lg'
						priority
					/>
				</div>

				{/* Burger Menu */}
				<BurgerMenu isOpen={isNavigationOpen} onClick={toggleNavigation} />
			</header>

			<Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
			<HeroSection />
			<WhoWeAreSection />
			<WhatWeDoSection />
			<PhilosophySection />
			<AboutSection />
			<ProjectsSection />
			<NewsSection />
			<CTASection />
			<LocationSection />
			<Footer />
		</main>
	)
}
