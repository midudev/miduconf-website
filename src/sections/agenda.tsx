import { Codely } from '@/components/logos/codely'
import { DonDominio } from '@/components/logos/dondominio'
import { LemonCode } from '@/components/logos/lemoncode'
import { Malt } from '@/components/logos/maltes'
import { useEffect, useState } from 'react'

const useTime = ({ timestamp, duration }) => {
	const [time, setTime] = useState(null)

	useEffect(() => {
		// get HH:MM in the local user timezone
		const localTime = new Date(timestamp).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})

		// setTime(`${localTime} - ${endTime}`)
		setTime(localTime)
	}, [])

	return time
}

const useGetTimezone = () => {
	const [timezone, setTimezone] = useState(null)

	useEffect(() => {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
		setTimezone(timezone)
	}, [])

	return timezone
}

const AgendaRaffle = ({ title, sponsor }) => {
	return (
		<div className='flex flex-col gap-4 sm:flex-row sm:items-stretch '>
			<p className='w-auto text-sm font-medium text-gray-400 sm:text-right sm:w-32 shrink-0'></p>
			<div className='flex-1 pb-8 sm:pb-12'>
				<div className='p-4 space-y-4 bg-gray-900 rounded-lg to-black'>
					<h4 className='text-xl font-bold text-white'>{title}</h4>
					{sponsor?.logo && (
						<div className='flex flex-row items-center justify-start gap-x-4'>
							<p className='flex items-center justify-center h-full text-base font-medium text-gray-400'>
								Patrocinado por:
							</p>
							<div className='flex flex-wrap items-center'>
								<a
									className='flex items-center justify-center'
									href={sponsor.url}
									target='_blank'
									rel='noopener noreferrer'
								>
									<sponsor.logo />
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const AgendaItem = ({ timestamp, duration, title, description, speaker }) => {
	const time = useTime({ timestamp, duration })

	return (
		<article className='rounded-[20px] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#121226] before:-z-10 shadow relative flex flex-col gap-5 sm:flex-row sm:items-stretch p-6 overflow-hidden'>
			<p className='flex items-center justify-center w-auto text-5xl font-bold text-white/60 sm:text-right sm:w-32 shrink-0'>
				{time}
			</p>
			<div className='flex-1'>
				<header className='flex flex-row items-center gap-x-2'>
					<h4 className='font-medium leading-tight text-midu-primary'>{speaker.name}</h4>
					<span className='text-white/70'>- {speaker.title}</span>
				</header>
				<h4 className='mt-2 text-xl font-bold text-white'>{title}</h4>
				<div className='flex items-center gap-3'>
					<img
						className='brightness-50 sm:brightness-100 -z-10 object-cover object-center h-full shrink-0 absolute right-0 top-0 w-[200px]'
						src={`/img/speakers/${speaker.img}.jpg`}
						alt={`Foto de ${speaker.name}`}
						style={{ maskImage: 'linear-gradient(to left, black 50%, transparent 90%)' }}
					/>
				</div>
			</div>
		</article>
	)
}
export const Agenda = () => {
	const timezone = useGetTimezone()

	return (
		<section id='agenda' className='flex flex-col flex-wrap items-center justify-center pt-48'>
			<h2 className='text-6xl font-bold text-center text-white'>Agenda</h2>
			<p className='max-w-xl text-xl text-white/80 text-center [text-wrap:balance] mt-4'>
				Todas las charlas son en directo y en español
			</p>

			<section className='antialiased'>
				<div className='max-w-4xl px-4 py-4 mx-auto lg:px-6'>
					<div className='w-full max-w-xl mx-auto space-y-4 text-center'>
						<span className='inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full bg-sky-950 text-primary-300 shadow-inset shadow-white'>
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
							<span className='mr-1 opacity-75'>Zona horaria de la agenda:</span> {timezone}
						</span>
					</div>
					<div className='grid mt-12 lg:mt-16 gap-y-12 gap-x-16'>
						<div className='space-y-8'>
							<AgendaItem
								timestamp={1694620800000}
								duration={30 * 60 * 1000}
								title='¡Hola, miduConf 👋!'
								description='Anunciamos próximos proyectos en la comunidad de programación y tecnología de midudev.'
								speaker={{
									img: 'midudev',
									name: 'Miguel Ángel Durán',
									title: 'Creador de contenido y divulgador'
								}}
							/>
							<AgendaItem
								timestamp={1694622000000}
								duration={30 * 60 * 1000}
								title='Como la IA Revolucionará el mundo Web'
								description='El futuro de la programación, Next.js, Vercel y la IA. ¡Conoce a Guillermo Rauch!'
								speaker={{
									img: 'rauchg',
									name: 'Guillermo Rauch',
									title: 'CEO de Vercel'
								}}
							/>
							{/* <AgendaRaffle
								title='Sorteo suscripciones de CodelyTV'
								sponsor={{
									logo: () => <Codely className='w-40' />,
									url: 'https://codely.com/pro/midudev'
								}}
							/> */}
							<AgendaItem
								timestamp={1694632200000}
								duration={30 * 60 * 1000}
								title='20 Cosas que te perdiste de CSS en 2024'
								description='CSS no deja de evolucionar rápidamente. Te traigo demos y ejemplos de lo que puedes hacer con CSS ahora'
								speaker={{
									img: 'carmen',
									name: 'Carmen Ansio',
									title: 'UX Engineer Freelance'
								}}
							/>
							<AgendaItem
								timestamp={1694624400000}
								duration={30 * 60 * 1000}
								title='Trucos con ChatGPT 4.0 que no conocías 🤯'
								description='¿Qué está pasando en el mercado laboral tech? ¿Cuál es la evolución? Lo vemos con datos reales.'
								speaker={{
									img: 'dotcsv',
									name: 'Carlos Santana',
									title: 'Divulgador de IA'
								}}
							/>
							{/* <AgendaRaffle
								title='Sorteo 2x Bootcamp JavaScript'
								sponsor={{
									logo: () => <LemonCode className='w-40' />,
									url: 'https://lemoncode.net/master-frontend#inicio-banner'
								}}
							/> */}
							<AgendaItem
								timestamp={1694627100000}
								duration={30 * 60 * 1000}
								title='Primeros pasos para hacer testing en tu App'
								description='Vas a aprender a crear tests de forma sencilla y sin complicaciones. Para que no tengas excusas.'
								speaker={{
									img: 'debbie',
									name: "Debbie O'brien",
									title: 'Senior Program Manager en Microsoft'
								}}
							/>
							<AgendaItem
								timestamp={1694627100000}
								duration={30 * 60 * 1000}
								title='...'
								description='Vas a aprender a crear tests de forma sencilla y sin complicaciones. Para que no tengas excusas.'
								speaker={{
									img: 'dawntraoz',
									name: 'Alba Silvente',
									title: 'FullStack @ StoryBlok'
								}}
							/>
							{/* <AgendaRaffle
								title='Sorteo regalos GitHub'
								sponsor={{
									logo: () => <Malt className='w-40 h-auto text-white' />,
									url: 'https://midu.link/malt'
								}}
							/> */}
							<AgendaItem
								timestamp={1694629800000}
								duration={30 * 60 * 1000}
								title='Todo lo que debes saber de DevOps'
								description='¿Vale la pena aprender programación con la irrupción de la IA? ¿Cuál es su futuro? ¡Lo comentamos!'
								speaker={{
									img: 'pablokbs',
									name: 'Pablo Fredrikson',
									title: 'Divulgador DevOps'
								}}
							/>
							{/* <AgendaRaffle
								title='Sorteo de 5 dominios .dev + hosting con SSL'
								sponsor={{
									logo: () => <DonDominio className='w-40 h-auto' />,
									url: 'https://midu.link/dondominio'
								}}
							/> */}

							<AgendaItem
								timestamp={1694634000000}
								duration={30 * 60 * 1000}
								title='¡Hey! Que tal Coders 🚀'
								description='Hablamos de las tendencias y tecnologías que están cambiando la forma de programar en la web.'
								speaker={{
									img: 'fazt',
									name: 'Fazt',
									title: 'Ingeniero de Software'
								}}
							/>
							{/* <AgendaRaffle sponsor={null} title='¡Sorteo de una Nintendo Switch!' /> */}
							<AgendaItem
								timestamp={1694635800000}
								duration={20 * 60 * 1000}
								title='UX para developers'
								description='Hablamos con uno de los responsables de IDX, el editor en la nube de Google que ha sorprendido a todos'
								speaker={{
									img: 'teffcode',
									name: 'Estefany Aguilar',
									title: 'Sr. Frontend Dev'
								}}
							/>
						</div>
					</div>
				</div>
			</section>
		</section>
	)
}
