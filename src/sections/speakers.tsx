import { DiamondIcon } from '@/components/icons/diamond'
import { DotIcon } from '@/components/icons/dot'
import { cn } from '@/lib/utils'

export function Speakers() {
	return (
		<section id='speakers' className='pt-44'>
			<h2 className='flex items-center justify-center gap-4 mb-8 text-4xl font-bold text-white uppercase'>
				<DotIcon className='text-palette-primary' /> Speakers{' '}
				<DotIcon className='text-palette-primary' />
			</h2>
			<p className='mx-auto mb-16 text-xl text-white text-pretty max-w-[42ch] text-center'>
				Creadores y líderes que acercan la tecnología y el código a todos
			</p>
			<div className='relative'>
				<ul
					className={cn(
						'grid justify-center grid-cols-2 px-4 mx-auto gap-x-4 gap-y-4 md:px-0 md:grid-cols-3 md:gap-y-24',
						SPEAKERS.length === 0 && '[mask-image:linear-gradient(to_bottom,#000,_transparent)]'
					)}
				>
					{SPEAKERS.length > 0 &&
						SPEAKERS.map(({ img, name, title, isPlaceholder }, index) => {
							return (
								<li
									key={`${name}-${index}`}
									className={cn(
										'max-w-80 w-full mx-auto relative',
										(index - 1) % 3 === 0
											? 'animation-speaker-peer md:translate-y-16'
											: 'animation-speaker',
										(index - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0',
										isPlaceholder && 'blur'
									)}
								>
									<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md'>
										<img
											src={`/speakers/${img}.webp`}
											className='object-cover w-full h-full'
											alt={`Retrato de ${name}`}
										/>
										<p className='absolute inline-flex items-center gap-2 px-2 py-1 mr-2 text-xs text-white uppercase border rounded-md md:text-base bg-palette-bg-foreground-primary border-palette-border-foreground bottom-2 left-2'>
											<DiamondIcon className='w-3 h-auto md:w-4 text-palette-primary' /> {name}
										</p>
									</div>
									<p className='pl-2 mt-2 text-xs uppercase md:mt-6 text-palette-ghost text-balance md:text-base'>
										{title}
									</p>
								</li>
							)
						})}
					<li
						className={cn(
							'max-w-80 w-full mx-auto relative block md:hidden',
							(SPEAKERS.length - 1) % 3 === 0
								? 'animation-speaker-peer md:translate-y-16'
								: 'animation-speaker',
							(SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
						)}
					>
						<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'>
							<p className='text-xs md:text-xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center md:gap-2 z-10'>
								<DiamondIcon className='w-4 h-auto md:w-8' />
								¡Muy pronto revelaremos más speakers!
								<DiamondIcon className='w-4 h-auto md:w-8' />
							</p>
						</div>
					</li>
				</ul>
				<div className='relative hidden md:block'>
					<p className='text-4xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center gap-2 z-10'>
						<DiamondIcon className='w-8 h-auto' />
						¡Muy pronto revelaremos más Speakers!
						<DiamondIcon className='w-8 h-auto' />
					</p>
					<ul className='grid justify-center grid-cols-2 px-4 mx-auto gap-x-4 gap-y-4 md:px-0 md:grid-cols-3 md:gap-y-24 [mask-image:linear-gradient(to_bottom,#000,_transparent)]'>
						<li
							className={cn(
								'max-w-80 w-full mx-auto relative',
								(SPEAKERS.length - 1) % 3 === 0
									? 'animation-speaker-peer md:translate-y-16'
									: 'animation-speaker',
								(SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
							)}
						>
							<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
						</li>
						<li
							className={cn(
								'max-w-80 w-full mx-auto relative',
								(SPEAKERS.length - 1) % 3 !== 0
									? 'animation-speaker-peer md:translate-y-16'
									: 'animation-speaker',
								(SPEAKERS.length - 1) % 2 !== 0 && 'translate-y-16 md:translate-y-0'
							)}
						>
							<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
						</li>
						<li
							className={cn(
								'max-w-80 w-full mx-auto relative',
								(SPEAKERS.length - 1) % 3 === 0
									? 'animation-speaker-peer md:translate-y-16'
									: 'animation-speaker',
								(SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
							)}
						>
							<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}

const SPEAKERS = [
	{
		name: 'Miguel Ángel Durán',
		title: 'Creador de contenido y divulgador @ midudev',
		twitter: 'midudev',
		img: 'midudev',
		isPlaceholder: false
	},
	{
		name: 'Guillermo Rauch',
		title: 'CEO @ Vercel',
		twitter: 'rauchg',
		img: 'guillermo-rauch',
		isPlaceholder: false
	},
	{
		name: 'Darwinglish',
		title: 'Darwinglish @ Inglés para Devs',
		twitter: 'darwinglish',
		img: 'darwinglish',
		isPlaceholder: false
	}
	/* {
		name: 'Guillermo Rauch',
		title: 'CEO @ Vercel',
		twitter: 'rauchg',
		img: 'rauchg',
		country: '🇦🇷'
	},
	{
		name: 'Carmen Ansio',
		title: 'Design Engineer @ LottieFiles',
		twitter: 'carmenansio',
		img: 'carmen',
		country: '🇪🇸'
	},
	{
		name: 'DotCSV',
		title: 'Divulgador de IA',
		twitter: 'dotcsv',
		img: 'dotcsv',
		country: '🇮🇨'
	},
	{
		name: 'Alba Silvente',
		title: 'FullStack @ StoryBlok',
		twitter: 'dawntraoz',
		img: 'dawntraoz',
		country: '🇪🇸'
	},
	{
		name: 'Pelado Nerd',
		title: 'Divulgador DevOps',
		twitter: 'pablokbs',
		img: 'pablokbs',
		country: '🇦🇷'
	},
	{
		name: 'Fazt',
		title: 'Creador de contenido',
		twitter: 'FaztTech',
		img: 'fazt',
		country: '🇵🇪'
	},
	{
		name: 'Estefany Aguilar',
		title: 'Sr. Frontend Dev @ Platzi',
		twitter: 'teffcode',
		img: 'teffcode',
		country: '🇨🇴'
	},
	{
		name: 'S4vitar',
		title: 'Hack4u CEO & Founder',
		twitter: 's4vitar',
		img: 's4vitar',
		country: '🇪🇸'
	},
	{
		name: 'Freddy Vega',
		title: 'CEO @ Platzi',
		twitter: 'freddier',
		img: 'freddyVega',
		country: '🇨🇴'
	},
	{
		name: 'PatoDev',
		title: 'Media Developer @ Cloudinary',
		twitter: 'devpato',
		img: 'patoDev',
		country: '🇺🇸'
	},
	{
		name: 'Grimerloner',
		title: 'Músico y Productor',
		instagram: 'grimerloner',
		img: 'grimerloner',
		country: '🇪🇸'
	},
	{
		name: 'Fernando Rodríguez',
		title: 'Co-Founder @ KeepCoding',
		twitter: 'frr149',
		img: 'fernando-rodriguez',
		country: '🇪🇸'
	},
	{
		name: 'Javier Ferrer',
		title: 'Co-Founder @ Codely',
		twitter: 'CodelyTV',
		img: 'javi',
		country: '🇪🇸'
	},
	{
		name: 'Rafa Gomez',
		title: 'Co-Founder @ Codely',
		twitter: 'CodelyTV',
		img: 'rafa',
		country: '🇪🇸'
	} */
]

const FAKE_SPEAKERS = [
	{
		name: 'Nadie Sabe',
		title: 'Quien es el/ella',
		twitter: 'notiene',
		fakeImg: '/speakers/speaker-01.webp',
		country: '🇪🇸'
	},
	{
		name: 'Nadie Sabe',
		title: 'Quien es el/ella',
		twitter: 'notiene',
		fakeImg: '/speakers/speaker-02.webp',
		country: '🇪🇸'
	},
	{
		name: 'Nadie Sabe',
		title: 'Quien es el/ella',
		twitter: 'notiene',
		fakeImg: '/speakers/speaker-03.webp',
		country: '🇪🇸'
	}
]
