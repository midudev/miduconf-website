import { Layout } from '@/sections/layout'
import { GeistSans } from 'geist/font/sans'
import { toJpeg } from 'html-to-image'
import { useState } from 'react'

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Background } from '@/components/Background'
import { Container3D } from '@/components/Container3D'
import { Meteors } from '@/components/MeteorLanguages'
import { Stars } from '@/components/Stars'
import TicketComponent from '@/components/Ticket'
import { FLAVORS } from '@/flavors/data.tsx'

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

async function dataUrlToFile(dataUrl, fileName) {
	const res = await fetch(dataUrl)
	const blob = await res.blob()
	return new File([blob], fileName, { type: 'image/jpg' })
}

const STEPS_LOADING = {
	ready: 'Compartir ticket en X',
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
	const hash = crypto.randomUUID().split('-')[0]
	const url = `https://miduconf.com/ticket/${username}/${hash}`
	const ogImage = `${PREFIX_CDN}/ticket-${number}.jpg?${hash}=_buster`

	const handleShare = async () => {
		const intent = 'https://twitter.com/intent/tweet'
		const text = `¡No te pierdas la miduConf!
Conferencia de Programación y Tecnología.

👩‍💻 7 Speakers TOP
💬 Charlas para todos los niveles
🎁 +256 regalos y premios
...¡y muchas sorpresas!

Apunta la fecha: 12 de SEPTIEMBRE

→ miduconf.com/ticket/${username}/${hash}`

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

	const metadata = {
		title,
		description,
		ogImage,
		url
	}

	return (
		<Layout meta={metadata}>
			<Stars />
			<Meteors />
			<Background />

			<main className={`${GeistSans.className} max-w-screen-base m-auto mt-40 pb-20 px-4`}>
				<div className='flex flex-col items-center justify-between w-full px-16 m-auto mt-16 mb-16 text-center md:flex-row'>
					<button
						onClick={handleShare}
						type='button'
						className={`text-white cursor-pointer hover:bg- bg-[#14171A] hover:bg-[#14171A]/90 focus:ring-4 focus:outline-none focus:ring-[#14171A]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#14171A]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out border border-white/40 hover:scale-125 [text-wrap:balance] ${
							buttonText !== STEPS_LOADING.ready
								? 'pointer-events-none opacity-70 bg-slate-700'
								: ''
						}`}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-4 h-4 mr-2'
							width='1200'
							height='1227'
							fill='none'
							viewBox='0 0 1200 1227'
						>
							<path
								fill='#fff'
								d='M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z'
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

				<div className='max-w-[700px] mx-auto'>
					<Container3D>
						<TicketComponent number={number} flavor={flavor} user={{ username, avatar, name }} />
					</Container3D>
				</div>
				<div aria-disabled className='w-[732px] -mb-[366px] relative -left-[200vw]'>
					<div id='ticket' className='border-[16px] border-transparent'>
						<TicketComponent
							isSizeFixed
							number={number}
							flavor={flavor}
							user={{ username, avatar, name }}
						/>
					</div>
				</div>

				<div className='w-full z-[99999] opacity-[.99] mt-10 md:mt-2'>
					<h2 className='font-light text-center text-white uppercase opacity-70'>
						Selecciona tu sabor:
					</h2>
					<div className='flex flex-row justify-center w-full p-8 overflow-x-auto text-center flex-nowrap md:flex-wrap gap-x-8 gap-y-12'>
						{Object.entries(FLAVORS).map(([key, { icon: Icon }]) => {
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
									<div className='flex items-center justify-center w-16 h-16 transition group-hover:scale-110'>
										<Icon className='h-auto' />
									</div>
								</button>
							)
						})}
					</div>
				</div>
			</main>
		</Layout>
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
