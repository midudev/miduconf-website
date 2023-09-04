import { interTight } from '../pages'

export function Logo ({ className = 'h-80' }) {
	return (
		<h1
			className={`${interTight.className} pt-4 mx-auto mb-0 text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r text-white xl:pt-6 sm:text-[6rem] lg:text-[7rem] h-[120px] text-center mt-10`}
		>
			<span className='text-transparent [-webkit-text-stroke-width:4px] [-webkit-text-stroke-color:white]'>
				midu
			</span>
			Conf
		</h1>
	)
}
