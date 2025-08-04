import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'
import 'atropos/css'
import { useAtroposSync } from '../tickets/context/AtroposSync'

interface Props {
	children: React.ReactNode
}

export const Container3D = ({ children }: Props) => {
	const [isMobile, setIsMobile] = useState(false)

	// Try to get Atropos sync context, but don't fail if it's not available
	let onTilt: ((x: number, y: number) => void) | null = null
	try {
		const sync = useAtroposSync()
		onTilt = sync.onTilt
	} catch {
		// Context not available, that's okay
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)')
		setIsMobile(mediaQuery.matches)

		const handleMediaQueryChange = (e) => {
			setIsMobile(e.matches)
		}

		mediaQuery.addEventListener('change', handleMediaQueryChange)

		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange)
		}
	}, [])

	// Handle Atropos rotation events
	// Atropos pasa (rotateX, rotateY)
	const handleRotate = (rx: number, ry: number) => {
		if (!onTilt) return
		const k = 1.5 / 15
		// Matter.js: gravity.x = izquierda(-) / derecha(+)
		//            gravity.y = arriba(-) / abajo(+)
		const gx = ry * k         // usa rotateY para horizontal
		const gy = rx * k         // usa rotateX para vertical
		const clamp = (v: number) => Math.max(-1.5, Math.min(1.5, v))
		onTilt(clamp(gx), clamp(gy))
	}


	return (
		<div className='relative z-[1000] w-full h-auto mx-auto'>
			<div className='opacity-100 h-max isolate'>
				<div className='flex items-center justify-center h-max'>
					{isMobile ? (
						<>{children}</>
					) : (
						<Atropos
							highlight={true}
							innerClassName='backdrop-blur-xl rounded-xl'
							className='block w-max h-auto mx-auto shadow-2xl [box-sizing:border-box]'
							onRotate={handleRotate}
						>
							{children}
						</Atropos>
					)}
				</div>
			</div>
		</div>
	)
}
