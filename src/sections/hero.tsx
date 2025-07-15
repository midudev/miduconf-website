import { Countdown } from '@/components/Countdown'
import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'

export function Hero() {
	return (
		<section className='bg-[url(/global/bg.png)] min-h-screen bg-cover bg-center image-pixelated relative border-b border-pallet-primary/20'>
			<div className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full px-8 py-16 md:items-end md:flex-row gap-y-4 bg-gradient-to-t from-black md:bg-none animate-fade-in-up'>
				<div className='flex flex-col items-center md:items-start'>
					<Countdown className='mb-4' />
					<h3 className='text-4xl text-center md:text-left md:text-6xl uppercase leading-normal font-medium max-w-[24ch] text-white text-balance'>
						La nueva era de la Programación
					</h3>
				</div>
				<div className='flex flex-col gap-6'>
					<h2 className='text-center md:text-left text-xl max-w-[32ch] text-white text-pretty'>
						Conferencia de Programación y Desarrollo en Español en{' '}
						<Link
							href='https://www.twitch.tv/midudev'
							className='underline text-violet-100'
							target='_blank'
							rel='noopener noreferrer'
						>
							Twitch
						</Link>
					</h2>
					<button
						disabled
						aria-disabled
						className='inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white bg-pallet-primary uppercase rounded-md disabled:cursor-not-allowed md:flex-row md:w-max'
					>
						<EnterArrow className='hidden md:block' />
						Consigue tu Ticket
						<span className='w-full px-2 py-1 text-xs bg-black/40 md:w-auto'>Próximamente</span>
					</button>
				</div>
			</div>
		</section>
	)
}
