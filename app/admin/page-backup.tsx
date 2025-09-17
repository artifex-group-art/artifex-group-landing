'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'loading') return

		if (!session?.user || session.user.role !== 'ADMIN') {
			router.push('/admin/login')
		} else {
			router.push('/admin/dashboard')
		}
	}, [session, status, router])

	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
			</div>
		)
	}

	return null
}
