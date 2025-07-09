import { Button } from '@/components/Button'
import { DotIcon } from '@/components/icons/dot'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { SponsorIcons } from '@/components/icons/sponsors'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ReviewCard = ({
	logo,
	link,
	size,
	slogan,
	className = ''
}: {
	logo?: JSX.Element
	link: string
	size?: string
	slogan: string
	className?: string
}) => {
	return (
		<a
			href={link}
			target='_blank'
			rel='noopener noreferrer'
			className='flex flex-col items-center justify-center gap-4 border rounded-md min-h-60 bg-pallet-b-foreground-primary border-pallet-border-foreground'
		>
			<figure className={`${size === 'large' ? 'h-12' : 'h-8'} flex items-center justify-center`}>
				{logo}
			</figure>
			<p
				className={`${
					size === 'large' ? 'text-base' : 'text-sm'
				} text-center text-white/60 max-w-[20ch] text-balance leading-tight font-light`}
			>
				{slogan}
			</p>
		</a>
	)
}

export const Sponsors = () => {
	return (
		<section id='sponsors' className='pt-44 grid grid-cols-[1fr_auto] px-4 gap-8'>
			<header className='flex flex-col gap-2 max-w-80 col-[2/3] row-[1/2]'>
				<h2 className='flex items-center justify-center gap-4 text-4xl font-bold text-white uppercase'>
					<DotIcon className='text-pallet-primary' /> Sponsors{' '}
					<DotIcon className='text-pallet-primary' />
				</h2>
				<p className='mx-auto text-xl text-white text-pretty max-w-[42ch] text-center'>
					Gracias a ellos hacemos posible el evento
				</p>
				<Link
					href='mailto:miduga@gmail.com'
					className='w-full flex mt-4 flex-col items-center gap-x-2 py-2.5 px-4 text-base text-white bg-pallet-primary uppercase rounded-md disabled:cursor-not-allowed md:flex-row justify-center'
				>
					<EnterArrow className='hidden w-auto h-3 md:block' />
					Ser Patrocinador
				</Link>
			</header>

			<div className='col-[1/2] row-[1/2]'>
				<h3 className='mb-10 text-2xl font-bold text-white'>Premium</h3>
				<div className='grid grid-cols-2 gap-5'>
					{premiums.map((premium) => (
						<ReviewCard className='max-w-80' key={premium.name} {...premium} size='large' />
					))}
				</div>

				<h3 className='mt-12 mb-10 text-2xl font-bold text-white'>Gold</h3>
				<div className='grid grid-cols-2 gap-5'>
					{sponsors.map((sponsor) => (
						<ReviewCard key={sponsor.name} className='py-4' {...sponsor} />
					))}
				</div>
			</div>
		</section>
	)
}

export const premiums = [
	{
		name: 'Platzi',
		link: 'https://platzi.com/',
		logo: <SponsorIcons.platzi className='w-auto h-12' />,
		slogan: 'Plataforma de aprendizaje profesional online'
	},
	{
		name: 'Don Dominio',
		link: 'https://midu.link/dondominio',
		logo: <SponsorIcons.donDominio className='w-full h-8' />,
		slogan: 'Registro de dominios, hosting, correo y SSL'
	},
	{
		name: 'LemonCode',
		link: 'https://midu.link/lemoncode',
		logo: <SponsorIcons.lemonCodeVertical className='w-auto h-12' />,
		slogan: 'Formaciones con los mejores profesionales'
	},
	{
		name: 'KeepCoding',
		link: 'https://midu.link/keepcoding',
		logo: <SponsorIcons.keepCoding className='object-contain w-full h-12' />,
		slogan: 'Los Mejores Bootcamps Online'
	},
	{
		name: 'Malt',
		link: 'https://malt.es/',
		logo: <SponsorIcons.malt className='w-auto h-12' />,
		slogan: 'Encuentra y contrata a los mejores freelancers en Malt'
	}
]

export const sponsors = [
	{
		name: 'InfoJobs',
		link: 'https://midu.link/infojobs',
		logo: <SponsorIcons.infoJobs className='w-auto h-8 max-w-full text-white' />,
		slogan: '¿La de trabajar, te la sabes?'
	},
	{
		name: 'Cloudinary',
		link: 'https://cloudinary.com/',
		logo: <SponsorIcons.cloudinary className='w-auto h-12 max-w-full text-white' />,
		slogan: 'La mejor plataforma para tus imágenes'
	},
	{
		name: 'Codely',
		link: 'https://codely.com/pro/midudev',
		logo: <SponsorIcons.codely className='w-auto h-12 max-w-full text-white' />,
		slogan: 'Codely enseña y entretiene'
	},
	{
		name: 'Scrimba',
		link: 'https://v2.scrimba.com/home',
		logo: <SponsorIcons.scrimba className='w-auto h-6 max-w-full text-white' />,
		slogan: 'Aprende programación de forma interactiva'
	},
	{
		name: 'Strapi',
		link: 'https://strapi.io/',
		logo: <SponsorIcons.strapi className='w-auto h-8 max-w-full text-white' />,
		slogan: 'Headless CMS de código abierto en Node.js'
	}
]
