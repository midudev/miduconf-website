import { interTight } from '../pages'

export function Logo() {
	return (
		<h1
			className={`${interTight.className} mx-auto mb-0 text-[3rem] font-black bg-clip-text text-transparent bg-gradient-to-r text-white xl:pt-6 sm:text-[6rem] lg:text-[7rem] text-center sm:mt-10`}
		>
			<span className='text-transparent [-webkit-text-stroke-width:2px] sm:[-webkit-text-stroke-width:4px] [-webkit-text-stroke-color:white]'>
				midu
			</span>
			Conf
		</h1>
	)
}
