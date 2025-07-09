import { DiamondIcon } from '@/components/icons/diamond'
import { DotIcon } from '@/components/icons/dot'
import { cn } from '@/lib/utils'

export function Speakers() {
	return (
		<section id='speakers' className='pt-44'>
			<h2 className='flex items-center justify-center gap-4 mb-8 text-4xl font-bold text-white uppercase'>
				<DotIcon className='text-pallet-primary' /> Speakers{' '}
				<DotIcon className='text-pallet-primary' />
			</h2>
			<p className='mx-auto mb-16 text-xl text-white text-pretty max-w-[42ch] text-center'>
				Creadores y líderes que acercan la tecnología y el código a todos
			</p>
			<ul className='grid justify-center grid-cols-2 px-4 mx-auto gap-x-4 gap-y-4 md:px-0 md:grid-cols-3 md:gap-y-24'>
				{SPEAKERS.map(({ img, name, title }, index) => {
					return (
						<li
							className={cn(
								'max-w-80 w-full mx-auto relative',
								(index - 1) % 3 === 0
									? 'animation-speaker-peer md:translate-y-16'
									: 'animation-speaker',
								(index - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
							)}
						>
							<div className='relative aspect-[9/12] overflow-hidden w-full rounded-md'>
								<img
									src={`/img/speakers/${img}.jpg`}
									className='object-cover w-full h-full'
									alt={`Retrato de ${name}`}
								/>
								<p className='absolute inline-flex items-center gap-2 px-2 py-1 text-sm text-white uppercase border rounded-md md:text-base bg-pallet-b-foreground-primary border-pallet-border-foreground bottom-2 left-2'>
									<DiamondIcon className='w-4 h-auto text-pallet-primary' /> {name}
								</p>
							</div>
							<p className='pl-2 mt-6 uppercase text-pallet-ghost text-balance'>{title}</p>
						</li>
					)
				})}
			</ul>
		</section>
	)
}

const SPEAKERS = [
	{
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
	}
]
