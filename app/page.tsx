'use client'

import { useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'
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

// Structured Data for SEO
const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'ArchitecturalService',
	name: 'ARTIFEX GROUP',
	image: 'https://artifex.uz/logo.png',
	'@id': 'https://artifex.uz',
	url: 'https://artifex.uz',
	telephone: '+998901234567',
	email: 'info@artifexgroup.uz',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Al Aridh, DMAE6942، 6942 ابراهيم بن موسى الفراء، 4718',
		addressLocality: 'Madinah',
		postalCode: '42314',
		addressCountry: 'SA',
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 24.4539,
		longitude: 39.6123,
	},
	sameAs: [
		'https://www.linkedin.com/in/rustam-khaytmetov-5638a179',
		'https://www.instagram.com/artifexgroup.ksa',
	],
	description:
		'International architecture and design studio specializing in master planning, architectural design, BIM-based design, façade engineering, 3D visualization, and construction management.',
	priceRange: '$$$',
	foundingDate: '2010',
	slogan: 'Architecture is about experience, not only visual',
	serviceArea: {
		'@type': 'GeoCircle',
		geoMidpoint: {
			'@type': 'GeoCoordinates',
			latitude: 24.4539,
			longitude: 39.6123,
		},
		geoRadius: '10000',
	},
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Architecture and Design Services',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Master Planning & Urban Design',
					description: 'Strategic planning for sustainable urban development',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Architectural Design',
					description: 'Residential, commercial, and institutional projects',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Façade Engineering',
					description: 'Custom system development and engineering',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'BIM-Based Design',
					description: 'Digital coordination and advanced modeling',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: '3D Visualization',
					description: 'Animation and concept modeling',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Construction Management',
					description: 'Complete project organization and oversight',
				},
			},
		],
	},
	aggregateRating: {
		'@type': 'AggregateRating',
		ratingValue: '4.9',
		reviewCount: '50',
	},
}

export default function Home() {
	const [isNavigationOpen, setIsNavigationOpen] = useState(false)

	const toggleNavigation = () => {
		setIsNavigationOpen(!isNavigationOpen)
	}

	const closeNavigation = () => {
		setIsNavigationOpen(false)
	}

	return (
		<>
			{/* JSON-LD Structured Data */}
			<Script
				id='structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<main className='min-h-screen bg-white'>
				{/* Fixed Header */}
				<header
					className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6'
					role='banner'
				>
					{/* Logo */}
					<div className='flex items-center'>
						<Image
							src='/logo.png'
							alt='Artifex Group Logo - International Architecture Studio in Tashkent'
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

				{/* Skip to main content for accessibility */}
				<a
					href='#hero'
					className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white'
				>
					Skip to main content
				</a>

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
		</>
	)
}
