import type React from 'react'
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { SessionProvider } from '@/components/session-provider'
import './globals.css'

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
	title: 'ARTIFEX GROUP - Architecture is about experience, not only visual',
	description:
		'International architectural company focused on modern design, interiors and landscapes. Based in Tashkent.',
	generator: 'v0.app',
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
			<body className='bg-background text-foreground'>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	)
}
