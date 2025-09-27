import { withAuth } from 'next-auth/middleware'

export default withAuth(
	function middleware(req) {
		// Additional middleware logic if needed
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				const { pathname } = req.nextUrl

				// Allow access to login page
				if (pathname === '/admin/login') {
					return true
				}

				// Protect other admin routes
				if (pathname.startsWith('/admin')) {
					return token?.role === 'ADMIN'
				}

				return true
			},
		},
	}
)

export const config = {
	matcher: ['/admin/:path*'], // Fixed to protect admin routes
}
