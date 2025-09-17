'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const { data: session, status } = useSession()

	// Redirect if already authenticated
	useEffect(() => {
		if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
			router.push('/admin')
		}
	}, [session, status, router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			})

			if (result?.error) {
				setError('Invalid credentials')
			} else if (result?.ok) {
				// Success - redirect will happen via useEffect
				window.location.href = '/admin'
			}
		} catch (error) {
			setError('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	// Show loading while checking session
	if (status === 'loading') {
		return (
			<div className='min-h-screen flex items-center justify-center bg-background'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
			</div>
		)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center space-y-4'>
					<div className='mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center'>
						<Lock className='w-8 h-8 text-primary-foreground' />
					</div>
					<CardTitle className='text-2xl font-bold'>Admin Login</CardTitle>
					<p className='text-sm text-muted-foreground'>
						Enter your credentials to access the admin panel
					</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<div className='relative'>
								<Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
								<Input
									id='email'
									type='email'
									placeholder='admin@artifex.com'
									value={email}
									onChange={e => setEmail(e.target.value)}
									className='pl-10'
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
								<Input
									id='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter your password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									className='pl-10 pr-10'
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-3 text-muted-foreground hover:text-foreground'
								>
									{showPassword ? (
										<EyeOff className='h-4 w-4' />
									) : (
										<Eye className='h-4 w-4' />
									)}
								</button>
							</div>
						</div>
						{error && (
							<div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
								{error}
							</div>
						)}
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? 'Signing in...' : 'Sign In'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
