import { Button } from '@/components/Button'
import { SponsorIcons } from '@/components/icons/sponsors'
import { cn } from '@/lib/utils'

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
			className={cn(
				size === 'large' ? 'min-w-[250px] px-12 w-full' : 'w-[200px] px-4 inline-block',
				'relative flex justify-center items-center overflow-hidden rounded-xl py-8 group  transition-all',
				'before:w-full before:h-[1px] before:bottom-0 before:left-0 before:absolute before:bg-gradient-to-r before:from-transparent before:via-pallet-primary before:to-transparent before:scale-x-0 hover:before:scale-x-100 before:transition-all before:opacity-0 hover:before:opacity-100 before:duration-500',
				'after:w-full after:h-1/2 after:rounded-[50%] after:left-0 after:bottom-0 after:absolute after:-z-10 after:bg-[radial-gradient(#0099FF_0%,transparent_80%)] after:opacity-0 after:blur-lg hover:after:opacity-50 after:transition-all after:duration-500 after:translate-y-full hover:after:translate-y-1/2',
				className
			)}
		>
			<div className='flex flex-col items-center justify-center w-full gap-4 text-white transition duration-300 h-max group-hover:-translate-y-1'>
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
			</div>
		</a>
	)
}

export const Sponsors = () => {
	return (
		<section
			id='sponsors'
			className='flex flex-col flex-wrap items-center justify-center px-4 pt-32'
		>
			<h2 className='text-4xl font-bold text-center text-white md:text-6xl'>Patrocinadores</h2>
			<p className='max-w-xl text-xl text-white/80 text-center [text-wrap:balance] mt-4'>
				¡Gracias a ellos hacemos posible el evento!
			</p>

			<div className='relative flex flex-col items-center justify-center w-full h-full gap-4 py-20 overflow-hidden rounded-lg max-w-screen-base bg-background'>
				<h3 className='text-3xl font-bold text-center text-white'>Premium</h3>
				<div className='grid gap-4 md:flex md:flex-wrap md:justify-center md:grid-cols-2 lg:grid-cols-2'>
					{premiums.map((premium) => (
						<ReviewCard className='max-w-80' key={premium.name} {...premium} size='large' />
					))}
				</div>

				<h3 className='mt-8 text-3xl font-bold text-center text-white'>Gold</h3>
				<div className='flex flex-row flex-wrap justify-center'>
					{sponsors.map((sponsor) => (
						<ReviewCard key={sponsor.name} className='py-4' {...sponsor} />
					))}
				</div>

				<div className='relative flex flex-col w-full overflow-hidden gap-y-4'>
					<div className='absolute inset-y-0 left-0 w-40 pointer-events-none from-[#000214] to-transparent bg-gradient-to-r '></div>
					<div className='absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-[#000214]'></div>
				</div>
			</div>

			<Button
				as='a'
				href='mailto:miduga@gmail.com'
				className='px-4 py-3 text-lg font-bold md:text-xl rounded-xl'
			>
				Convertirse en Patrocinador ✨
			</Button>
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
		logo: <SponsorIcons.scrimba className='w-auto h-12 max-w-full text-white' />,
		slogan: 'Aprende programación de forma interactiva'
	},
	{
		name: 'Strapi',
		link: 'https://strapi.io/',
		logo: <SponsorIcons.strapi className='w-auto h-8 max-w-full text-white' />,
		slogan: 'Headless CMS de código abierto en Node.js'
	}
]
