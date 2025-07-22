import { Button } from '@/components/Button'
import { Countdown } from '@/components/Countdown'
import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'
import { MiduLogo3D } from '@/components/experience/MiduLogo3D'

export function Hero() {
	return (
		<section
			className='min-h-screen bg-center relative border-b border-pallet-primary/20 flex flex-col md:block'
			role='banner'
			aria-labelledby='hero-title'
		>
			<div className='absolute inset-0'>
				<MiduLogo3D />
			</div>

			<div className='relative py-8 z-10 flex-1 flex flex-col items-center justify-start md:justify-between md:items-end md:flex-row w-full px-8 gap-y-4 bg-gradient-to-t from-black md:bg-none animate-fade-in-up md:absolute md:bottom-0 md:left-0'>
				<div className='flex flex-col items-center md:items-start'>
					<Countdown className='mb-4' />
					<h1
						id='hero-title'
						className='text-4xl text-center md:text-left md:text-6xl uppercase leading-normal font-medium max-w-[24ch] text-white text-balance'
					>
						La nueva era de la Programación
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
					<Button disabled aria-disabled>
						<EnterArrow className='hidden md:block' />
						Consigue tu Ticket
						<span className='w-full px-2 py-1 text-xs bg-black/40 md:w-auto'>Próximamente</span>
					</Button>
				</div>
			</div>
		</section>
	)
}
