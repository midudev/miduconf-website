'use client'

import { useEffect, useState } from 'react'

export default function MouseEffect () {
	const [{ x, y }, setCursorPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (event) => {
			const { clientX, clientY } = event
			setCursorPosition({ x: clientX, y: clientY })
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	if (x !== 0 && y !== 0) {
		return (
			<div
				className='pointer-events-none max-[800px]:hidden fixed top-0 left-0 inset-0 z-30 transition duration-300'
				style={{
					background: `radial-gradient(100px at ${x}px ${y}px, #ffff0611, transparent 50%)`
				}}
			/>
		)
	}
	return null
}
