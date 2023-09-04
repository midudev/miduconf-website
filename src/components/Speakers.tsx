import { MagicCard } from './magicui/MagicCard'

const SPEAKERS = [
	{
		name: 'Guillermo Rauch',
		title: 'CEO @ Vercel',
		twitter: 'rauchg',
		img: 'rauchg'
	},
	{
		name: 'Javier Santaolalla',
		title: 'Divulgador de ciencia',
		twitter: 'JaSantaolalla',
		img: 'javier'
	},
	{
		name: 'Carmen Ansio',
		title: 'UX Engineer Freelance',
		twitter: 'carmenansio',
		img: 'carmen'
	},
	{
		name: 'David Bonilla',
		title: 'CEO @ Manfred',
		twitter: 'david_bonilla',
		img: 'david'
	},
	{
		name: 'Debbie O\'Brien',
		title: 'DevRel @ Microsoft',
		twitter: 'debs_obrien',
		img: 'debbie'
	},
	{
		name: 'Próximamente...',
		title: '¡Sorpresa!',
		twitter: 'prox',
		img: 'anon'
	}
]

function Speaker ({ name, title, twitter, img }) {
	return (
		<article className='relative flex flex-col items-center justify-center w-full p-[1px] transition-all rounded-md bg-gradient-to-b from-white/20 via-transparent to-transparent hover:via-white/10 group'>
			<div className='bg-[#000214] group-hover:bg-[#000214]/10 w-full px-6 py-10 rounded transition'>
				<figure className='flex items-center justify-center'>
					<img
						className='object-cover w-40 h-40 transition bg-white rounded-full group-hover:scale-110'
						src={`/img/speakers/${img}.jpg`}
						alt={`speaker: ${name}`}
					/>
				</figure>
				<h3 className='mt-4 text-2xl font-bold text-center text-white'>
					<a
						href={`https://twitter.com/${twitter}`}
						target='_blank'
						rel='external noopener nofollow'
					>
						{name}
					</a>
				</h3>
				<p className='text-xl text-center text-sky-200'>{title}</p>
			</div>
		</article>
	)
}

export function Speakers () {
	return (
		<section className='flex flex-col flex-wrap items-center justify-center my-48'>
			<h2 className='text-6xl font-bold text-center text-white'>Speakers</h2>
			<p className='max-w-xl text-xl text-sky-200 text-center [†ext-wrap:balance] mt-4'>
				Los mejores oradores, colaboradores y educadores de la comunidad de programación y
				tecnología.
			</p>
			<div className='grid grid-cols-3 my-16 gap-x-8 gap-y-8'>
				{SPEAKERS.map((speaker) => (
					<Speaker key={speaker.twitter} {...speaker} />
				))}
			</div>
		</section>
	)
}
