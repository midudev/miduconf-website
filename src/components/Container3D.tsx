import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'

interface Props {
	children: React.ReactNode
}

export const Container3D = ({ children }: Props) => {
	const [isMobile, setIsMobile] = useState(false)

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

	return (
		<div className='relative z-[1000] w-full h-auto mx-auto md:aspect-[2/1]'>
			<div className='h-full opacity-100 isolate md:aspect-[2/1]'>
				<div className='h-full'>
					{isMobile ? (
						<>{children}</>
					) : (
						<Atropos
							highlight={true}
							innerClassName='backdrop-blur-xl rounded-[60px]'
							className='block w-full h-auto mx-auto shadow-2xl md:aspect-[2/1] [box-sizing:border-box]'
						>
							{children}
						</Atropos>
					)}
				</div>
			</div>
		</div>
	)
}
