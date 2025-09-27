import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}

				// Check admin credentials from environment variables
				const adminEmail = process.env.ADMIN_EMAIL
				const adminPassword = process.env.ADMIN_PASSWORD

				if (
					credentials.email === adminEmail &&
					credentials.password === adminPassword
				) {
					return {
						id: 'admin',
						email: adminEmail,
						name: 'Admin',
						role: 'ADMIN',
					}
				}

				// Check database users
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				if (!user || !user.password) {
					return null
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password
				)

				if (!isPasswordValid) {
					return null
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
				}
			},
		}),
	],
	session: {
		strategy: 'jwt' as const,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			if (token && token.sub) {
				session.user.id = token.sub
				session.user.role = token.role as string
			}
			return session
		},
	},
	pages: {
		signIn: '/admin/login',
	},
}

export default NextAuth(authOptions)
