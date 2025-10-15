'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

interface SessionProviderProps {
	children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
	return (
		<LazyMotion features={domAnimation}>
			<NextAuthSessionProvider>{children}</NextAuthSessionProvider>
		</LazyMotion>
	)
}
