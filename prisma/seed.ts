import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	// Create admin user
	const adminEmail = process.env.ADMIN_EMAIL || 'admin@artifex.com'
	const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

	const hashedPassword = await bcrypt.hash(adminPassword, 12)

	const admin = await prisma.user.upsert({
		where: { email: adminEmail },
		update: {},
		create: {
			email: adminEmail,
			name: 'Admin User',
			password: hashedPassword,
			role: 'ADMIN',
		},
	})

	console.log('Admin user created:', admin.email)

	// Create sample projects
	const sampleProjects = [
		{
			title: 'Residential Complex Alpha',
			description: `This innovative residential complex represents the future of urban living, combining sustainability with modern design. The project features energy-efficient systems, green spaces, and community areas that foster social interaction.

Key Features:
• 150 residential units with varying layouts
• LEED Platinum certification
• Rooftop gardens and green spaces
• Community center and fitness facilities
• Underground parking with EV charging stations
• Smart home technology integration

The design emphasizes natural light and ventilation while maintaining privacy and comfort for all residents. The building's facade features a dynamic pattern that changes throughout the day, creating an ever-evolving landmark in the urban landscape.`,
			imageUrl: '/modern-residential-building-with-clean-lines-and-g.jpg',
			published: true,
			featured: true,
		},
		{
			title: 'Corporate Headquarters Beta',
			description: `A cutting-edge corporate headquarters designed to inspire innovation and collaboration. This sustainable office building sets new standards for workplace design in the 21st century.

Project Highlights:
• 40,000 sq ft of flexible office space
• Open collaborative areas and private meeting rooms
• Sustainable materials and energy systems
• Floor-to-ceiling windows maximizing natural light
• Indoor air quality optimization
• Bike storage and shower facilities

The building incorporates biophilic design principles, bringing nature indoors through living walls, water features, and natural materials. The result is a workspace that enhances productivity while promoting employee well-being.`,
			imageUrl: '/contemporary-office-building-with-sustainable-desi.jpg',
			published: true,
			featured: false,
		},
		{
			title: 'Cultural Center Gamma',
			description: `A dynamic cultural center that serves as a hub for arts, education, and community engagement. The building's geometric architecture reflects the creativity and innovation it houses within.

Features:
• Multi-purpose performance hall (800 seats)
• Art galleries with flexible exhibition spaces
• Education workshops and studios
• Public library and reading areas
• Café and community gathering spaces
• Outdoor amphitheater

The design creates a seamless flow between indoor and outdoor spaces, allowing for year-round cultural programming. The building's distinctive geometry creates interesting plays of light and shadow throughout the day.`,
			imageUrl: '/modern-cultural-center-with-geometric-architecture.jpg',
			published: true,
			featured: true,
		},
		{
			title: 'Mixed-Use Development Delta',
			description: `An innovative mixed-use development that combines residential, retail, and office spaces in a cohesive urban environment. This project demonstrates how thoughtful planning can create vibrant, walkable communities.

Components:
• 200 residential units (apartments and condos)
• 25,000 sq ft of retail space
• 15,000 sq ft of office space
• Public plaza and streetscape improvements
• Sustainable transportation options
• Green infrastructure integration

The development prioritizes walkability and public transit access while creating a sense of community through shared amenities and public spaces.`,
			imageUrl: '/mixed-use-building-with-retail-and-residential-spa.jpg',
			published: true,
			featured: false,
		},
		{
			title: 'Educational Campus Epsilon',
			description: `A modern educational facility designed to support 21st-century learning methodologies. The campus creates inspiring spaces that encourage collaboration, creativity, and academic excellence.

Facilities:
• 30 classrooms with flexible configurations
• Science and technology laboratories
• Library and resource center
• Student commons and dining facilities
• Sports and recreation facilities
• Sustainable energy systems

The design emphasizes natural light, flexible spaces, and technology integration to support diverse learning styles and teaching methods.`,
			imageUrl: '/modern-educational-building-with-open-spaces-and-n.jpg',
			published: true,
			featured: false,
		},
	]

	for (const projectData of sampleProjects) {
		const slug = projectData.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		await prisma.project.upsert({
			where: { slug },
			update: {},
			create: {
				...projectData,
				slug,
				authorId: admin.id,
			},
		})
	}

	console.log('Sample projects created')
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
