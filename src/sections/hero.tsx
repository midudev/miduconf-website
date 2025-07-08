import { Countdown } from '@/components/Countdown'

export function Hero() {
	return (
		<section className='bg-[url(/global/bg.png)] min-h-screen bg-cover bg-center image-pixelated relative border-b border-pallet-primary/20'>
			<div className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full px-8 py-16 md:items-end md:flex-row gap-y-4 bg-gradient-to-t from-black md:bg-none animate-fade-in-up'>
				<div>
					<p className='text-white'>
						Con{' '}
						<a
							href='https://midu.dev/'
							className='text-white underline md:text-pallet-primary'
							target='_blank'
							rel='noopener noreferrer'
						>
							@midudev
						</a>
					</p>
					<h2 className='text-4xl leading-normal font-bold max-w-[24ch] text-white text-balance'>
						Evento de <span className='text-pallet-primary'>Programación</span> y{' '}
						<span className='text-pallet-primary'>Desarrollo Web</span>
					</h2>
				</div>
				<div>
					<p className='mb-2 text-sm text-center text-white md:ml-4 md:text-start'>
						<time dateTime='2025-09-10'>10 de Sepiembre 2025</time> | Ver en{' '}
						<a
							href='https://www.twitch.tv/midudev'
							className='underline text-violet-200'
							target='_blank'
							rel='noopener noreferrer'
						>
							Twitch
						</a>
					</p>
					<Countdown className='mb-4' />
					<button
						disabled
						aria-disabled
						className='flex [box-shadow:-4px_4px_0_0_#0099FF60] items-center gap-x-4 gap-y-2 py-4 pl-8 pr-6 text-xl text-white bg-pallet-primary disabled:cursor-not-allowed md:flex-row flex-col w-full md:w-auto'
					>
						Consigue tu Ticket{' '}
						<span className='w-full px-2 py-1 text-sm bg-black/20 md:w-auto'>Próximamente</span>
					</button>
				</div>
			</div>
		</section>
	)
}
