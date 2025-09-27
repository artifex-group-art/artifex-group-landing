'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Mail, User, MessageCircle, Send } from 'lucide-react'

export function CTASection() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle')

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus('idle')

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setSubmitStatus('success')
				setFormData({ name: '', email: '', message: '' })
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Error sending message:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}
	return (
		<section id='contact' className='py-32 px-6 lg:px-8 bg-card'>
			<div className='max-w-4xl mx-auto'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
				>
					<h1 className='font-heading font-semibold text-5xl lg:text-7xl text-primary mb-6 leading-tight'>
						Get in touch
					</h1>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Have a project in mind? We'd love to hear from you. Send us a
						message and we'll respond as soon as possible.
					</p>
				</motion.div>

				<motion.form
					onSubmit={handleSubmit}
					className='max-w-2xl mx-auto space-y-6'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<motion.div
							className='relative'
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<User className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
							<Input
								type='text'
								name='name'
								placeholder='Your Name'
								value={formData.name}
								onChange={handleInputChange}
								required
								className='pl-10 h-12 bg-white/50 border-muted focus:border-primary transition-colors'
							/>
						</motion.div>

						<motion.div
							className='relative'
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<Mail className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
							<Input
								type='email'
								name='email'
								placeholder='Your Email'
								value={formData.email}
								onChange={handleInputChange}
								required
								className='pl-10 h-12 bg-white/50 border-muted focus:border-primary transition-colors'
							/>
						</motion.div>
					</div>

					<motion.div
						className='relative'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<MessageCircle className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
						<Textarea
							name='message'
							placeholder='Tell us about your project...'
							value={formData.message}
							onChange={handleInputChange}
							required
							rows={6}
							className='pl-10 pt-3 bg-white/50 border-muted focus:border-primary transition-colors resize-none'
						/>
					</motion.div>

					{submitStatus === 'success' && (
						<motion.div
							className='text-green-600 text-center font-medium'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						>
							✓ Message sent successfully! We'll get back to you soon.
						</motion.div>
					)}

					{submitStatus === 'error' && (
						<motion.div
							className='text-red-600 text-center font-medium'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
						>
							✗ Something went wrong. Please try again.
						</motion.div>
					)}

					<motion.div
						className='text-center'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<Button
							type='submit'
							disabled={isSubmitting}
							size='lg'
							className='bg-accent hover:bg-accent/90 text-accent-foreground font-body font-medium text-lg px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:opacity-70'
						>
							{isSubmitting ? (
								<>
									<motion.div
										className='w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2'
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
									/>
									Sending...
								</>
							) : (
								<>
									<Send className='w-5 h-5 mr-2' />
									Send Message
								</>
							)}
						</Button>
					</motion.div>
				</motion.form>
			</div>
		</section>
	)
}
