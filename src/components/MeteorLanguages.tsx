'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

interface MeteorsProps {
	number?: number
}

interface MeteorStyle {
	head: {
		top: string
		left: string
		animationDelay: string
		animationDuration: string
	}
	tail: {
		background: string
	}
}

export const Meteors = ({ number = 5 }: MeteorsProps) => {
	const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([])
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// get height of container using ref
		if (!ref.current) return

		const height = ref.current.clientHeight

		const styles = [...new Array(number)].map(() => ({
			head: {
				top: Math.floor(Math.random() * height) + 'px',
				left: Math.floor(Math.random() * window.innerWidth) + 'px',
				animationDelay: Math.random() * 1 + 0.2 + 's',
				animationDuration: Math.floor(Math.random() * 8 + 2) + 's'
			},
			tail: {
				background: `linear-gradient(to right, ${Math.random() < 0.5 ? '#0099FF' : '#DEF2FF'
					}, transparent)`
			}
		}))

		setMeteorStyles(styles)
	}, [number])

	return (
		<div
			ref={ref}
			className='absolute overflow-hidden inset-0 w-full h-full animate-fade animate-once animate-duration-1000 z-[-1]'
		>
			{[...meteorStyles].map(({ head, tail }, idx) => (
				// Meteor Head
				<span
					key={idx}
					className={clsx(
						'pointer-events-none lala absolute left-1/2 top-1/2 h-0.5 w-0.5 animate-meteor opacity-0 rounded-full'
					)}
					style={head}
				>
					{/* Meteor Tail */}
					<div
						className='absolute h-0.5 -translate-y-1/2 rounded-full pointer-events-none top-1/2 -z-10 w-44 bg-gradient-to-r'
						style={tail}
					/>
				</span>
			))}
		</div>
	)
}
