import Atropos from 'atropos/react'

interface Props {
	children: React.ReactNode
}

export const Container3D = ({ children }: Props) => {
	return (
		<div className='relative z-[1000] w-full h-auto mx-auto aspect-[9/10] md:aspect-[2/1]'>
			<div className='h-full opacity-100 isolate aspect-[9/10] md:aspect-[2/1]'>
				<div className='h-full'>
					<Atropos
						highlight={false}
						innerClassName='backdrop-blur-xl rounded-[60px]'
						className='block w-full h-auto mx-auto shadow-2xl aspect-[9/10] md:aspect-[2/1] [box-sizing:border-box]'
					>
						{children}
					</Atropos>
				</div>
			</div>
		</div>
	)
}
