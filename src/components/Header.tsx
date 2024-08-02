'use client'

import { MiduLogo } from '@/components/logos/midudev'
import { NavbarIcons } from '@/components/icons'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)
	return (
		<header className='header-animate w-full mb-10 overflow-hidden z-[99999] py-8'>
			<div className='grid items-center justify-center md:justify-normal w-full grid-cols-[auto_1fr] mx-auto text-white gap-x-10 md:flex max-w-screen-base'>
				<a
					href='/'
					className='ml-4 transition-transform duration-300 hover:scale-125'
					title='Ir a la página principal'
					aria-label='Ir a la página principal'
				>
					<MiduLogo className='w-10 h-12' />
				</a>
				<nav
					id='navbar'
					className={cn(
						'col-span-full overflow-x-auto row-[2/3] grid md:block grid-rows-[0fr] transition-[grid-template-rows] ',
						{
							'grid-rows-[1fr]': isNavbarOpen
						}
					)}
				>
					<ul className='flex flex-col items-center overflow-x-auto overflow-y-hidden md:overflow-hidden md:flex-row'>
						{NAV_ITEMS.map(({ Icon, href, title }, index) => (
							<li
								key={index}
								className='flex justify-center w-full first:mt-5 md:first:mt-0 md:block md:w-auto'
							>
								<a
									href={href}
									className='flex items-center justify-center w-full gap-1 px-5 py-4 text-xl duration-300 md:w-auto md:py-2 md:text-base hover:scale-110'
								>
									<Icon />
									{title}
								</a>
							</li>
						))}
					</ul>
				</nav>
				<div className='flex items-center gap-4 mr-4 md:ml-auto'>
					<Button
						as='a'
						href='https://discord.gg/midudev'
						className='ml-auto font-medium'
						title='Únete al Discord de la comunidad'
						aria-label='Únete al Discord de la comunidad'
					>
						<NavbarIcons.DiscordLogo />
						Discord
					</Button>
					<button
						className='flex items-center justify-center py-2 md:hidden'
						onClick={() => setIsNavbarOpen(!isNavbarOpen)}
						aria-expanded='false'
						aria-controls='navbar'
						title='Mostrar Menú'
						aria-label='Mostrar menú'
					>
						<div className='flex items-center justify-center p-2 cursor-pointer group'>
							<div className='space-y-2'>
								<span
									className={cn(
										'block h-1 w-8 origin-center rounded-full bg-white/60 transition-transform ease-in-out',
										{ 'translate-y-1.5 rotate-45': isNavbarOpen }
									)}
								></span>
								<span
									className={cn(
										'block h-1 w-8 origin-center rounded-full bg-white/60 transition-transform ease-in-out',
										{
											'w-8 -translate-y-1.5 -rotate-45': isNavbarOpen
										}
									)}
								></span>
							</div>
						</div>
					</button>
				</div>
			</div>
		</header>
	)
}

const NAV_ITEMS = [
	{
		href: '#speakers',
		title: 'Speakers',
		Icon: NavbarIcons.SpeakersIcon
	},
	{
		href: '#sponsors',
		title: 'Patrocinadores',
		Icon: NavbarIcons.SponsorsIcon
	},
	{
		href: '#regalos',
		title: 'Regalos',
		Icon: NavbarIcons.GiftIcon
	},
	{
		href: '#agenda',
		title: 'Agenda',
		Icon: NavbarIcons.ScheduleIcon
	}
]
