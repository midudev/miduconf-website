import { useEffect, useState } from 'react'
import { DotIcon } from '@/components/icons/dot'
import { DiamondIcon } from '@/components/icons/diamond'
import { cn } from '@/lib/utils'

export const Agenda = () => {
	const timezone = useGetTimezone()
	const [currentIndexHovered, setCurrentIndexHovered] = useState(0)

	const handleChangeImage = (index: number) => {
		setCurrentIndexHovered(index)
	}

	return (
		<section id='agenda' className='pt-44'>
			<h2 className='flex items-center justify-center gap-4 mb-8 text-4xl font-bold text-white uppercase'>
				<DotIcon className='text-pallet-primary' /> Agenda{' '}
				<DotIcon className='text-pallet-primary' />
			</h2>
			<p className='mx-auto text-xl text-white text-pretty max-w-[42ch] text-center mb-4'>
				Todas las charlas en directo y español
			</p>
			<p className='flex flex-col items-center px-4 py-2 mx-auto uppercase border rounded-md md:flex-row text-pallet-ghost w-max bg-pallet-b-foreground-primary border-pallet-border-foreground'>
				<span className='flex items-center'>
					<DiamondIcon className='w-3 h-3 mr-3 text-pallet-primary' />
					Hora zona local:
				</span>
				<span className='ml-2 text-white'>{timezone}</span>
			</p>
			<div className='grid md:grid-cols-[1fr_auto] gap-8 mt-20 md:px-8 px-4'>
				<article>
					<div className='hidden grid-cols-3 mb-3 text-xl uppercase md:grid text-pallet-ghost'>
						<span>Hora</span>
						<span>Nombre</span>
						<span>Charla</span>
					</div>
					<ul>
						{LIST_OF_TALKS_NEW.map((props, i) => {
							return (
								<AgendaItem
									key={`${props.speaker.name}-${i}`}
									{...props}
									index={i}
									onHover={handleChangeImage}
								/>
							)
						})}
					</ul>
				</article>
				<div className='relative items-start justify-center hidden md:flex'>
					<img
						className='max-w-60 rounded-md w-full aspect-[9/12] object-cover sticky top-20'
						src={LIST_OF_TALKS_NEW[currentIndexHovered].speaker.imgUrl}
						alt={`Avatar del Speaker ${LIST_OF_TALKS_NEW[currentIndexHovered].title}`}
					/>
				</div>
			</div>

			{/* <p className='text-4xl text-wrap mt-10 font-semibold text-center max-w-[24ch] text-pallet-primary mx-auto px-4'>
				¡Muy pronto revelaremos la agenda!
			</p> */}
		</section>
	)
}

interface AgendaItemProps {
	speaker: {
		name: string
		description: string
		imgUrl: string
	}
	title: string
	startAt: number
	durationInMinutes: number
	onHover: (index: number) => void
	index: number
}

const AgendaItem = ({
	startAt,
	durationInMinutes,
	title,
	speaker,
	onHover,
	index
}: AgendaItemProps) => {
	const time = useTime({ timestamp: startAt, durationInMinutes })

	return (
		<li
			onMouseEnter={() => onHover(index)}
			className={cn(
				'flex flex-col px-4 md:px-0 md:grid grid-cols-3 py-6 text-xl uppercase border-b text-pallet-ghost border-pallet-border-foreground min-h-32 relative cursor-crosshair overflow-hidden group',
				'before:w-full before:h-full before:absolute before:block before:bg-transparent before:-z-10 before:top-0 before:left-0 before:translate-y-full before:transition before:duration-300',
				'md:hover:before:translate-y-0 md:hover:text-white md:hover:before:bg-pallet-primary'
			)}
		>
			<p className='transition md:group-hover:translate-x-4'>
				{time?.startAt} - {time?.endAt}
			</p>
			<p>{speaker.name}</p>
			<p className='text-2xl normal-case text-balance'>{speaker.description}</p>
		</li>
	)
}

type TimeHook = (props: { timestamp: number; durationInMinutes: number }) => null | {
	startAt: string
	endAt: string
}

const useTime: TimeHook = ({ timestamp, durationInMinutes }) => {
	const [time, setTime] = useState(null)

	if (!timestamp) return null

	useEffect(() => {
		// get HH:MM in the local user timezone
		const timeFormatConfig = {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		} as Intl.DateTimeFormatOptions

		const durationInMs = durationInMinutes * 60 * 1000

		const startAt = new Date(timestamp).toLocaleTimeString([], timeFormatConfig)
		const endAt = new Date(timestamp + durationInMs).toLocaleTimeString([], timeFormatConfig)

		// setTime(`${localTime} - ${endTime}`)
		setTime({
			startAt,
			endAt
		})
	}, [])

	return time
}

export const useGetTimezone = () => {
	const [timezone, setTimezone] = useState(null)

	useEffect(() => {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
		setTimezone(timezone)
	}, [])

	return timezone
}

const LIST_OF_TALKS_NEW = [
	{
		speaker: {
			name: 'Grimer Loner',
			description: 'Músico y Productor',
			imgUrl: '/img/speakers/grimerloner.jpg'
		},
		title: '¡Cuenta atrás con Grimer!',
		startAt: 1726152000000,
		durationInMinutes: 20
	},
	{
		speaker: {
			name: 'Miguel Ángel Durán',
			description: 'Creador de contenido y divulgador',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Bienvenidos a la miduConf! + Sorteo',
		startAt: 1726153200000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'Javi y Rafa de Codely',
			description: 'CodelyTV',
			imgUrl: '/img/speakers/codely-agenda.jpg'
		},
		title: 'Charla con Codely + Sorteo',
		startAt: 1726153500000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Guillermo Rauch',
			description: 'CEO de Vercel',
			imgUrl: '/img/speakers/rauchg.jpg'
		},
		title: 'Q&A con Guillermo Rauch',
		startAt: 1726154100000,
		durationInMinutes: 30
	},
	{
		speaker: {
			name: 'Fernando Rodríguez',
			description: 'Co-Founder de KeepCoding',
			imgUrl: '/img/speakers/fernando-rodriguez.jpg'
		},
		title: 'Del caos al orden: 5 virtudes para un código imbatible',
		startAt: 1726155900000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Miguel Ángel Durán',
			description: 'Creador de contenido y divulgador',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡SORPRESA! Notición para 2025...',
		startAt: 1726156500000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'Freddy Vega',
			description: 'CEO de Platzi',
			imgUrl: '/img/speakers/freddyVega.jpg'
		},
		title: 'Charla con Freddy Vega + Sorteo Platzi',
		startAt: 1726156800000,
		durationInMinutes: 30
	},
	{
		speaker: {
			name: 'S4vitar',
			description: 'Hack4u CEO & Founder',
			imgUrl: '/img/speakers/s4vitar.jpg'
		},
		title: 'S4vitar + Sorteo',
		startAt: 1726158900000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Carmen Ansio',
			description: 'Design Engineer en LottieFiles',
			imgUrl: '/img/speakers/carmen.jpg'
		},
		title: 'Animaciones CSS con scroll',
		startAt: 1726159500000,
		durationInMinutes: 25
	},
	{
		speaker: {
			name: 'miduConf',
			description: 'Sorteos',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Participa en el Mega Trivial!',
		startAt: 1726161000000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Alba Silvente',
			description: 'FullStack en StoryBlok',
			imgUrl: '/img/speakers/dawntraoz.jpg'
		},
		title: 'El poder de las Web Extensions',
		startAt: 1726161600000,
		durationInMinutes: 20
	},
	{
		speaker: {
			name: 'Malt',
			description: 'Sorteo',
			imgUrl: '/img/speakers/malt.jpg'
		},
		title: 'Sorteo con Malt',
		startAt: 1726162800000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'Estefany Aguilar',
			description: 'Sr. Frontend Dev en Platzi',
			imgUrl: '/img/speakers/teffcode.jpg'
		},
		title: 'Guía Práctica para Medir la Complejidad Algorítmica',
		startAt: 1726163100000,
		durationInMinutes: 30
	},
	{
		speaker: {
			name: 'miduConf',
			description: 'Sorteo',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Participa en el Mega Trivial!',
		startAt: 1726164900000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Pelado Nerd',
			description: 'Divulgador DevOps',
			imgUrl: '/img/speakers/pablokbs.jpg'
		},
		title: 'Pelado Nerd + Sorteo',
		startAt: 1726165500000,
		durationInMinutes: 20
	},
	{
		speaker: {
			name: 'miduConf',
			description: 'Sorteo',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: 'Sorteos de la #miduConf',
		startAt: 1726166700000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'Cloudinary',
			description: 'Charla y sorteo',
			imgUrl: '/img/speakers/cloudinary.jpg'
		},
		title: 'Charla Cloudinary + Sorteo',
		startAt: 1726167000000,
		durationInMinutes: 10
	},
	{
		speaker: {
			name: 'Miguel Ángel Durán',
			description: 'Creador de contenido y divulgador',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Más novedades midudev!',
		startAt: 1726167600000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'miduConf',
			description: 'Sorteo',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: 'Sorteos de la #miduConf',
		startAt: 1726167900000,
		durationInMinutes: 5
	},
	{
		speaker: {
			name: 'Fazt',
			description: 'Creador de contenido',
			imgUrl: '/img/speakers/fazt.jpg'
		},
		title: 'Charla con Fazt + Sorteo',
		startAt: 1726168200000,
		durationInMinutes: 25
	},
	{
		speaker: {
			name: 'DotCSV',
			description: 'Divulgador de IA',
			imgUrl: '/img/speakers/dotcsv.jpg'
		},
		title: 'Charla con DotCSV',
		startAt: 1726169700000,
		durationInMinutes: 30
	},
	{
		speaker: {
			name: 'miduConf',
			description: 'Sorteo',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Participa en el Mega Trivial!',
		startAt: 1726171500000,
		durationInMinutes: 10
	}
]

/* 
16:40    17:00    Cuenta atrás con Grimer
17:00    17:30    Q&A con Guillermo Rauch
17:30    17:40    Charla KeepCoding + Sorteo
17:40    17:50    Charla con Codely + Sorteo
17:50    18:00    Novedades midudev
18:00    18:30    Charla con Freddy Vega
18:30    18:35    Sorteo Platzi
18:35    18:45    S4vitar + Sorteo
18:45    19:10    Carmen Ansio (Animaciones CSS con scroll)
19:10    19:20    ¡Participa en el Mega Trivial!
19:20    19:40    Alba Silvente (???)
19:40    19:45    Sorteo con Malt
19:45    20:15    Estefany Aguilar (???)
20:15    20:25    ¡Participa en el Mega Trivial!
20:25    20:45    Pelado Nerd + Sorteo
20:45    20:50    Sorteos
20:50    21:00    Charla Cloudinary + Sorteo
21:00    21:05    ¡Más novedades midudev! 
21:05    21:10    Sorteos
21:10    21:35    Charla con Fazt + Sorteo
21:35    22:05    Charla con DotCSV
22:05    22:15    ¡Participa en el Mega Trivial!
*/
