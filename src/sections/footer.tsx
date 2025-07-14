import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'

export function Footer() {
	return (
		<>
			<footer className='grid items-start px-8 pt-10 mt-20 text-lg uppercase border-t text-pallet-ghost border-pallet-border-foreground md:grid-cols-3 gap-y-4'>
				<article className='flex gap-4'>
					<h3>Sitemap: </h3>
					<ul className='flex flex-col gap-2'>
						{SITEMAP_LINKS.map(({ href, title }) => (
							<li key={href}>
								<Link href={href} className='text-[#EFF4FF] underline hover:text-white'>
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
								<Link href={href} target='_blank' className='text-[#EFF4FF] hover:text-white'>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</article>
				<Link
					href='https://midu.dev/'
					className='inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white bg-pallet-primary uppercase rounded-md md:flex-row md:w-max mx-auto md:ml-auto md:mr-0'
					target='_blank'
				>
					<EnterArrow className='hidden md:block' />
					Conoce mi Academia
				</Link>
			</footer>
			<small className='block px-8 pt-20 pb-4 uppercase text-pallet-ghost'>
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
