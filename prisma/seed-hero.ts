import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('Seeding hero images...')

	// Hero images seed data
	const heroImages = [
		{
			url: '/modern-residential-building-with-clean-lines-and-g.jpg',
			fileName: 'modern-residential-building.jpg',
			order: 1,
			active: true,
		},
		{
			url: '/contemporary-office-building-with-sustainable-desi.jpg',
			fileName: 'contemporary-office-building.jpg',
			order: 2,
			active: true,
		},
		{
			url: '/modern-cultural-center-with-geometric-architecture.jpg',
			fileName: 'modern-cultural-center.jpg',
			order: 3,
			active: true,
		},
		{
			url: '/modern-educational-building-with-open-spaces-and-n.jpg',
			fileName: 'modern-educational-building.jpg',
			order: 4,
			active: true,
		},
	]

	// Delete existing hero images
	await prisma.heroImage.deleteMany()

	// Create new hero images
	for (const heroImage of heroImages) {
		await prisma.heroImage.create({
			data: heroImage,
		})
	}

	console.log('Hero images seeded successfully!')
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
