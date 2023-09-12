import { useState } from 'react'
import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import Head from 'next/head'
import { toJpeg } from 'html-to-image'

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Background } from '@/components/Background'
import { HeaderCountdown } from '@/components/HeaderCountdown'
import { Meteors } from '@/components/MeteorLanguages'
import TicketComponent from '@/components/Ticket'
import { FLAVORS } from '@/flavors/data.tsx'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({
	weight: ['500', '800', '900'],
	subsets: ['latin']
})

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

async function dataUrlToFile(dataUrl, fileName) {
	const res = await fetch(dataUrl)
	const blob = await res.blob()
	return new File([blob], fileName, { type: 'image/jpg' })
}

const STEPS_LOADING = {
	ready: '¡Comparte el ticket en Twitter!',
	generate: 'Generando nuevo ticket...',
	sharing: 'Compartiendo ticket...'
}

const getInfoFromUser = ({ user }) => {
	const { user_metadata: meta } = user
	const { avatar_url: avatar, full_name: fullname, preferred_username: username } = meta

	return { avatar, fullname, username }
}

export default function Ticket({ user, ticketNumber, selectedFlavor = 'javascript' }) {
	const [buttonText, setButtonText] = useState(STEPS_LOADING.ready)
	const [number, setNumber] = useState(ticketNumber)
	const [flavorKey, setFlavorKey] = useState(() => {
		// check selectedFlavor is valid
		if (Object.keys(FLAVORS).includes(selectedFlavor)) {
			return selectedFlavor
		}
		// by default we select javascript
		return 'javascript'
	})
	const supabase = useSupabaseClient()
	const flavor = FLAVORS[flavorKey]

	const { username, avatar, name } = user

	const title = 'miduConf - Conferencia de Programación y Tecnología'
	const description =
		'¡No te pierdas la miduConf el 13 de SEPTIEMBRE! Charlas para todos los niveles, +256 regalos y premios, ¡y muchas sorpresas!'
	const url = `https://miduconf.com/ticket/${username}`
	const ogImage = `${PREFIX_CDN}/ticket-${number}.jpg?${crypto.randomUUID()}=_buster`

	const handleShare = async () => {
		const intent = 'https://twitter.com/intent/tweet'
		const text = `¡No te pierdas la miduConf!
Conferencia de Programación y Tecnología.

👩‍💻 7 Speakers TOP
💬 Charlas para todos los niveles
🎁 +256 regalos y premios
...¡y muchas sorpresas!

Apunta la fecha: 13 de SEPTIEMBRE

https://miduconf.com/ticket/${username}`

		window.open(`${intent}?text=${encodeURIComponent(text)}`)
	}

	const handleLogout = async () => {
		await supabase.auth.signOut()
		// redirect to home
		window.location.href = '/'
	}

	const changeFlavorKey = (selectedFlavorKey) => async () => {
		setButtonText(STEPS_LOADING.generate)
		setFlavorKey(selectedFlavorKey)
		// update ticket in supabase
		const { error } = await supabase
			.from('ticket')
			.update({ flavour: selectedFlavorKey, user_id: user.id })
			.eq('user_name', username)

		const dataURL = await toJpeg(document.getElementById('ticket'), {
			quality: 0.8
		})

		document.querySelector('#image').setAttribute('src', dataURL)

		const file = await dataUrlToFile(dataURL, 'ticket.jpg')
		const filename = `ticket-${number}.jpg`

		const { data: dataStorage, error: errorStorage } = await supabase.storage
			.from('tickets')
			.upload(filename, file, {
				cacheControl: '3600',
				upsert: true
			})

		if (errorStorage) {
			console.error(errorStorage)
		}

		if (error) {
			console.error(error)
		}

		setButtonText(STEPS_LOADING.ready)
	}

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta property='og:image' content={ogImage} />
				<meta property='twitter:image' content={ogImage} />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' content={url} />
				<meta property='twitter:url' content={url} />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<Meteors />
			<Background />

			<header id='header' className='relative w-full mb-10 overflow-hidden z-[99999]'>
				<HeaderCountdown />
			</header>

			<main className={`${inter.className} max-w-5xl m-auto mt-16 pb-20 px-4`}>
				<div className='flex flex-col items-center justify-between w-full px-16 m-auto mt-16 mb-16 text-center md:flex-row'>
					<a
						className='flex-row justify-center  text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100'
						href='/'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M9 21v-6a2 2 0 0 1 2 -2h2c.247 0 .484 .045 .702 .127'></path>
							<path d='M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5'></path>
							<path d='M16 22l5 -5'></path>
							<path d='M21 21.5v-4.5h-4.5'></path>
						</svg>
						Volver a la portada
					</a>
					<button
						onClick={handleShare}
						type='button'
						className={`text-white cursor-pointer hover:bg- bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-125 [text-wrap:balance] ${
							buttonText !== STEPS_LOADING.ready
								? 'pointer-events-none opacity-70 bg-slate-700'
								: ''
						}`}
					>
						<svg
							className='w-6 h-6 mr-2'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 20 17'
						>
							<path
								fillRule='evenodd'
								d='M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z'
								clipRule='evenodd'
							/>
						</svg>
						{buttonText}
					</button>
					<button
						onClick={handleLogout}
						className='flex-row justify-center  text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100'
						href='/'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2'></path>
							<path d='M9 12h12l-3 -3'></path>
							<path d='M18 15l3 -3'></path>
						</svg>
						Cerrar sesión
					</button>
				</div>

				<TicketComponent number={number} flavor={flavor} user={{ username, avatar, name }} />

				<div className='w-full z-[99999] opacity-[.99] mt-10 md:mt-2'>
					<h2 className='font-light text-center text-white uppercase opacity-70'>
						Selecciona tu sabor:
					</h2>
					<div className='flex flex-row flex-wrap justify-center w-full p-8 text-center gap-x-4 gap-y-12'>
						{Object.entries(FLAVORS).map(([key, { name, component: Icon }]) => {
							return (
								<button
									key={key}
									className={`relative flex w-16 h-16 transition cursor:pointer group ${
										key === flavorKey
											? 'scale-125 pointer-events-none contrast-125 before:absolute before:rounded-full before:w-2 before:h-2 before:left-0 before:right-0 before:-top-4 before:mx-auto before:bg-yellow-200'
											: ''
									}`}
									onClick={changeFlavorKey(key)}
								>
									<figure className='flex items-center justify-center w-16 h-16 transition group-hover:scale-110'>
										<Icon />
									</figure>
									{name}
								</button>
							)
						})}
					</div>
				</div>
				<img id='image' src='' className='w-full h-auto' />
			</main>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	// Create authenticated Supabase Client
	const supabase = createPagesServerClient(ctx)

	let selectedFlavor = 'javascript'
	let ticketNumber = 0

	// Check if we have a session
	const {
		error: errorSession,
		data: { session }
	} = await supabase.auth.getSession()

	if (errorSession) {
		console.error(errorSession)
		return {
			redirect: {
				destination: '/?error=session_error',
				permanent: false
			}
		}
	}

	if (!session) {
		return {
			redirect: {
				destination: '/?error=not_logged_in',
				permanent: false
			}
		}
	}

	// detect if user has ticket and get all info
	const { data, error } = await supabase.from('ticket').select('*').eq('id', session.user.id)

	if (error) console.error(error)

	const userId = session?.user?.id
	const metadata = session?.user?.user_metadata ?? {}
	const { full_name: userFullName, preferred_username: username } = metadata

	// if no ticket present, create one
	if (data.length === 0) {
		console.info('[info] No ticket. Creating for user {')
		const { error } = await supabase.from('ticket').insert({
			flavour: 'javascript',
			id: session.user.id,
			user_fullname: userFullName,
			user_id: userId,
			user_name: username ?? userFullName
		})

		if (error) console.error(error)

		const { data } = await supabase.from('ticket').select('*').eq('id', session.user.id)
		selectedFlavor = data[0].flavour || 'javascript'
		ticketNumber = data[0].ticket_number || 0
	} else {
		selectedFlavor = data[0].flavour || 'javascript'
		ticketNumber = data[0].ticket_number || 0
	}
	return {
		props: {
			selectedFlavor,
			ticketNumber,
			initialSession: session,
			user: getInfoFromUser({ user: session?.user })
		}
	}
}
