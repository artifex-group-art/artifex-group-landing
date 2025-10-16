'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Mail, Phone, MapPin } from 'lucide-react'

interface NavigationProps {
	isOpen: boolean
	onClose: () => void
}

const Navigation = ({ isOpen, onClose }: NavigationProps) => {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
		onClose()
	}

	const navigationItems = [
		{ name: 'Home', id: 'hero' },
		{ name: 'Partnerships', id: 'partnerships' },
		{ name: 'Location', id: 'location' },
		{ name: 'About', id: 'about' },
		{ name: 'Projects', id: 'projects' },
		{ name: 'News', id: 'news' },
		{ name: 'Contact', id: 'contact' },
	]

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed inset-0 bg-black/50 z-40'
						onClick={onClose}
					/>

					{/* Sidebar */}
					<m.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{
							type: 'tween',
							ease: 'easeInOut',
							duration: 0.4,
						}}
						className='fixed top-0 right-0 h-full w-full sm:w-80 max-w-sm bg-white shadow-2xl z-50 flex flex-col overflow-y-auto'
					>
						{/* Header */}
						<div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-100'>
							<div className='font-montserrat font-light text-lg sm:text-xl text-black'>
								MENU
							</div>
							<button
								onClick={onClose}
								className='p-2 hover:bg-gray-100 rounded-full transition-colors'
							>
								<X size={20} className='text-black sm:hidden' />
								<X size={24} className='text-black hidden sm:block' />
							</button>
						</div>

						{/* Navigation Links */}
						<div className='flex-1 p-4 sm:p-6 overflow-y-auto'>
							<nav className='space-y-4 sm:space-y-5'>
								{navigationItems.map((item, index) => (
									<m.div
										key={item.id}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: 0.1 + index * 0.1,
											duration: 0.3,
										}}
									>
										<button
											onClick={() => scrollToSection(item.id)}
											className='block w-full text-left font-montserrat font-light text-xl sm:text-2xl text-black hover:text-gray-600 transition-colors duration-300'
										>
											{item.name}
										</button>
									</m.div>
								))}
							</nav>

							{/* Contact Information */}
							<m.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.3 }}
								className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100'
							>
								<h3 className='font-montserrat font-semibold text-base sm:text-lg text-black mb-3 sm:mb-4'>
									CONTACT
								</h3>
								<div className='space-y-2 sm:space-y-3'>
									<div className='flex items-center space-x-2 sm:space-x-3'>
										<Mail size={14} className='text-gray-600 sm:hidden' />
										<Mail size={16} className='text-gray-600 hidden sm:block' />
										<span className='font-inter text-xs sm:text-sm text-gray-700 break-all'>
											info@artifex.uz
										</span>
									</div>
									<div className='flex items-center space-x-2 sm:space-x-3'>
										<Phone size={14} className='text-gray-600 sm:hidden' />
										<Phone
											size={16}
											className='text-gray-600 hidden sm:block'
										/>
										<span className='font-inter text-xs sm:text-sm text-gray-700'>
											+966 56 160 70 44
										</span>
									</div>
									<div className='flex items-center space-x-2 sm:space-x-3'>
										<MapPin size={14} className='text-gray-600 sm:hidden' />
										<MapPin
											size={16}
											className='text-gray-600 hidden sm:block'
										/>
										<span className='font-inter text-xs sm:text-sm text-gray-700'>
											Al Aridh, DMAE6942، 6942 ابراهيم بن موسى الفراء، 4718,
											Madinah 42314
										</span>
									</div>
								</div>
							</m.div>
						</div>
					</m.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default Navigation
