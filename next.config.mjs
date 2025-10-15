/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'artifex-group.s3.eu-north-1.amazonaws.com',
			},
		],
	},
}

export default nextConfig
