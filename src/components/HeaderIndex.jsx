export const HeaderIndex = () => {
	return (
		<div className='flex flex-col justify-around max-w-4xl m-auto md:flex-row gap-x-4'>
			<a
				className='flex-row justify-center  text-white cursor-pointer hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-90 hover:opacity-100'
				href='/#agenda'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					<path d='M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
					<path d='M16 3l0 4'></path>
					<path d='M8 3l0 4'></path>
					<path d='M4 11l16 0'></path>
					<path d='M8 15h2v2h-2z'></path>
				</svg>
				Ver agenda del evento
			</a>
			<a
				className='flex-row justify-center  text-white cursor-pointer hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-90 hover:opacity-100'
				href='/#regalos'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					<path d='M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z'></path>
					<path d='M12 8l0 13'></path>
					<path d='M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7'></path>
					<path d='M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5'></path>
				</svg>
				Ver los 256 regalos
			</a>
			<a
				href='/#sponsors'
				className='flex-row justify-center  text-white cursor-pointer hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-90 hover:opacity-100'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					<path d='M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
					<path d='M16 3l0 4'></path>
					<path d='M8 3l0 4'></path>
					<path d='M4 11l16 0'></path>
					<path d='M8 15h2v2h-2z'></path>
				</svg>
				Descubrir patrocinadores
			</a>
		</div>
	)
}
