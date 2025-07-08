'use client'
import { useEffect, useId, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DiscordIcon } from './icons/discord'
import { HorizontalEllipses } from './icons/horizontal-ellipses'
import { CrossIcon } from './icons/cross'

export function Header() {
	return (
		<header className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-8 py-4 animate-fade-in-down font-geist animation-header'>
			<Title />
			<Navbar />
			<DiscordLink />
		</header>
	)
}

function Title() {
	return (
		<h1 className='flex items-center text-2xl font-extrabold text-white'>
			MIDU.<span className='text-pallet-primary'>CONF</span>
			<span className='px-1 py-1 ml-1 text-xs leading-none border text-pallet-primary border-pallet-primary'>
				25
			</span>
		</h1>
	)
}

function Navbar() {
	const currentHash = useCurrentHashOnLink()
	const [isOpen, setIsOpen] = useState(false)
	const navbarId = useId()

	const toggleMenu = () => setIsOpen(!isOpen)

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<nav>
			<button
				onClick={toggleMenu}
				className={cn(
					'z-50 w-auto p-2 text-white border rounded border-pallet-border-foreground aspect-square bg-pallet-background md:hidden',
					'focus:outline focus:outline-white focus:border-pallet-ghost'
				)}
				aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
				aria-controls={navbarId}
				aria-expanded={isOpen}
			>
				{isOpen ? (
					<CrossIcon className='w-4 h-auto' />
				) : (
					<HorizontalEllipses className='w-4 h-auto' />
				)}
			</button>
			<ul
				id={navbarId}
				className={cn(
					'flex flex-col gap-x-2 gap-y-4 pb-20 pr-4 items-end text-white w-full h-dvh absolute left-0 top-0 -z-10 justify-end text-2xl translate-x-full transition bg-transparent',
					'md:flex-row md:items-center md:mt-0 md:z-0 md:relative md:translate-x-0 md:justify-start md:h-auto md:pb-0 md:pr-0 md:text-base',
					isOpen ? 'flex translate-x-0 bg-pallet-background' : 'md:flex',
					'md:flex'
				)}
			>
				{NAV_ITEMS.map(({ href, title }) => {
					return (
						<li key={href}>
							<Link
								href={href}
								onClick={() => setIsOpen(false)}
								className={cn(
									'px-2.5 py-2 border rounded-md border-transparent hover:border-pallet-primary hover:text-pallet-primary transition uppercase',
									'focus-visible:text-pallet-primary focus-visible:border-pallet-primary focus-visible:outline-none focus-visible:outline focus-visible:outline-white',
									currentHash === href && 'bg-pallet-primary border-pallet-primary',
									currentHash === href && 'hover:text-white',
									currentHash === href &&
										'focus-visible:text-white focus-visible:border-white focus-visible:outline focus-visible:outline-white'
								)}
							>
								{title}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

function DiscordLink() {
	return (
		<Link
			href='https://discord.gg/midudev'
			target='_blank'
			rel='noopener noreferrer'
			className={cn(
				'hidden md:inline-flex items-center gap-2 px-4 py-2 text-white uppercase border rounded-md border-pallet-border-foreground',
				'hover:bg-pallet-border-foreground hover:border-pallet-ghost transition',
				'focus-visible:outline focus-visible:outline-white focus-visible:bg-pallet-border-foreground focus-visible:border-pallet-ghost'
			)}
		>
			<DiscordIcon className='w-5 h-auto' />
			<span>Discord</span>
		</Link>
	)
}

function useCurrentHashOnLink() {
	const { asPath: currentPath } = useRouter()
	return currentPath
}

const NAV_ITEMS = [
	{
		href: '/#speakers',
		title: 'Speakers'
	},
	{
		href: '/#sponsors',
		title: 'Patrocinadores'
	},
	{
		href: '/#agenda',
		title: 'Agenda'
	},
	{
		href: '/#faqs',
		title: 'FAQS'
	}
]
