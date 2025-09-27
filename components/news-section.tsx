'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// News ma'lumotini olish uchun interface (Prisma schema ga mos)
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
	published: boolean
	featured: boolean
	author: Author
	images: NewsImage[]
	createdAt: string
	updatedAt: string
}

// Real API dan news larni olish
const getNews = async (): Promise<News[]> => {
	try {
		const response = await fetch('/api/news/published')
		if (!response.ok) {
			throw new Error('Failed to fetch news')
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching news:', error)
		return []
	}
}

export default function NewsSection() {
	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const loadNews = async () => {
			try {
				setError(null)
				const newsData = await getNews()
				setNews(newsData)
			} catch (error) {
				console.error('Error loading news:', error)
				setError('Yangiliklar yuklashda xatolik yuz berdi')
			} finally {
				setLoading(false)
			}
		}

		loadNews()
	}, [])

	const handleNewsClick = (slug: string) => {
		router.push(`/news/${slug}`)
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
			<section id='news' className='py-16 bg-gray-50'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Latest News
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Stay updated with our latest projects, insights, and industry news
						</p>
					</div>
				</div>

				{/* Loading Grid */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, i) => (
							<Card key={i} className='overflow-hidden'>
								<div className='aspect-[16/10] bg-gray-200 animate-pulse' />
								<CardContent className='p-6'>
									<div className='h-4 bg-gray-200 animate-pulse rounded mb-2' />
									<div className='h-6 bg-gray-200 animate-pulse rounded mb-4' />
									<div className='h-4 bg-gray-200 animate-pulse rounded w-3/4' />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section id='news' className='py-16 bg-gray-50'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Latest News
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Stay updated with our latest projects, insights, and industry news
						</p>
					</div>
				</div>

				{/* Error Message */}
				<div className='flex items-center justify-center h-64'>
					<p className='text-red-500 text-center font-medium'>{error}</p>
				</div>
			</section>
		)
	}

	if (news.length === 0) {
		return (
			<section id='news' className='py-16 bg-gray-50'>
				{/* Section Header */}
				<div className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'>
					<div className='text-center'>
						<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
							Latest News
						</h2>
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
							Stay updated with our latest projects, insights, and industry news
						</p>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center h-64'>
					<p className='text-gray-500 text-center font-medium'>
						No news articles found at the moment
					</p>
				</div>
			</section>
		)
	}

	return (
		<section id='news' className='py-16 bg-gray-50'>
			{/* Section Header */}
			<motion.div
				className='max-w-7xl mx-auto px-6 lg:px-8 mb-12'
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
			>
				<div className='text-center'>
					<h2 className='font-heading font-semibold text-4xl lg:text-6xl text-primary mb-4 leading-tight'>
						Latest News
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Stay updated with our latest projects, insights, and industry news
					</p>
				</div>
			</motion.div>

			{/* News Grid */}
			<motion.div
				className='max-w-7xl mx-auto px-6 lg:px-8'
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
			>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{news.map((article, index) => {
						// Birinchi rasmni olish (images array dan yoki imageUrl dan)
						const firstImage =
							article.images[0]?.url || article.imageUrl || '/placeholder.jpg'

						return (
							<motion.div
								key={article.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card
									className='overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300'
									onClick={() => handleNewsClick(article.slug)}
								>
									{/* Image */}
									<div className='aspect-[16/10] overflow-hidden'>
										<img
											src={firstImage}
											alt={article.title}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
										/>
									</div>

									{/* Content */}
									<CardContent className='p-6'>
										{/* Meta info */}
										<div className='flex items-center justify-between mb-3'>
											<div className='flex items-center space-x-2'>
												{article.featured && (
													<Badge variant='default' className='text-xs'>
														Featured
													</Badge>
												)}
												<span className='text-xs text-muted-foreground'>
													{formatDate(article.createdAt)}
												</span>
											</div>
											<span className='text-xs text-muted-foreground'>
												{article.author.name}
											</span>
										</div>

										{/* Title */}
										<h3 className='font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors'>
											{article.title}
										</h3>

										{/* Description */}
										<p className='text-muted-foreground text-sm line-clamp-3'>
											{article.description}
										</p>

										{/* Read more */}
										<div className='mt-4 pt-4 border-t border-border'>
											<span className='text-primary text-sm font-medium group-hover:underline'>
												Read more →
											</span>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						)
					})}
				</div>
			</motion.div>
		</section>
	)
}
