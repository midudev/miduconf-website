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
	},
	{
		name: 'Fernando Rodríguez',
		title: 'Co-Founder @ KeepCoding',
		twitter: 'frr149',
		img: 'fernando-rodriguez',
		country: '🇪🇸'
	}
]

interface Props {
	name: string
	title: string
	twitter?: string
	img: string
	country: string
	instagram?: string
}

function Speaker({ name, title, twitter, img, country, instagram }: Props) {
	return (
		<article className='relative flex flex-col items-center justify-center w-full transition-all bg-[#121226]/50 border border-midu-primary/40 rounded-[20px] group overflow-hidden hover:scale-110'>
			<div className='w-full p-[14px] rounded transition'>
				<figure className='flex items-center justify-center'>
					<img
						className='object-cover w-full aspect-square rounded-[10px]'
						src={`/img/speakers/${img}.jpg`}
						alt={`speaker: ${name}`}
					/>
					<img
						className='absolute opacity-70 transform-gpu blur-lg -z-10 block object-cover w-full aspect-square transition bg-white rounded-[10px]'
						src={`/img/speakers/${img}.jpg`}
						alt={`speaker: ${name}`}
					/>
				</figure>
				<header className='flex items-center justify-between mt-4 gap-x-2'>
					<h3 className='text-[16px] font-bold text-left text-white'>
						<a
							href={
								twitter
									? `https://twitter.com/${twitter}`
									: `https://www.instagram.com/${instagram}`
							}
							target='_blank'
							rel='external noopener nofollow'
						>
							{name}
						</a>
					</h3>
					<a
						className='text-[10px] text-white/60 flex items-center'
						href={
							twitter ? `https://twitter.com/${twitter}` : `https://www.instagram.com/${instagram}`
						}
						target='_blank'
						rel='external noopener nofollow'
					>
						@{twitter ?? instagram}
					</a>
				</header>
				<footer className='flex items-center justify-between gap-x-2'>
					<p className='text-xs text-left text-white/60'>{title}</p>
					<span className='text-white'>{country}</span>
				</footer>
			</div>
		</article>
	)
}

export function Speakers() {
	return (
		<section
			id='speakers'
			className='flex flex-col flex-wrap items-center justify-center max-w-5xl px-4 pt-48 mx-auto'
		>
			<h2 className='text-5xl font-bold text-center text-white'>
				Sobre nuestros <span className='text-blue-600'>speakers</span>
			</h2>
			<p className='px-10 text-[18px] text-white/80 text-center [text-wrap:balance] mt-4'>
				Divulgadores y profesionales de programación y la tecnología.
			</p>
			<div className='grid grid-cols-1 my-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8'>
				{SPEAKERS.map((speaker) => (
					<Speaker key={speaker.name} {...speaker} />
				))}
			</div>
		</section>
	)
}
