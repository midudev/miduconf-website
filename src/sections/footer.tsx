'use client'
import { CallToAction } from '@/components/CallToAction'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { ShareLink } from '@/components/ShareLink'

export function Footer() {
	return (
		<section className='footer relative z-[5]'>
			<footer className='grid items-start space-y-spacing-32 md:space-y-0 md:gap-y-spacing-32 px-5 pt-spacing-32 md:pt-spacing-40 lg:pt-spacing-64 md:grid-cols-2 lg:grid-cols-3 pointer-events-auto'>
				<article className='flex gap-2 md:mr-auto'>
					<h3 className='text-xl-code text-palette-ghost'>Sitemap: </h3>
					<ul className='flex flex-col gap-2 -translate-y-[6px] lg:-translate-y-[8px]'>
						{SITEMAP_LINKS.map(({ href, title }) => (
							<ShareLink key={href} href={href} title={title} />
						))}
					</ul>
				</article>
				<article className='flex gap-4 md:ml-auto lg:mr-auto'>
					<h3 className='text-xl-code text-palette-ghost'>Descubre: </h3>
					<ul className='flex flex-col gap-2 -translate-y-[6px] lg:-translate-y-[8px]'>
						{SHARE_LINKS.map(({ href, title }) => (
							<ShareLink key={href} href={href} title={title} />
						))}
					</ul>
				</article>
				<CallToAction
					className='mx-auto flex justify-center w-full lg:mr-0 lg:ml-auto md:col-start-1 md:-col-end-1 lg:col-start-auto lg:col-end-auto lg:w-auto'
					text='Conoce mi academia'
					href='https://midu.dev/'
					IconComponent={(props) => <EnterArrow {...props} className="" />}
					estilo='default'
					/>
			</footer>
			<small className='block px-5 pb-5 pt-spacing-40 uppercase text-palette-ghost text-small-code'>
				Todos los derechos reservados © {new Date().getFullYear()} MiduConf
			</small>
		</section>
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
