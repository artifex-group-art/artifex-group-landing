'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ImageUpload, UploadedImage } from '@/components/image-upload'
import WhoWeAreImageUpload from '@/components/admin/who-we-are-image-upload'
import {
	Plus,
	Edit,
	Trash2,
	LogOut,
	Settings,
	FolderOpen,
	Eye,
	Tag,
	FileText,
	Images,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Project {
	id: string
	title: string
	description: string
	imageUrl?: string
	published: boolean
	featured: boolean
	category?: {
		id: string
		name: string
		slug: string
	}
	images: Array<{
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}>
	createdAt: string
}

interface Category {
	id: string
	name: string
	description?: string
	slug: string
	_count: {
		projects: number
	}
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
	author: {
		id: string
		name: string
		email: string
	}
	images: Array<{
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}>
	createdAt: string
}

interface WhoWeAreImage {
	id: string
	url: string
	fileName: string
	order: number
	active: boolean
	createdAt: string
}

export default function AdminDashboard() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [projects, setProjects] = useState<Project[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [news, setNews] = useState<News[]>([])
	const [whoWeAreImages, setWhoWeAreImages] = useState<WhoWeAreImage[]>([])
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState('projects')
	const [showProjectDialog, setShowProjectDialog] = useState(false)
	const [showCategoryDialog, setShowCategoryDialog] = useState(false)
	const [showNewsDialog, setShowNewsDialog] = useState(false)
	const [editingProject, setEditingProject] = useState<Project | null>(null)
	const [editingNews, setEditingNews] = useState<News | null>(null)
	const [projectFormData, setProjectFormData] = useState({
		title: '',
		description: '',
		categoryId: '',
		published: false,
		featured: false,
	})
	const [projectImages, setProjectImages] = useState<UploadedImage[]>([])
	const [newsFormData, setNewsFormData] = useState({
		title: '',
		description: '',
		content: '',
		published: false,
		featured: false,
	})
	const [newsImages, setNewsImages] = useState<UploadedImage[]>([])
	const [categoryFormData, setCategoryFormData] = useState({
		name: '',
		description: '',
	})

	useEffect(() => {
		if (status === 'loading') return
		if (!session?.user || session.user.role !== 'ADMIN') {
			router.push('/admin/login')
		} else {
			fetchData()
		}
	}, [session, status, router])

	const fetchData = async () => {
		console.log('Starting fetchData...')
		setLoading(true)
		try {
			console.log('Fetching data from APIs...')
			const [projectsRes, categoriesRes, newsRes, whoWeAreImagesRes] =
				await Promise.all([
					fetch('/api/projects'),
					fetch('/api/categories'),
					fetch('/api/news?all=true'),
					fetch('/api/who-we-are-images?all=true'),
				])

			console.log('API responses:', {
				projects: projectsRes.status,
				categories: categoriesRes.status,
				news: newsRes.status,
				whoWeAreImages: whoWeAreImagesRes.status,
			})

			if (projectsRes.ok) {
				const projectsData = await projectsRes.json()
				console.log('Projects data:', projectsData)
				setProjects(projectsData)
			} else {
				console.error('Projects API failed:', projectsRes.status)
			}

			if (categoriesRes.ok) {
				const categoriesData = await categoriesRes.json()
				console.log('Categories data:', categoriesData)
				setCategories(categoriesData)
			} else {
				console.error('Categories API failed:', categoriesRes.status)
			}

			if (newsRes.ok) {
				const newsData = await newsRes.json()
				console.log('News data:', newsData)
				setNews(newsData)
			} else {
				console.error('News API failed:', newsRes.status)
			}

			if (whoWeAreImagesRes.ok) {
				const whoWeAreImagesData = await whoWeAreImagesRes.json()
				console.log('Who We Are Images data:', whoWeAreImagesData)
				setWhoWeAreImages(whoWeAreImagesData)
			} else {
				console.error('Who We Are Images API failed:', whoWeAreImagesRes.status)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			console.log('Setting loading to false')
			setLoading(false)
		}
	}

	const handleProjectSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const method = editingProject ? 'PUT' : 'POST'
		const url = editingProject
			? `/api/projects/${editingProject.id}`
			: '/api/projects'

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...projectFormData,
					images: projectImages,
				}),
			})

			if (response.ok) {
				setShowProjectDialog(false)
				setEditingProject(null)
				resetProjectForm()
				fetchData()
			}
		} catch (error) {
			console.error('Error saving project:', error)
		}
	}

	const handleCategorySubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const response = await fetch('/api/categories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(categoryFormData),
			})

			if (response.ok) {
				setShowCategoryDialog(false)
				setCategoryFormData({ name: '', description: '' })
				fetchData()
			}
		} catch (error) {
			console.error('Error saving category:', error)
		}
	}

	const handleNewsSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const method = editingNews ? 'PUT' : 'POST'
		const url = editingNews ? `/api/news/${editingNews.id}` : '/api/news'

		try {
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...newsFormData,
					images: newsImages,
				}),
			})

			if (response.ok) {
				setShowNewsDialog(false)
				setEditingNews(null)
				resetNewsForm()
				fetchData()
			}
		} catch (error) {
			console.error('Error saving news:', error)
		}
	}

	const handleDeleteProject = async (id: string) => {
		if (!confirm('Are you sure you want to delete this project?')) return

		try {
			const response = await fetch(`/api/projects/${id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				fetchData()
			}
		} catch (error) {
			console.error('Error deleting project:', error)
		}
	}

	const handleDeleteWhoWeAreImage = async (id: string) => {
		if (!confirm('Are you sure you want to delete this image?')) return

		try {
			const response = await fetch(`/api/who-we-are-images/${id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				fetchData()
			}
		} catch (error) {
			console.error('Error deleting who we are image:', error)
		}
	}

	const handleWhoWeAreImageUploadSuccess = (image: WhoWeAreImage) => {
		console.log('Image uploaded successfully:', image)
		fetchData()
	}

	const handleWhoWeAreImageUploadError = (error: string) => {
		console.error('Image upload error:', error)
		alert(`Upload failed: ${error}`)
	}

	const openEditProjectDialog = (project: Project) => {
		setEditingProject(project)
		setProjectFormData({
			title: project.title,
			description: project.description,
			categoryId: project.category?.id || '',
			published: project.published,
			featured: project.featured,
		})
		setProjectImages(
			project.images.map(img => ({
				url: img.url,
				fileName: img.fileName,
				fileSize: 0,
				mimeType: '',
				caption: img.caption,
			}))
		)
		setShowProjectDialog(true)
	}

	const resetProjectForm = () => {
		setProjectFormData({
			title: '',
			description: '',
			categoryId: '',
			published: false,
			featured: false,
		})
		setProjectImages([])
	}

	const openCreateProjectDialog = () => {
		setEditingProject(null)
		resetProjectForm()
		setShowProjectDialog(true)
	}

	// News functions
	const handleDeleteNews = async (id: string) => {
		if (!confirm('Are you sure you want to delete this news article?')) return

		try {
			const response = await fetch(`/api/news/${id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				fetchData()
			}
		} catch (error) {
			console.error('Error deleting news:', error)
		}
	}

	const openEditNewsDialog = (newsItem: News) => {
		setEditingNews(newsItem)
		setNewsFormData({
			title: newsItem.title,
			description: newsItem.description,
			content: newsItem.content || '',
			published: newsItem.published,
			featured: newsItem.featured,
		})
		setNewsImages(
			newsItem.images.map(img => ({
				url: img.url,
				fileName: img.fileName,
				fileSize: 0,
				mimeType: '',
				caption: img.caption,
			}))
		)
		setShowNewsDialog(true)
	}

	const toggleNewsPublished = async (newsItem: News) => {
		try {
			const response = await fetch(`/api/news/${newsItem.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					published: !newsItem.published,
				}),
			})

			if (response.ok) {
				fetchData()
			}
		} catch (error) {
			console.error('Error toggling news published status:', error)
		}
	}

	const resetNewsForm = () => {
		setNewsFormData({
			title: '',
			description: '',
			content: '',
			published: false,
			featured: false,
		})
		setNewsImages([])
	}

	const openCreateNewsDialog = () => {
		setEditingNews(null)
		resetNewsForm()
		setShowNewsDialog(true)
	}

	const deleteNews = handleDeleteNews

	if (status === 'loading' || loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
			</div>
		)
	}

	if (!session?.user || session.user.role !== 'ADMIN') {
		return null
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='bg-card border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center py-6'>
						<div className='flex items-center space-x-4'>
							<div className='bg-primary rounded-lg p-2'>
								<Settings className='h-6 w-6 text-primary-foreground' />
							</div>
							<div>
								<h1 className='text-2xl font-bold text-foreground'>
									Admin Dashboard
								</h1>
								<p className='text-sm text-muted-foreground'>
									Welcome back, {session.user.name || session.user.email}
								</p>
							</div>
						</div>
						<Button
							onClick={() => signOut()}
							variant='outline'
							className='flex items-center space-x-2'
						>
							<LogOut className='h-4 w-4' />
							<span>Sign Out</span>
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Stats */}
				<div className='grid grid-cols-1 md:grid-cols-5 gap-6 mb-8'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
					>
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-blue-100 dark:bg-blue-900 p-3 rounded-lg'>
										<FolderOpen className='h-6 w-6 text-blue-600 dark:text-blue-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											Total Projects
										</p>
										<p className='text-2xl font-bold'>{projects.length}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-green-100 dark:bg-green-900 p-3 rounded-lg'>
										<Eye className='h-6 w-6 text-green-600 dark:text-green-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											Published
										</p>
										<p className='text-2xl font-bold'>
											{projects.filter(p => p.published).length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg'>
										<Settings className='h-6 w-6 text-yellow-600 dark:text-yellow-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											Drafts
										</p>
										<p className='text-2xl font-bold'>
											{projects.filter(p => !p.published).length}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-purple-100 dark:bg-purple-900 p-3 rounded-lg'>
										<FileText className='h-6 w-6 text-purple-600 dark:text-purple-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											Total News
										</p>
										<p className='text-2xl font-bold'>{news.length}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
					>
						<Card>
							<CardContent className='p-6'>
								<div className='flex items-center space-x-4'>
									<div className='bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg'>
										<Tag className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-muted-foreground'>
											Categories
										</p>
										<p className='text-2xl font-bold'>{categories.length}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Custom Tabs */}
				<div className='space-y-6'>
					{/* Tab Buttons - SIMPLIFIED */}
					<div className='bg-gray-100 p-6 rounded-lg'>
						<h2 className='text-lg font-bold mb-4'>Navigation Tabs</h2>
						<div className='flex flex-col sm:flex-row gap-4'>
							<button
								onClick={() => setActiveTab('projects')}
								className={`px-6 py-4 rounded-lg font-bold text-lg ${
									activeTab === 'projects'
										? 'bg-green-600 text-white'
										: 'bg-white text-gray-800 border-2 border-gray-300'
								}`}
							>
								📁 PROJECTS
							</button>
							<button
								onClick={() => setActiveTab('categories')}
								className={`px-6 py-4 rounded-lg font-bold text-lg ${
									activeTab === 'categories'
										? 'bg-green-600 text-white'
										: 'bg-white text-gray-800 border-2 border-gray-300'
								}`}
							>
								🏷️ CATEGORIES
							</button>
							<button
								onClick={() => setActiveTab('news')}
								className={`px-6 py-4 rounded-lg font-bold text-lg ${
									activeTab === 'news'
										? 'bg-green-600 text-white'
										: 'bg-white text-gray-800 border-2 border-gray-300'
								}`}
							>
								📰 NEWS
							</button>
							<button
								onClick={() => setActiveTab('who-we-are')}
								className={`px-6 py-4 rounded-lg font-bold text-lg ${
									activeTab === 'who-we-are'
										? 'bg-red-600 text-white'
										: 'bg-yellow-400 text-black border-4 border-red-600'
								}`}
							>
								👥 WHO WE ARE
							</button>
						</div>
					</div>

					{/* Projects Tab */}
					{activeTab === 'projects' && (
						<Card>
							<CardHeader>
								<div className='flex justify-between items-center'>
									<CardTitle>Projects</CardTitle>
									<Button
										onClick={openCreateProjectDialog}
										className='flex items-center space-x-2'
									>
										<Plus className='h-4 w-4' />
										<span>Add Project</span>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{projects.length === 0 ? (
									<div className='text-center py-8'>
										<FolderOpen className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
										<p className='text-muted-foreground'>No projects yet</p>
									</div>
								) : (
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Project</TableHead>
												<TableHead>Category</TableHead>
												<TableHead>Images</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Featured</TableHead>
												<TableHead>Created</TableHead>
												<TableHead>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{projects.map(project => (
												<TableRow key={project.id}>
													<TableCell>
														<div className='flex items-center space-x-3'>
															<img
																src={
																	project.images?.[0]?.url ||
																	project.imageUrl ||
																	'/placeholder.svg'
																}
																alt={project.title}
																className='w-10 h-10 rounded object-cover'
															/>
															<div>
																<p className='font-medium'>{project.title}</p>
																<p className='text-sm text-muted-foreground truncate max-w-xs'>
																	{project.description}
																</p>
															</div>
														</div>
													</TableCell>
													<TableCell>
														{project.category ? (
															<Badge variant='outline'>
																{project.category.name}
															</Badge>
														) : (
															<span className='text-muted-foreground text-sm'>
																No category
															</span>
														)}
													</TableCell>
													<TableCell>
														<div className='flex items-center space-x-1'>
															<FolderOpen className='h-4 w-4 text-muted-foreground' />
															<span className='text-sm'>
																{project.images?.length || 0}
															</span>
														</div>
													</TableCell>
													<TableCell>
														<Badge
															variant={
																project.published ? 'default' : 'secondary'
															}
														>
															{project.published ? 'Published' : 'Draft'}
														</Badge>
													</TableCell>
													<TableCell>
														{project.featured && (
															<Badge variant='outline'>Featured</Badge>
														)}
													</TableCell>
													<TableCell>
														{new Date(project.createdAt).toLocaleDateString()}
													</TableCell>
													<TableCell>
														<div className='flex items-center space-x-2'>
															<Button
																variant='ghost'
																size='sm'
																onClick={() => openEditProjectDialog(project)}
															>
																<Edit className='h-4 w-4' />
															</Button>
															<Button
																variant='ghost'
																size='sm'
																onClick={() => handleDeleteProject(project.id)}
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}
							</CardContent>
						</Card>
					)}

					{/* Categories Tab */}
					{activeTab === 'categories' && (
						<Card>
							<CardHeader>
								<div className='flex justify-between items-center'>
									<CardTitle>Categories</CardTitle>
									<Button
										onClick={() => setShowCategoryDialog(true)}
										className='flex items-center space-x-2'
									>
										<Plus className='h-4 w-4' />
										<span>Add Category</span>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{categories.length === 0 ? (
									<div className='text-center py-8'>
										<Tag className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
										<p className='text-muted-foreground'>No categories yet</p>
									</div>
								) : (
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
										{categories.map(category => (
											<Card key={category.id}>
												<CardContent className='p-4'>
													<div className='space-y-2'>
														<h3 className='font-semibold'>{category.name}</h3>
														{category.description && (
															<p className='text-sm text-muted-foreground'>
																{category.description}
															</p>
														)}
														<div className='flex items-center justify-between'>
															<Badge variant='secondary'>
																{category._count.projects} projects
															</Badge>
															<Button variant='ghost' size='sm'>
																<Edit className='h-4 w-4' />
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* News Tab */}
					{activeTab === 'news' && (
						<Card>
							<CardHeader>
								<div className='flex justify-between items-center'>
									<CardTitle>News</CardTitle>
									<Button
										onClick={openCreateNewsDialog}
										className='flex items-center space-x-2'
									>
										<Plus className='h-4 w-4' />
										<span>Add News</span>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{news.length === 0 ? (
									<div className='text-center py-8'>
										<FileText className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
										<p className='text-muted-foreground'>
											No news articles yet
										</p>
									</div>
								) : (
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Title</TableHead>
												<TableHead>Author</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Featured</TableHead>
												<TableHead>Created</TableHead>
												<TableHead>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{news.map(newsItem => (
												<TableRow key={newsItem.id}>
													<TableCell className='font-medium'>
														{newsItem.title}
													</TableCell>
													<TableCell>{newsItem.author.name}</TableCell>
													<TableCell>
														<Badge
															variant={
																newsItem.published ? 'default' : 'secondary'
															}
														>
															{newsItem.published ? 'Published' : 'Draft'}
														</Badge>
													</TableCell>
													<TableCell>
														<Badge
															variant={
																newsItem.featured ? 'default' : 'outline'
															}
														>
															{newsItem.featured ? 'Featured' : 'Regular'}
														</Badge>
													</TableCell>
													<TableCell>
														{new Date(newsItem.createdAt).toLocaleDateString()}
													</TableCell>
													<TableCell>
														<div className='flex space-x-2'>
															<Button
																variant='ghost'
																size='sm'
																onClick={() => openEditNewsDialog(newsItem)}
															>
																<Edit className='h-4 w-4' />
															</Button>
															<Button
																variant='ghost'
																size='sm'
																onClick={() => toggleNewsPublished(newsItem)}
															>
																<Eye className='h-4 w-4' />
															</Button>
															<Button
																variant='ghost'
																size='sm'
																onClick={() => deleteNews(newsItem.id)}
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}
							</CardContent>
						</Card>
					)}

					{/* Who We Are Images Tab */}
					{activeTab === 'who-we-are' && (
						<Card>
							<CardHeader>
								<div className='flex justify-between items-center'>
									<CardTitle>Who We Are Images</CardTitle>
									<p className='text-sm text-muted-foreground'>
										Manage images for the Who We Are section
									</p>
								</div>
							</CardHeader>
							<CardContent className='space-y-6'>
								{/* Upload Component */}
								<div>
									<h3 className='text-lg font-semibold mb-4'>
										Upload New Image
									</h3>
									<WhoWeAreImageUpload
										onUploadSuccess={handleWhoWeAreImageUploadSuccess}
										onUploadError={handleWhoWeAreImageUploadError}
									/>
								</div>

								{/* Images Grid */}
								<div>
									<h3 className='text-lg font-semibold mb-4'>
										Current Images ({whoWeAreImages.length})
									</h3>
									{whoWeAreImages.length === 0 ? (
										<p className='text-muted-foreground text-center py-8'>
											No images uploaded yet. Upload your first image above.
										</p>
									) : (
										<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
											{whoWeAreImages.map(image => (
												<motion.div
													key={image.id}
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													className='relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm'
												>
													<img
														src={image.url}
														alt={image.fileName}
														className='w-full h-full object-cover'
													/>
													<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center'>
														<Button
															variant='destructive'
															size='sm'
															onClick={() =>
																handleDeleteWhoWeAreImage(image.id)
															}
															className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'
														>
															<Trash2 className='h-4 w-4 mr-2' />
															Delete
														</Button>
													</div>
													<div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2'>
														<p className='truncate'>{image.fileName}</p>
														<p className='text-gray-300'>
															Order: {image.order}
														</p>
													</div>
												</motion.div>
											))}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</main>

			{/* Project Dialog */}
			<Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
				<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>
							{editingProject ? 'Edit Project' : 'Create New Project'}
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleProjectSubmit} className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='title'>Title</Label>
								<Input
									id='title'
									value={projectFormData.title}
									onChange={e =>
										setProjectFormData({
											...projectFormData,
											title: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='category'>Category</Label>
								<Select
									value={projectFormData.categoryId}
									onValueChange={value =>
										setProjectFormData({
											...projectFormData,
											categoryId: value,
										})
									}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select category' />
									</SelectTrigger>
									<SelectContent>
										{categories.map(category => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								value={projectFormData.description}
								onChange={e =>
									setProjectFormData({
										...projectFormData,
										description: e.target.value,
									})
								}
								rows={4}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label>Images</Label>
							<ImageUpload
								images={projectImages}
								onChange={setProjectImages}
								maxImages={20}
							/>
						</div>

						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<Switch
									id='published'
									checked={projectFormData.published}
									onCheckedChange={checked =>
										setProjectFormData({
											...projectFormData,
											published: checked,
										})
									}
								/>
								<Label htmlFor='published'>Published</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Switch
									id='featured'
									checked={projectFormData.featured}
									onCheckedChange={checked =>
										setProjectFormData({
											...projectFormData,
											featured: checked,
										})
									}
								/>
								<Label htmlFor='featured'>Featured</Label>
							</div>
						</div>

						<div className='flex justify-end space-x-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setShowProjectDialog(false)}
							>
								Cancel
							</Button>
							<Button type='submit'>
								{editingProject ? 'Update' : 'Create'} Project
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Category Dialog */}
			<Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Category</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCategorySubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='categoryName'>Name</Label>
							<Input
								id='categoryName'
								value={categoryFormData.name}
								onChange={e =>
									setCategoryFormData({
										...categoryFormData,
										name: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='categoryDescription'>Description</Label>
							<Textarea
								id='categoryDescription'
								value={categoryFormData.description}
								onChange={e =>
									setCategoryFormData({
										...categoryFormData,
										description: e.target.value,
									})
								}
								rows={3}
							/>
						</div>
						<div className='flex justify-end space-x-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setShowCategoryDialog(false)}
							>
								Cancel
							</Button>
							<Button type='submit'>Create Category</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* News Dialog */}
			<Dialog open={showNewsDialog} onOpenChange={setShowNewsDialog}>
				<DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>
							{editingNews ? 'Edit News Article' : 'Create New News Article'}
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleNewsSubmit} className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='newsTitle'>Title</Label>
							<Input
								id='newsTitle'
								value={newsFormData.title}
								onChange={e =>
									setNewsFormData({
										...newsFormData,
										title: e.target.value,
									})
								}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='newsDescription'>Description</Label>
							<Textarea
								id='newsDescription'
								value={newsFormData.description}
								onChange={e =>
									setNewsFormData({
										...newsFormData,
										description: e.target.value,
									})
								}
								rows={3}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='newsContent'>Content</Label>
							<Textarea
								id='newsContent'
								value={newsFormData.content}
								onChange={e =>
									setNewsFormData({
										...newsFormData,
										content: e.target.value,
									})
								}
								rows={8}
								placeholder='Full article content...'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Images</Label>
							<ImageUpload
								images={newsImages}
								onChange={setNewsImages}
								maxImages={10}
							/>
						</div>

						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<Switch
									id='newsPublished'
									checked={newsFormData.published}
									onCheckedChange={checked =>
										setNewsFormData({
											...newsFormData,
											published: checked,
										})
									}
								/>
								<Label htmlFor='newsPublished'>Published</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Switch
									id='newsFeatured'
									checked={newsFormData.featured}
									onCheckedChange={checked =>
										setNewsFormData({
											...newsFormData,
											featured: checked,
										})
									}
								/>
								<Label htmlFor='newsFeatured'>Featured</Label>
							</div>
						</div>

						<div className='flex justify-end space-x-2'>
							<Button
								type='button'
								variant='outline'
								onClick={() => setShowNewsDialog(false)}
							>
								Cancel
							</Button>
							<Button type='submit'>
								{editingNews ? 'Update' : 'Create'} News Article
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
