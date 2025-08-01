'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DiscordIcon } from './icons/discord'
import { Miduconf } from './icons/miduconf'
import { Midudev } from './icons/midudev'
import { Burger } from './icons/burger'
import { CallToAction } from './CallToAction'
import { gsap } from 'gsap'

export function Header() {
	return (
		<header className='fixed pt-5 px-5 z-[9999] flex items-center justify-between w-full animate-fade-in-down font-geist animation-header'>
			<Title />
			<Navbar />
		</header>
	)
}

function Title() {
	return (
		<>
			<Link href='/' className='relative z-20 flex items-center text-palette-default'>
				<Midudev className='size-[42px] block lg:hidden' />
				<Miduconf className='hidden lg:block' />
			</Link>
		</>
	)
}

function Navbar() {
	const currentHash = useCurrentHashOnLink()
	const [isOpen, setIsOpen] = useState(false)
	const navbarId = useId()
	const refButton = useRef<HTMLButtonElement>(null)
	const refNavbarList = useRef<HTMLUListElement>(null)

	function toggleNavbar(open: boolean) {
		let tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.5, stagger: 0.05 } })
		const burgerRect = refButton.current?.querySelectorAll<SVGRectElement>('svg rect')
		const navbarList = refNavbarList.current
		const navbarItems = navbarList?.querySelectorAll('.navbar-item')

		if (!burgerRect || !navbarList || !navbarItems) return

		tl.clear()

		if (open) {
			tl.to(burgerRect[0], {
				y: 5,
				rotation: -45,
				transformOrigin: '50% center'
			})
				.to(
					burgerRect[1],
					{
						y: -5,
						rotation: 45,
						transformOrigin: '55% 55%'
					},
					'<'
				)
				.to(
					navbarList,
					{
						clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)'
					},
					'-=0.4'
				)
				.to(
					navbarItems,
					{
						x: 0,
						opacity: 1,
						ease: 'elastic.out(1, 0.75)'
					},
					'-=0.2'
				)
		} else {
			tl.to(navbarItems, {
				x: 100,
				opacity: 0,
				ease: 'elastic.out(1, 0.75)'
			})
				.to(
					navbarList,
					{
						clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
					},
					'-=0.4'
				)
				.to(
					burgerRect[0],
					{
						y: 0,
						rotation: 0
					},
					'<'
				)
				.to(
					burgerRect[1],
					{
						y: 0,
						rotation: 0
					},
					'<'
				)
		}
	}

	const toggleMenu = () =>
		setIsOpen((prev) => {
			const newState = !prev
			toggleNavbar(newState)
			return newState
		})

	const handleItemClick = () => {
		if (window.innerWidth < 1024) {
			setIsOpen(false)
			toggleNavbar(false)
		}
	}

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''

		const handleResize = () => {
			if (window.innerWidth >= 1024 && refNavbarList.current) {
				gsap.set(refNavbarList.current, { clearProps: 'all' })
				const items = refNavbarList.current.querySelectorAll('.navbar-item')
				items.forEach((item) => {
					gsap.set(item, { clearProps: 'all' })
				})
			}
		}
		window.addEventListener('resize', handleResize)
		handleResize()

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('resize', handleResize)
		}
	}, [isOpen])

	return (
		<>
			<nav>
				<ul className='relative z-20 flex gap-4'>
					<CallToAction
						text='Discord'
						estilo='discord'
						IconComponent={DiscordIcon}
						href='https://discord.gg/midudev'
					/>
					<button
						ref={refButton}
						onClick={toggleMenu}
						className='burguer px-[12px] py-[10px] border border-palette-border-foreground bg-palette-bg-foreground-primary rounded-[5px] flex justify-center items-center lg:hidden cursor-pointer'
					>
						<Burger className='size-5' />
					</button>
				</ul>
				<ul
					id={navbarId}
					ref={refNavbarList}
					className={cn(
						'navbarList clipHidden absolute inset-0 lg:inset-auto h-screen lg:h-auto flex flex-col lg:flex-row justify-end items-end p-5 space-y-8 bg-palette-background lg:top-[28px] lg:bottom-auto pt-[80px] pb-5 lg:clipVisible lg:bg-transparent lg:p-0 lg:left-1/2 lg:-translate-x-1/2 lg:justify-center lg:items-center lg:space-y-0'
					)}
				>
					{NAV_ITEMS.map(({ href, title }) => {
						return (
							<li
								key={href}
								className='text-right transition-colors duration-300 translate-x-full opacity-0 navbar-item lg:translate-x-0 lg:opacity-100'
							>
								<Link
									href={href}
									onClick={handleItemClick}
									className={cn(
										'px-4 py-2 text-2xl lg:text-xl-code',
										'text-2xl font-code inline uppercase overflow-hidden rounded-[5px] relative text-default transition-colors duration-200 navbar-link',
										currentHash === href
											? 'text-palette-default hover:text-palette-default'
											: 'text-palette-ghost hover:text-palette-default',
										currentHash === href &&
										'focus-visible:text-palette-default focus-visible:border-palette-default focus-visible:outline focus-visible:outline-palette-default'
									)}
								>
									{title}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
			<div className='absolute inset-0 invisible w-full h-screen opacity-50 navbar-overlay bg-palette-background z-9'></div>
		</>
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
