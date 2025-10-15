import type React from 'react'
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { SessionProvider } from '@/components/session-provider'

import './globals.css'

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
})

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['300', '400', '500', '600'],
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://artifex.uz'),
	title: {
		default:
			'ARTIFEX GROUP - International Architecture & Design Studio in Tashkent',
		template: '%s | ARTIFEX GROUP',
	},
	description:
		'Leading architecture and design studio in Tashkent, Uzbekistan. We specialize in master planning, architectural design, BIM-based design, façade engineering, 3D visualization, and construction management. 15+ years of experience, 100+ completed projects.',
	keywords: [
		'architecture Tashkent',
		'architectural design Uzbekistan',
		'master planning',
		'urban design',
		'BIM design',
		'façade engineering',
		'construction management',
		'3D visualization',
		'interior design',
		'landscape architecture',
		'ARTIFEX GROUP',
		'Tashkent architecture studio',
		'modern architecture',
		'sustainable design',
		'Alutech partner',
		'residential design',
		'commercial architecture',
	],
	authors: [{ name: 'ARTIFEX GROUP' }],
	creator: 'ARTIFEX GROUP',
	publisher: 'ARTIFEX GROUP',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://artifex.uz',
		siteName: 'ARTIFEX GROUP',
		title: 'ARTIFEX GROUP - Architecture & Design Studio in Tashkent',
		description:
			'International architecture studio in Tashkent specializing in modern design, master planning, and construction management. 15+ years experience, 100+ projects.',
		images: [
			{
				url: '/logo.png',
				width: 512,
				height: 512,
				alt: 'ARTIFEX GROUP Logo',
			},
			{
				url: '/001.jpg',
				width: 1200,
				height: 630,
				alt: 'ARTIFEX GROUP - Architecture Studio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ARTIFEX GROUP - Architecture & Design Studio',
		description:
			'Leading architecture studio in Tashkent. Master planning, BIM design, façade engineering & construction management.',
		images: ['/logo.png', '/001.jpg'],
		creator: '@artifexgroup',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		// Add your verification codes here when available
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
	},
	alternates: {
		canonical: 'https://artifex.uz',
	},
	category: 'Architecture and Design',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/logo.png', type: 'image/png', sizes: '512x512' },
		],
		apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
		shortcut: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className={`${montserrat.variable} ${inter.variable} antialiased`}
		>
			<head>
				<meta name='theme-color' content='#000000' />
				<meta name='msapplication-TileColor' content='#000000' />
				<meta name='msapplication-TileImage' content='/logo.png' />
			</head>
			<body className='bg-background text-foreground'>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	)
}
