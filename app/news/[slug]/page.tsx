'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { m } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface NewsImage {
	id: string
	url: string
	fileName: string
	caption?: string
	order: number
}

interface Author {
	id: string
	name: string
	email: string
}

interface News {
	id: string
	title: string
	description: string
	content?: string
	imageUrl?: string
	slug: string
	featured: boolean
	published: boolean
	author: Author
	images: NewsImage[]
	createdAt: string
	updatedAt: string
}

export default function NewsDetailPage() {
	const params = useParams()
	const router = useRouter()
	const [news, setNews] = useState<News | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		if (params?.slug) {
			fetchNews(params.slug as string)
		}
	}, [params?.slug])

	const fetchNews = async (slug: string) => {
		try {
			const response = await fetch('/api/news/published')
			if (response.ok) {
				const newsArray = await response.json()
				const foundNews = newsArray.find((n: News) => n.slug === slug)

				if (foundNews) {
					const detailResponse = await fetch(`/api/news/${foundNews.id}`)
					if (detailResponse.ok) {
						const newsDetail = await detailResponse.json()
						setNews(newsDetail)
					} else {
						setError('News article not found')
					}
				} else {
					setError('News article not found')
				}
			} else {
				setError('Failed to fetch news')
			}
		} catch (error) {
			console.error('Error fetching news:', error)
			setError('Failed to fetch news')
		} finally {
			setLoading(false)
		}
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
			</div>
		)
	}

	if (error || !news) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl mb-4'>News article not found</h1>
					<Button onClick={() => router.push('/')} variant='outline'>
						← Back
					</Button>
				</div>
			</div>
		)
	}

	const heroImage = news.images[0]?.url || news.imageUrl || '/placeholder.jpg'
	const additionalImages = news.images.slice(1) || []

	return (
		<div className='min-h-screen bg-white text-black'>
			{/* Floating Header */}
			<header className='fixed top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-50'>
				<div className='flex items-center justify-between backdrop-blur-md bg-black/5 border border-black/10 rounded-full px-4 md:px-6 py-2 md:py-3'>
					<Button
						onClick={() => router.back()}
						variant='ghost'
						size='sm'
						className='text-black hover:bg-black/10 rounded-full text-sm md:text-base'
					>
						<ArrowLeft className='w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2' />
						Back
					</Button>
				</div>
			</header>

			{/* Hero Section */}
			<section className='relative pt-24 pb-12'>
				{/* Hero Image */}
				<m.div
					className='relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden'
					initial={{ opacity: 0, scale: 1.1 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.2 }}
				>
					<img
						src={heroImage}
						alt={news.title}
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
				</m.div>

				{/* Article Header Overlay */}
				<m.div
					className='absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
				>
					<div className='max-w-4xl'>
						{/* Meta Info */}
						<div className='flex flex-wrap items-center gap-4 mb-6'>
							{news.featured && (
								<Badge className='bg-white/20 backdrop-blur-sm text-white border-white/30'>
									Featured
								</Badge>
							)}
							<div className='flex items-center text-white/80 text-sm'>
								<Calendar className='w-4 h-4 mr-2' />
								{formatDate(news.createdAt)}
							</div>
							<div className='flex items-center text-white/80 text-sm'>
								<User className='w-4 h-4 mr-2' />
								{news.author.name}
							</div>
						</div>

						{/* Title */}
						<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>
							{news.title}
						</h1>

						{/* Description */}
						<p className='text-white/90 text-lg md:text-xl max-w-3xl leading-relaxed mb-8'>
							{news.description}
						</p>
					</div>
				</m.div>
			</section>

			{/* Article Content */}
			<section className='py-12 md:py-16 lg:py-20'>
				<div className='max-w-4xl mx-auto px-6 md:px-8 lg:px-12'>
					{news.content && (
						<m.div
							className='prose prose-xl md:prose-2xl max-w-none 
								prose-headings:text-black 
								prose-p:text-black/80 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg md:prose-p:text-xl
								prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
								prose-strong:text-black prose-strong:font-semibold
								prose-em:text-black/90 prose-em:italic
								prose-h1:text-5xl md:prose-h1:text-6xl lg:prose-h1:text-7xl prose-h1:font-bold prose-h1:mb-10 prose-h1:mt-16 prose-h1:leading-tight
								prose-h2:text-4xl md:prose-h2:text-5xl lg:prose-h2:text-6xl prose-h2:font-semibold prose-h2:mb-8 prose-h2:mt-12 prose-h2:leading-tight
								prose-ul:list-disc prose-ul:mb-8 prose-ul:space-y-3 prose-ul:text-lg md:prose-ul:text-xl
								prose-ol:list-decimal prose-ol:mb-8 prose-ol:space-y-3 prose-ol:text-lg md:prose-ol:text-xl
								prose-li:text-black/80 prose-li:leading-relaxed
								prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:italic prose-blockquote:text-black/70 prose-blockquote:mb-8 prose-blockquote:text-lg md:prose-blockquote:text-xl'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							dangerouslySetInnerHTML={{
								__html: news.content,
							}}
						/>
					)}
				</div>
			</section>

			{/* Additional Images Gallery */}
			{additionalImages.length > 0 && (
				<section className='py-12 md:py-16 lg:py-20 bg-gray-50'>
					<div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12'>
						{/* Section Title */}
						<m.div
							className='text-center mb-12'
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4'>
								Gallery
							</h2>
							<p className='text-black/60 text-lg max-w-2xl mx-auto'>
								Additional images and details from this news story
							</p>
						</m.div>

						{/* Images Grid */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{additionalImages.map((image, index) => (
								<m.div
									key={image.id}
									className='group'
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
								>
									<div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5'>
										<img
											src={image.url}
											alt={image.caption || `Image ${index + 1}`}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>
									{image.caption && (
										<p className='mt-4 text-black/60 text-sm'>
											{image.caption}
										</p>
									)}
								</m.div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Related Articles CTA */}
			<m.section
				className='py-12 md:py-16 lg:py-20'
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				<div className='max-w-4xl mx-auto text-center px-6 md:px-8 lg:px-12'>
					<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6'>
						Stay Updated
					</h2>
					<p className='text-black/70 text-lg mb-8 max-w-2xl mx-auto'>
						Don't miss out on our latest news, insights, and project updates
						from the world of architecture and design.
					</p>
					<m.div
						className='flex flex-col sm:flex-row gap-4 justify-center'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<Button
							onClick={() => router.push('/#news')}
							className='bg-black text-white hover:bg-black/80'
						>
							View All News
						</Button>
						<Button
							onClick={() => router.push('/#contact')}
							variant='outline'
							className='border-black/20 text-black hover:bg-black/5'
						>
							Contact Us
						</Button>
					</m.div>
				</div>
			</m.section>
		</div>
	)
}
