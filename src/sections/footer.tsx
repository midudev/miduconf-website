import { Button } from '@/components/Button'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Footer() {
	return (
		<>
			<footer className='grid items-start px-8 pt-10 mt-20 text-lg uppercase border-t text-palette-ghost border-palette-border-foreground md:grid-cols-3 gap-y-4'>
				<article className='flex gap-4'>
					<h3>Sitemap: </h3>
					<ul className='flex flex-col gap-2'>
						{SITEMAP_LINKS.map(({ href, title }) => (
							<li key={href}>
								<Link
									href={href}
									className={cn(
										'text-[#EFF4FF] hover:text-white overflow-hidden inline-flex',
										'relative before:h-0.5 before:w-full before:absolute before:bg-white before:bottom-0 before:left-0 before:-translate-x-full hover:before:translate-x-0 before:transition before:duration-300 focus-visible:before:translate-x-0'
									)}
								>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</article>
				<article className='flex gap-4 md:mx-auto'>
					<h3>Descubre: </h3>
					<ul className='flex flex-col gap-2'>
						{SHARE_LINKS.map(({ href, title }) => (
							<li key={href}>
								<Link
									href={href}
									target='_blank'
									className={cn(
										'text-[#EFF4FF] hover:text-white overflow-hidden inline-flex',
										'relative before:h-0.5 before:w-full before:absolute before:bg-white before:bottom-0 before:left-0 before:-translate-x-full hover:before:translate-x-0 before:transition before:duration-300 focus-visible:before:translate-x-0'
									)}
								>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</article>
				<Button
					as={Link}
					href='https://midu.dev/'
					containerClassName='mx-auto md:ml-auto md:mr-0'
					target='_blank'
				>
					<EnterArrow className='hidden md:block' />
					Conoce mi Academia
				</Button>
			</footer>
			<small className='block px-8 pt-20 pb-4 uppercase text-palette-ghost'>
				Todos los derechos reservados © {new Date().getFullYear()} MiduConf
			</small>
		</>
	)
}

const SITEMAP_LINKS = [
	{
		href: '/#lo-que-puedes-esperar',
		title: 'Lo que puedes esperar'
	},
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

const SHARE_LINKS = [
	{
		href: 'https://x.com/midudev',
		title: 'X'
	},
	{
		href: 'https://www.instagram.com/midu.dev',
		title: 'Instagram'
	},
	{
		href: 'https://www.twitch.tv/midudev',
		title: 'Twitch'
	},
	{
		href: 'https://www.youtube.com/midudev',
		title: 'YouTube'
	},
	{
		href: 'https://www.facebook.com/midudev.frontend',
		title: 'Facebook'
	},
	{
		href: 'https://www.tiktok.com/@midudev',
		title: 'TikTok'
	},
	{
		href: 'https://www.linkedin.com/in/midudev',
		title: 'LinkedIn'
	}
]
