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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUpload, UploadedImage } from '@/components/image-upload'
import RichTextEditor from '@/components/rich-text-editor'
import {
	Plus,
	Edit,
	Trash2,
	LogOut,
	Settings,
	FolderOpen,
	Eye,
	Tag,
	Images,
	FileText,
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

export default function AdminDashboard() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [projects, setProjects] = useState<Project[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)
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
		try {
			const [projectsRes, categoriesRes, newsRes] = await Promise.all([
				fetch('/api/projects'),
				fetch('/api/categories'),
				fetch('/api/news?all=true'),
			])

			if (projectsRes.ok) {
				const projectsData = await projectsRes.json()
				setProjects(projectsData)
			}

			if (categoriesRes.ok) {
				const categoriesData = await categoriesRes.json()
				setCategories(categoriesData)
			}

			if (newsRes.ok) {
				const newsData = await newsRes.json()
				setNews(newsData)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
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

				{/* Tabs */}
				<Tabs defaultValue='projects' className='space-y-6'>
					<TabsList>
						<TabsTrigger
							value='projects'
							className='flex items-center space-x-2'
						>
							<FolderOpen className='h-4 w-4' />
							<span>Projects</span>
						</TabsTrigger>
						<TabsTrigger
							value='categories'
							className='flex items-center space-x-2'
						>
							<Tag className='h-4 w-4' />
							<span>Categories</span>
						</TabsTrigger>
						<TabsTrigger value='news' className='flex items-center space-x-2'>
							<FileText className='h-4 w-4' />
							<span>News</span>
						</TabsTrigger>
					</TabsList>

					{/* Projects Tab */}
					<TabsContent value='projects'>
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
															<Images className='h-4 w-4 text-muted-foreground' />
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
					</TabsContent>

					{/* Categories Tab */}
					<TabsContent value='categories'>
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
					</TabsContent>

					{/* News Tab */}
					<TabsContent value='news'>
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
												<TableHead>Images</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Featured</TableHead>
												<TableHead>Created</TableHead>
												<TableHead>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{news.map(newsItem => (
												<TableRow key={newsItem.id}>
													<TableCell>
														<div className='flex items-center space-x-3'>
															<img
																src={
																	newsItem.images?.[0]?.url ||
																	newsItem.imageUrl ||
																	'/placeholder.svg'
																}
																alt={newsItem.title}
																className='w-10 h-10 rounded object-cover'
															/>
															<div>
																<p className='font-medium'>{newsItem.title}</p>
																<p className='text-sm text-muted-foreground truncate max-w-xs'>
																	{newsItem.description}
																</p>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<span className='text-sm'>
															{newsItem.author.name}
														</span>
													</TableCell>
													<TableCell>
														<div className='flex items-center space-x-1'>
															<Images className='h-4 w-4 text-muted-foreground' />
															<span className='text-sm'>
																{newsItem.images?.length || 0}
															</span>
														</div>
													</TableCell>
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
														{newsItem.featured && (
															<Badge variant='outline'>Featured</Badge>
														)}
													</TableCell>
													<TableCell>
														{new Date(newsItem.createdAt).toLocaleDateString()}
													</TableCell>
													<TableCell>
														<div className='flex items-center space-x-2'>
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
																onClick={() => handleDeleteNews(newsItem.id)}
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
					</TabsContent>
				</Tabs>
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
							<RichTextEditor
								value={newsFormData.content}
								onChange={value =>
									setNewsFormData({
										...newsFormData,
										content: value,
									})
								}
								placeholder='Full article content...'
								className='min-h-[200px]'
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
