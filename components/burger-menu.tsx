'use client'

import { motion } from 'framer-motion'

interface BurgerMenuProps {
	isOpen: boolean
	onClick: () => void
}

const BurgerMenu = ({ isOpen, onClick }: BurgerMenuProps) => {
	return (
		<button
			onClick={onClick}
			className='relative z-50 w-10 h-10 flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/40 transition-all duration-300'
		>
			<div className='w-5 h-4 flex flex-col justify-between'>
				<motion.span
					animate={{
						rotate: isOpen ? 45 : 0,
						y: isOpen ? 6 : 0,
					}}
					transition={{ duration: 0.3 }}
					className='w-full h-0.5 bg-white origin-center shadow-sm'
				/>
				<motion.span
					animate={{
						opacity: isOpen ? 0 : 1,
					}}
					transition={{ duration: 0.3 }}
					className='w-full h-0.5 bg-white shadow-sm'
				/>
				<motion.span
					animate={{
						rotate: isOpen ? -45 : 0,
						y: isOpen ? -6 : 0,
					}}
					transition={{ duration: 0.3 }}
					className='w-full h-0.5 bg-white origin-center shadow-sm'
				/>
			</div>
		</button>
	)
}

export default BurgerMenu
