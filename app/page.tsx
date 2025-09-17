'use client'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { PartnersSection } from '@/components/partners-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
	return (
		<main className='min-h-screen bg-background'>
			<HeroSection />
			<AboutSection />
			<ProjectsSection />
			<PartnersSection />
			<CTASection />
			<Footer />
		</main>
	)
}
