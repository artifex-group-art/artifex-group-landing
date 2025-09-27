'use client''use client''use client''use client'



import { motion } from 'framer-motion'



const projects = [import { motion } from 'framer-motion'

	{

		id: 1,

		imageUrl: '/modern-residential-building-with-clean-lines-and-g.jpg',

		title: 'Modern Residential Complex'const projects = [import { motion } from 'framer-motion'import { motion } from 'framer-motion'

	},

	{	{

		id: 2,

		imageUrl: '/contemporary-office-building-with-sustainable-desi.jpg',		id: 1,

		title: 'Sustainable Office Building'

	},		imageUrl: '/modern-residential-building-with-clean-lines-and-g.jpg',

	{

		id: 3,		title: 'Modern Residential Complex'const projects = [const projects = [

		imageUrl: '/modern-cultural-center-with-geometric-architecture.jpg',

		title: 'Cultural Center'	},

	},

	{	{	{	{

		id: 4,

		imageUrl: '/modern-educational-building-with-open-spaces-and-n.jpg',		id: 2,

		title: 'Educational Complex'

	},		imageUrl: '/contemporary-office-building-with-sustainable-desi.jpg',		id: 1,		id: 1,

	{

		id: 5,		title: 'Sustainable Office Building'

		imageUrl: '/mixed-use-building-with-retail-and-residential-spa.jpg',

		title: 'Mixed-Use Development'	},		imageUrl: '/modern-residential-building-with-clean-lines-and-g.jpg',		imageUrl: '/modern-residential-building-with-clean-lines-and-g.jpg',

	},

	{	{

		id: 6,

		imageUrl: '/modern-architectural-facade-with-clean-lines-and-n.jpg',		id: 3,		title: 'Modern Residential Complex'		title: 'Modern Residential Complex'

		title: 'Commercial Facade'

	}		imageUrl: '/modern-cultural-center-with-geometric-architecture.jpg',

]

		title: 'Cultural Center'	},	},

function ArchitecturalProjectsSection() {

	return (	},

		<section className="py-0 bg-white">

			<motion.div	{	{	{

				className="grid grid-cols-3 gap-0"

				initial={{ opacity: 0 }}		id: 4,

				whileInView={{ opacity: 1 }}

				transition={{ duration: 0.8 }}		imageUrl: '/modern-educational-building-with-open-spaces-and-n.jpg',		id: 2,		id: 2,

				viewport={{ once: true }}

			>		title: 'Educational Complex'

				{projects.map((project, index) => (

					<motion.div	},		imageUrl: '/contemporary-office-building-with-sustainable-desi.jpg',		imageUrl: '/contemporary-office-building-with-sustainable-desi.jpg',

						key={project.id}

						className="aspect-square overflow-hidden group cursor-pointer"	{

						initial={{ opacity: 0, scale: 0.9 }}

						whileInView={{ opacity: 1, scale: 1 }}		id: 5,		title: 'Sustainable Office Building'		title: 'Sustainable Office Building'

						transition={{ duration: 0.6, delay: index * 0.1 }}

						viewport={{ once: true }}		imageUrl: '/mixed-use-building-with-retail-and-residential-spa.jpg',

						whileHover={{ scale: 1.05 }}

					>		title: 'Mixed-Use Development'	},	},

						<img

							src={project.imageUrl}	},

							alt={project.title}

							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"	{	{	{

						/>

					</motion.div>		id: 6,

				))}

			</motion.div>		imageUrl: '/modern-architectural-facade-with-clean-lines-and-n.jpg',		id: 3,		id: 3,

		</section>

	)		title: 'Commercial Facade'

}

	}		imageUrl: '/modern-cultural-center-with-geometric-architecture.jpg',		imageUrl: '/modern-cultural-center-with-geometric-architecture.jpg',

export default ArchitecturalProjectsSection
]

		title: 'Cultural Center'		title: 'Cultural Center'

function ArchitecturalProjectsSection() {

	return (	},	},

		<section className="py-0 bg-white">

			<motion.div	{	{

				className="grid grid-cols-3 gap-0"

				initial={{ opacity: 0 }}		id: 4,		id: 4,

				whileInView={{ opacity: 1 }}

				transition={{ duration: 0.8 }}		imageUrl: '/modern-educational-building-with-open-spaces-and-n.jpg',		imageUrl: '/modern-educational-building-with-open-spaces-and-n.jpg',

				viewport={{ once: true }}

			>		title: 'Educational Complex'		title: 'Educational Complex'

				{projects.map((project, index) => (

					<motion.div	},	},

						key={project.id}

						className="aspect-square overflow-hidden group cursor-pointer"	{	{

						initial={{ opacity: 0, scale: 0.9 }}

						whileInView={{ opacity: 1, scale: 1 }}		id: 5,		id: 5,

						transition={{ duration: 0.6, delay: index * 0.1 }}

						viewport={{ once: true }}		imageUrl: '/mixed-use-building-with-retail-and-residential-spa.jpg',		imageUrl: '/mixed-use-building-with-retail-and-residential-spa.jpg',

						whileHover={{ scale: 1.05 }}

					>		title: 'Mixed-Use Development'		title: 'Mixed-Use Development'

						<img

							src={project.imageUrl}	},	},

							alt={project.title}

							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"	{	{

						/>

					</motion.div>		id: 6,		id: 6,

				))}

			</motion.div>		imageUrl: '/modern-architectural-facade-with-clean-lines-and-n.jpg',		imageUrl: '/modern-architectural-facade-with-clean-lines-and-n.jpg',

		</section>

	)		title: 'Commercial Facade'		title: 'Commercial Facade'

}

	}	}

export default ArchitecturalProjectsSection
]]



function ArchitecturalProjectsSection() {function ArchitecturalProjectsSection() {

	return (	return (

		<section className="py-0 bg-white">		<section className="py-0 bg-white">

			<motion.div			<motion.div

				className="grid grid-cols-3 gap-0"				className="grid grid-cols-3 gap-0"

				initial={{ opacity: 0 }}				initial={{ opacity: 0 }}

				whileInView={{ opacity: 1 }}				whileInView={{ opacity: 1 }}

				transition={{ duration: 0.8 }}				transition={{ duration: 0.8 }}

				viewport={{ once: true }}				viewport={{ once: true }}

			>			>

				{projects.map((project, index) => (				{projects.map((project, index) => (

					<motion.div					<motion.div

						key={project.id}						key={project.id}

						className="aspect-square overflow-hidden group cursor-pointer"						className="aspect-square overflow-hidden group cursor-pointer"

						initial={{ opacity: 0, scale: 0.9 }}						initial={{ opacity: 0, scale: 0.9 }}

						whileInView={{ opacity: 1, scale: 1 }}						whileInView={{ opacity: 1, scale: 1 }}

						transition={{ duration: 0.6, delay: index * 0.1 }}						transition={{ duration: 0.6, delay: index * 0.1 }}

						viewport={{ once: true }}						viewport={{ once: true }}

						whileHover={{ scale: 1.05 }}						whileHover={{ scale: 1.05 }}

					>					>

						<img						<img

							src={project.imageUrl}							src={project.imageUrl}

							alt={project.title}							alt={project.title}

							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"

						/>						/>

					</motion.div>					</motion.div>

				))}				))}

			</motion.div>			</motion.div>

		</section>		</section>

	)	)

}}



export default ArchitecturalProjectsSectionexport default ArchitecturalProjectsSection

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/projects/published')
			if (response.ok) {
				const data = await response.json()
				console.log('Fetched projects:', data) // Debug log
				setProjects(data)
			} else {
				console.error('Failed to fetch projects:', response.status)
			}
		} catch (error) {
			console.error('Error fetching projects:', error)
		} finally {
			setLoading(false)
		}
	}

	// Create array of projects with their first image (hero image)
	const projectsWithHeroImage = projects.map(project => ({
		...project,
		heroImage: project.images?.[0] || null,
		totalImages: project.images?.length || 0,
	}))

	// For stats - total images from all projects
	const totalImages = projects.reduce(
		(sum, project) => sum + (project.images?.length || 0),
		0
	)

	if (loading) {
		return (
			<section className='py-20 bg-slate-50'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto'></div>
						<p className='mt-4 text-slate-600 font-mono text-sm'>
							Loading architectural projects...
						</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className='py-24 bg-slate-50 relative overflow-hidden'>
			{/* Blueprint Grid Background */}
			<div className='absolute inset-0 opacity-[0.02]'>
				<div
					className='w-full h-full'
					style={{
						backgroundImage: `
							linear-gradient(to right, #1e293b 1px, transparent 1px),
							linear-gradient(to bottom, #1e293b 1px, transparent 1px)
						`,
						backgroundSize: '40px 40px',
					}}
				/>
			</div>

			{/* Technical Corner Elements */}
			<div className='absolute top-8 left-8 text-slate-400'>
				<div className='border-l-2 border-t-2 border-slate-300 w-12 h-12'></div>
				<span className='text-xs font-mono mt-2 block'>A1</span>
			</div>
			<div className='absolute top-8 right-8 text-slate-400'>
				<div className='border-r-2 border-t-2 border-slate-300 w-12 h-12'></div>
				<span className='text-xs font-mono mt-2 block text-right'>B1</span>
			</div>

			<div className='max-w-7xl mx-auto px-6 lg:px-8 relative'>
				{/* Technical Header */}
				<motion.div
					className='text-center mb-20'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					{/* Project Number */}
					<motion.div
						className='inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-3 font-mono text-sm mb-8'
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						<DraftingCompass className='h-4 w-4' />
						<span>PROJECT PORTFOLIO</span>
						<span className='text-slate-400'>|</span>
						<span className='text-slate-400'>2024-2025</span>
					</motion.div>

					{/* Main Title */}
					<motion.h2
						className='text-5xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
					>
						ARCHITECTURAL
						<br />
						<span className='font-bold'>PORTFOLIO</span>
					</motion.h2>

					{/* Technical Description */}
					<motion.div
						className='max-w-4xl mx-auto'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
					>
						<p className='text-slate-600 text-lg lg:text-xl leading-relaxed mb-8'>
							A comprehensive collection of innovative architectural solutions,
							sustainable designs, and contemporary structures that define the
							future of modern living spaces.
						</p>

						{/* Technical Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
							<div className='text-center border-l-2 border-slate-300 pl-6'>
								<div className='text-3xl font-bold text-slate-900 font-mono'>
									{projects.length}
								</div>
								<div className='text-sm text-slate-600 font-mono tracking-wider'>
									PROJECTS
								</div>
							</div>
							<div className='text-center border-l-2 border-slate-300 pl-6'>
								<div className='text-3xl font-bold text-slate-900 font-mono'>
									{totalImages}
								</div>
								<div className='text-sm text-slate-600 font-mono tracking-wider'>
									VISUALS
								</div>
							</div>
							<div className='text-center border-l-2 border-slate-300 pl-6'>
								<div className='text-3xl font-bold text-slate-900 font-mono'>
									{new Date().getFullYear()}
								</div>
								<div className='text-sm text-slate-600 font-mono tracking-wider'>
									ESTABLISHED
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Architectural Grid Gallery */}
				{projects.length > 0 ? (
					projectsWithHeroImage.some(p => p.heroImage) ? (
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							{projectsWithHeroImage.map((project, index) =>
								project.heroImage ? (
									<ArchitecturalProjectCard
										key={project.id}
										project={project}
										heroImage={project.heroImage}
										totalImages={project.totalImages}
										index={index}
									/>
								) : (
									<ProjectCardWithoutImage
										key={project.id}
										project={project}
										index={index}
									/>
								)
							)}
						</motion.div>
					) : (
						<motion.div
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							{projects.map((project, index) => (
								<ProjectCardWithoutImage
									key={project.id}
									project={project}
									index={index}
								/>
							))}
						</motion.div>
					)
				) : (
					<motion.div
						className='text-center py-20'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
					>
						<div className='bg-white border-2 border-dashed border-slate-300 rounded-lg p-12 max-w-md mx-auto'>
							<Building2 className='h-16 w-16 text-slate-400 mx-auto mb-6' />
							<h3 className='text-xl font-bold text-slate-900 mb-2 font-mono'>
								NO PROJECTS FOUND
							</h3>
							<p className='text-slate-600'>
								Project portfolio is currently under development. Check back
								soon for our latest architectural innovations.
							</p>
						</div>
					</motion.div>
				)}

				{/* Technical Footer */}
				<motion.div
					className='mt-20 text-center border-t-2 border-slate-300 pt-12'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6 }}
				>
					<div className='flex items-center justify-center gap-8 text-slate-600 font-mono text-sm'>
						<div className='flex items-center gap-2'>
							<Compass className='h-4 w-4' />
							<span>SCALE 1:100</span>
						</div>
						<div className='w-px h-6 bg-slate-300'></div>
						<div className='flex items-center gap-2'>
							<Ruler className='h-4 w-4' />
							<span>DRAWINGS</span>
						</div>
						<div className='w-px h-6 bg-slate-300'></div>
						<div className='flex items-center gap-2'>
							<Square className='h-4 w-4' />
							<span>ELEVATION</span>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Bottom Technical Elements */}
			<div className='absolute bottom-8 left-8 text-slate-400'>
				<div className='border-l-2 border-b-2 border-slate-300 w-12 h-12'></div>
				<span className='text-xs font-mono mt-2 block'>C1</span>
			</div>
			<div className='absolute bottom-8 right-8 text-slate-400'>
				<div className='border-r-2 border-b-2 border-slate-300 w-12 h-12'></div>
				<span className='text-xs font-mono mt-2 block text-right'>D1</span>
			</div>
		</section>
	)
}

interface ArchitecturalProjectCardProps {
	project: Project & { heroImage: any; totalImages: number }
	heroImage: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	totalImages: number
	index: number
}

function ArchitecturalProjectCard({
	project,
	heroImage,
	totalImages,
	index,
}: ArchitecturalProjectCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<motion.div
			className='group cursor-pointer'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.05 }}
			whileHover={{ y: -4 }}
		>
			<Link href={`/projects/${project.slug}`}>
				<div className='relative bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:border-slate-900 hover:shadow-xl'>
					{/* Technical Drawing Border */}
					<div className='absolute inset-2 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

					{/* Image Container */}
					<div className='relative aspect-[4/3] overflow-hidden'>
						<img
							src={heroImage.url}
							alt={heroImage.caption || `${project.title} - Hero Image`}
							className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							onLoad={() => setImageLoaded(true)}
						/>

						{/* Loading skeleton */}
						{!imageLoaded && (
							<div className='absolute inset-0 bg-slate-200 animate-pulse' />
						)}

						{/* Technical Overlay */}
						<div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

						{/* Project Number */}
						<div className='absolute top-4 left-4'>
							<div className='bg-white px-3 py-1 font-mono text-xs font-bold text-slate-900'>
								{String(index + 1).padStart(2, '0')}
							</div>
						</div>

						{/* Technical Badges */}
						<div className='absolute top-4 right-4 flex flex-col gap-2'>
							{project.featured && (
								<Badge className='bg-slate-900 text-white border-0 font-mono text-xs'>
									FEATURED
								</Badge>
							)}
							{project.category && (
								<Badge
									variant='outline'
									className='bg-white/90 text-slate-900 border-slate-300 font-mono text-xs'
								>
									{project.category.name.toUpperCase()}
								</Badge>
							)}
						</div>

						{/* Image Count */}
						<div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<div className='bg-white/90 px-2 py-1 font-mono text-xs text-slate-900'>
								{totalImages} IMAGE{totalImages !== 1 ? 'S' : ''}
							</div>
						</div>

						{/* Project Info Overlay */}
						<div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
							<div className='text-white'>
								<h3 className='font-bold text-lg mb-2 line-clamp-2'>
									{project.title}
								</h3>

								{heroImage.caption && (
									<p className='text-white/80 text-sm mb-3 line-clamp-2 font-light'>
										{heroImage.caption}
									</p>
								)}

								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-3 text-white/80 text-xs font-mono'>
										<div className='flex items-center gap-1'>
											<Calendar className='h-3 w-3' />
											<span>{new Date(project.createdAt).getFullYear()}</span>
										</div>
										<div className='w-px h-3 bg-white/40'></div>
										<div className='flex items-center gap-1'>
											<MapPin className='h-3 w-3' />
											<span>UZ</span>
										</div>
									</div>

									<div className='flex items-center gap-1 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<span className='text-xs font-mono'>VIEW</span>
										<ArrowUpRight className='h-3 w-3' />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Technical Specifications Strip */}
					<div className='p-4 bg-slate-50 border-t border-slate-200'>
						<div className='flex items-center justify-between text-xs font-mono text-slate-600'>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<Square className='h-3 w-3' />
									<span>PLAN</span>
								</div>
								<div className='flex items-center gap-1'>
									<Triangle className='h-3 w-3' />
									<span>ELEVATION</span>
								</div>
								<div className='flex items-center gap-1'>
									<Circle className='h-3 w-3' />
									<span>SECTION</span>
								</div>
							</div>
							<div className='text-slate-900 font-bold'>
								{project.title.toUpperCase()}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

interface ArchitecturalImageCardProps {
	project: Project
	image: {
		id: string
		url: string
		fileName: string
		caption?: string
		order: number
	}
	imageIndex: number
	layoutIndex: number
}

function ArchitecturalImageCard({
	project,
	image,
	imageIndex,
	layoutIndex,
}: ArchitecturalImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	// Define grid spans for architectural layout
	const getGridSpan = (index: number) => {
		const patterns = [
			'lg:col-span-8', // Large feature
			'lg:col-span-4', // Medium
			'lg:col-span-6', // Medium-large
			'lg:col-span-6', // Medium-large
			'lg:col-span-4', // Medium
			'lg:col-span-8', // Large feature
			'lg:col-span-5', // Medium
			'lg:col-span-7', // Large
			'lg:col-span-4', // Medium
			'lg:col-span-4', // Medium
			'lg:col-span-4', // Medium
		]
		return patterns[index % patterns.length]
	}

	const getAspectRatio = (index: number) => {
		const ratios = [
			'aspect-[4/3]',
			'aspect-[3/4]',
			'aspect-[16/9]',
			'aspect-[1/1]',
			'aspect-[3/2]',
		]
		return ratios[index % ratios.length]
	}

	return (
		<motion.div
			className={`${getGridSpan(layoutIndex)} group cursor-pointer`}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: layoutIndex * 0.05 }}
			whileHover={{ y: -4 }}
		>
			<Link href={`/projects/${project.slug}`}>
				<div className='relative bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:border-slate-900 hover:shadow-xl'>
					{/* Technical Drawing Border */}
					<div className='absolute inset-2 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

					{/* Image Container */}
					<div
						className={`relative overflow-hidden ${getAspectRatio(
							layoutIndex
						)}`}
					>
						<img
							src={image.url}
							alt={
								image.caption || `${project.title} - Image ${imageIndex + 1}`
							}
							className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							onLoad={() => setImageLoaded(true)}
						/>

						{/* Loading skeleton */}
						{!imageLoaded && (
							<div className='absolute inset-0 bg-slate-200 animate-pulse' />
						)}

						{/* Technical Overlay */}
						<div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

						{/* Project Number */}
						<div className='absolute top-4 left-4'>
							<div className='bg-white px-3 py-1 font-mono text-xs font-bold text-slate-900'>
								{String(layoutIndex + 1).padStart(2, '0')}
							</div>
						</div>

						{/* Technical Badges */}
						<div className='absolute top-4 right-4 flex flex-col gap-2'>
							{project.featured && (
								<Badge className='bg-slate-900 text-white border-0 font-mono text-xs'>
									FEATURED
								</Badge>
							)}
							{project.category && (
								<Badge
									variant='outline'
									className='bg-white/90 text-slate-900 border-slate-300 font-mono text-xs'
								>
									{project.category.name.toUpperCase()}
								</Badge>
							)}
						</div>

						{/* Image Count */}
						<div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<div className='bg-white/90 px-2 py-1 font-mono text-xs text-slate-900'>
								{imageIndex + 1}/{project.images?.length || 1}
							</div>
						</div>

						{/* Technical Info Overlay */}
						<div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
							<div className='text-white'>
								<h3 className='font-bold text-lg mb-2 line-clamp-2'>
									{project.title}
								</h3>

								{image.caption && (
									<p className='text-white/80 text-sm mb-3 line-clamp-2 font-light'>
										{image.caption}
									</p>
								)}

								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-3 text-white/80 text-xs font-mono'>
										<div className='flex items-center gap-1'>
											<Calendar className='h-3 w-3' />
											<span>{new Date(project.createdAt).getFullYear()}</span>
										</div>
										<div className='w-px h-3 bg-white/40'></div>
										<div className='flex items-center gap-1'>
											<MapPin className='h-3 w-3' />
											<span>UZ</span>
										</div>
									</div>

									<div className='flex items-center gap-1 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<span className='text-xs font-mono'>VIEW</span>
										<ArrowUpRight className='h-3 w-3' />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Technical Specifications Strip */}
					<div className='p-4 bg-slate-50 border-t border-slate-200'>
						<div className='flex items-center justify-between text-xs font-mono text-slate-600'>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<Square className='h-3 w-3' />
									<span>PLAN</span>
								</div>
								<div className='flex items-center gap-1'>
									<Triangle className='h-3 w-3' />
									<span>ELEVATION</span>
								</div>
								<div className='flex items-center gap-1'>
									<Circle className='h-3 w-3' />
									<span>SECTION</span>
								</div>
							</div>
							<div className='text-slate-900 font-bold'>
								{project.title.toUpperCase()}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

interface ProjectCardWithoutImageProps {
	project: Project
	index: number
}

function ProjectCardWithoutImage({
	project,
	index,
}: ProjectCardWithoutImageProps) {
	return (
		<motion.div
			className='group cursor-pointer'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.05 }}
			whileHover={{ y: -4 }}
		>
			<Link href={`/projects/${project.slug}`}>
				<div className='bg-white border-2 border-slate-200 overflow-hidden transition-all duration-500 hover:border-slate-900 hover:shadow-xl h-80'>
					{/* Technical Drawing Border */}
					<div className='absolute inset-2 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

					{/* Content Container */}
					<div className='relative h-full p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-slate-100'>
						{/* Project Number */}
						<div className='absolute top-4 left-4'>
							<div className='bg-slate-900 text-white px-3 py-1 font-mono text-xs font-bold'>
								{String(index + 1).padStart(2, '0')}
							</div>
						</div>

						{/* Technical Badges */}
						<div className='absolute top-4 right-4 flex flex-col gap-2'>
							{project.featured && (
								<Badge className='bg-slate-900 text-white border-0 font-mono text-xs'>
									FEATURED
								</Badge>
							)}
							{project.category && (
								<Badge
									variant='outline'
									className='bg-white/90 text-slate-900 border-slate-300 font-mono text-xs'
								>
									{project.category.name.toUpperCase()}
								</Badge>
							)}
						</div>

						{/* Main Content */}
						<div className='flex-1 flex flex-col justify-center text-center'>
							<Building2 className='h-16 w-16 text-slate-300 mx-auto mb-6 group-hover:text-slate-400 transition-colors' />

							<h3 className='text-slate-900 font-bold text-xl mb-4 line-clamp-2'>
								{project.title}
							</h3>

							<p className='text-slate-600 text-sm line-clamp-3 mb-4'>
								{project.description}
							</p>

							<div className='flex items-center justify-center gap-3 text-slate-500 text-xs font-mono'>
								<div className='flex items-center gap-1'>
									<Calendar className='h-3 w-3' />
									<span>{new Date(project.createdAt).getFullYear()}</span>
								</div>
								<div className='w-px h-3 bg-slate-300'></div>
								<div className='flex items-center gap-1'>
									<MapPin className='h-3 w-3' />
									<span>UZ</span>
								</div>
							</div>
						</div>

						{/* No Images Indicator */}
						<div className='text-center'>
							<div className='bg-slate-200 text-slate-600 px-3 py-2 rounded font-mono text-xs mb-4'>
								NO IMAGES UPLOADED
							</div>

							<div className='flex items-center justify-center gap-1 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
								<span className='text-xs font-mono'>VIEW PROJECT</span>
								<ArrowUpRight className='h-3 w-3' />
							</div>
						</div>
					</div>

					{/* Technical Specifications Strip */}
					<div className='p-4 bg-slate-50 border-t border-slate-200'>
						<div className='flex items-center justify-between text-xs font-mono text-slate-600'>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<Square className='h-3 w-3' />
									<span>PLAN</span>
								</div>
								<div className='flex items-center gap-1'>
									<Triangle className='h-3 w-3' />
									<span>DRAFT</span>
								</div>
							</div>
							<div className='text-slate-900 font-bold'>
								{project.title.toUpperCase()}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

export default ArchitecturalProjectsSection
