import { Countdown } from '@/components/Countdown'
import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'

export function Hero() {
	return (
		<section
			className='bg-[url(/global/bg.png)] min-h-screen bg-cover bg-center image-pixelated relative border-b border-pallet-primary/20'
			role='banner'
			aria-labelledby='hero-title'
		>
			<div className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full px-8 py-16 md:items-end md:flex-row gap-y-4 bg-gradient-to-t from-black md:bg-none animate-fade-in-up'>
				<div className='flex flex-col items-center md:items-start'>
					<Countdown className='mb-4' />
					<h1
						id='hero-title'
						className='text-4xl text-center md:text-left md:text-6xl uppercase leading-normal font-bold max-w-[24ch] text-white text-balance'
					>
						La nueva era del desarrollo web
					</h1>
				</div>
				<div className='flex flex-col gap-6'>
					<p className='text-center md:text-left text-xl max-w-[32ch] text-white text-pretty'>
						Conferencia de Programación y Desarrollo en Español en{' '}
						<Link
							href='https://www.twitch.tv/midudev'
							className='underline text-violet-100 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-black'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visitar el canal de Twitch de midudev (se abre en nueva ventana)'
						>
							Twitch
						</Link>
					</p>
					<button
						disabled
						aria-disabled='true'
						aria-describedby='ticket-status'
						className='inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white bg-pallet-primary uppercase rounded-md disabled:cursor-not-allowed md:flex-row md:w-max focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50'
					>
						<EnterArrow className='hidden md:block' aria-hidden='true' />
						Consigue tu Ticket
						<span
							id='ticket-status'
							className='w-full px-2 py-1 text-xs bg-black/40 md:w-auto'
							role='status'
						>
							Próximamente
						</span>
					</button>
				</div>
			</div>
		</section>
	)
}
