import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'ARTIFEX GROUP - Architecture & Design Studio',
		short_name: 'ARTIFEX GROUP',
		description:
			'International architecture and design studio in Tashkent specializing in modern design, master planning, and construction management.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/logo.png',
				sizes: 'any',
				type: 'image/png',
			},
		],
		categories: ['business', 'architecture', 'design'],
		lang: 'en',
		dir: 'ltr',
		orientation: 'portrait-primary',
	}
}
