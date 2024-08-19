import { HideContentBox } from '@/components/HideContentBox'
import { NavbarIcons } from '@/components/icons/navbar'
import { Codely } from '@/components/logos/codely'
import { DonDominio } from '@/components/logos/dondominio'
import { LemonCode } from '@/components/logos/lemoncode'
import { Malt } from '@/components/logos/maltes'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

export const Agenda = () => {
	const timezone = useGetTimezone()

	return (
		<section id='agenda' className='px-4 pt-20 pb-40 max-w-[802px] mx-auto'>
			<h2 className='text-6xl font-bold text-center text-white'>Agenda</h2>
			<p className='text-xl text-white/80 text-center [text-wrap:balance] mt-4'>
				Todas las charlas son en directo y en español
			</p>
			<div className='w-full mx-auto space-y-4 text-center'>
				<span className='inline-flex flex-wrap items-center justify-center px-3 py-1 text-sm font-medium text-white rounded-full bg-sky-950 text-primary-300 shadow-inset shadow-white'>
					<span className='flex items-center gap-1 mr-1 opacity-75'>
						<svg
							aria-hidden='true'
							className='w-3 h-3 mr-1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='#fff'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
								clipRule='evenodd'
							/>
						</svg>
						Zona horaria de la agenda:
					</span>{' '}
					<span>{timezone}</span>
				</span>
			</div>
			<div
				className='flex flex-col gap-8 mt-12 md:hidden lg:mt-16'
				style={{ maskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)' }}
			>
				{LIST_OF_TALKS.map((talk) => (
					<AgendaItemMobile key={talk.speaker.name} {...talk} />
				))}
			</div>
			<div
				className='flex-col hidden gap-8 mt-12 md:flex lg:mt-16'
				style={{ maskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)' }}
			>
				{LIST_OF_TALKS.map((talk) => (
					<AgendaItem key={talk.speaker.name} {...talk} />
				))}
			</div>

			<p className='text-4xl mt-10 font-semibold text-center max-w-[24ch] text-midu-primary mx-auto px-4'>
				¡Muy pronto revelaremos la agenda!
			</p>
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
}

const AgendaItem = ({ startAt, durationInMinutes, title, speaker }: AgendaItemProps) => {
	const time = useTime({ timestamp: startAt, durationInMinutes })

	return (
		<article className='w-full rounded-[20px] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#121226] before:-z-10 shadow relative flex flex-col gap-5 sm:flex-row sm:items-stretch p-6 overflow-hidden'>
			<p className='flex items-center justify-center w-auto text-5xl font-bold text-white/60 sm:text-right sm:w-32 shrink-0'>
				{time?.startAt}
			</p>
			<div className='flex-1'>
				<header className='flex flex-row items-center gap-x-2'>
					<h4 className='font-medium leading-tight text-midu-primary'>{speaker.name}</h4>
					<span className='text-white/70'>- {speaker.description}</span>
				</header>
				<h4 className='mt-2 text-xl font-bold text-white'>{title}</h4>
				<div className='flex items-center gap-3'>
					<img
						className='brightness-50 sm:brightness-100 -z-10 object-cover object-center h-full shrink-0 absolute right-0 top-0 w-[200px]'
						src={speaker.imgUrl}
						alt={`Foto de ${speaker.name}`}
						style={{ maskImage: 'linear-gradient(to left, black 50%, transparent 90%)' }}
					/>
				</div>
			</div>
		</article>
	)
}

const AgendaItemMobile = ({ startAt, durationInMinutes, title, speaker }: AgendaItemProps) => {
	const time = useTime({ timestamp: startAt, durationInMinutes })

	return (
		<article>
			<header className='flex items-center gap-x-4'>
				<h4 className='text-sm text-midu-primary'>{speaker.name}</h4>
				<div className='flex-1 bg-midu-primary w-full h-[1px]'></div>
				<span className='text-sm text-white/50'>
					{time?.startAt} - {time?.endAt}
				</span>
			</header>
			<div className='flex items-center mt-3 gap-x-3'>
				<img
					className='object-cover object-center w-16 h-16 rounded-full'
					src={speaker.imgUrl}
					alt={`Foto de ${speaker.name}`}
				/>
				<h5 className='font-bold text-white'>{title}</h5>
			</div>
		</article>
	)
}
interface AgendaRaffleProps {
	title: string
	sponsor: {
		logo: () => JSX.Element
		url: string
		name: string
	}
}

const AgendaRaffle = ({ title, sponsor }: AgendaRaffleProps) => {
	const accesibilityLink = `Ir al sitio de ${sponsor.name}`

	return (
		<div className='relative w-full max-w-md p-4 mx-auto overflow-hidden text-white border rounded-2xl border-midu-primary/50 bg-button md:shadow-button group cursor-crosshair'>
			<h4 className='font-bold'>{title}</h4>
			<div className='flex items-center gap-3 mt-2'>
				<span className='text-sm text-white/60'>Patrocinado por:</span>
				<a
					href={sponsor.url}
					target='_blank'
					title={accesibilityLink}
					aria-label={accesibilityLink}
				>
					<sponsor.logo />
				</a>
			</div>
			<div
				aria-disabled
				className='absolute bottom-0 right-0 h-auto scale-125 opacity-50 w-max -z-10 -rotate-12 group-hover:scale-150 group-hover:-rotate-[24deg] transition-transform'
			>
				<sponsor.logo />
			</div>
		</div>
	)
}

type TimeHook = (props: { timestamp: number; durationInMinutes: number }) => null | {
	startAt: string
	endAt: string
}

const useTime: TimeHook = ({ timestamp, durationInMinutes }) => {
	const [time, setTime] = useState(null)

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

const LIST_OF_TALKS = [
	{
		speaker: {
			name: 'Miguel Ángel Durán',
			description: 'Creador de contenido y divulgador',
			imgUrl: '/img/speakers/midudev.jpg'
		},
		title: '¡Hola, miduConf 👋!',
		startAt: 1726153200000,
		durationInMinutes: 15
	},
	{
		speaker: {
			name: 'Guillermo Rauch',
			description: 'CEO de Vercel',
			imgUrl: '/img/speakers/rauchg.jpg'
		},
		title: 'Como la IA Revolucionará el mundo Web',
		startAt: 1726154100000,
		durationInMinutes: 30
	},
	{
		speaker: {
			name: 'Carmen Ansio',
			description: 'UX Engineer Freelance',
			imgUrl: '/img/speakers/carmen.jpg'
		},
		title: 'CSS en 2024',
		startAt: 1726155900000,
		durationInMinutes: 30
	}
]
