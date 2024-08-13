import { Layout } from '@/sections/layout'
import { GeistSans } from 'geist/font/sans'
import { toJpeg } from 'html-to-image'
import { useEffect, useMemo, useState } from 'react'

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Background } from '@/components/Background'
import { Button } from '@/components/Button'
import { Container3D } from '@/components/Container3D'
import { Meteors } from '@/components/MeteorLanguages'
import { Stars } from '@/components/Stars'
import TicketComponent from '@/components/Ticket'
import { FLAVORS } from '@/flavors/data.tsx'
import { cn } from '@/lib/utils'

const MATERIALS_AVAILABLE = {
	STANDARD: 'standard',
	GRANITE: 'granite',
	PLATINUM: 'platinum'
}

export default function Ticket({ user, ticketNumber, selectedFlavor = 'javascript' }) {
	const [buttonText, setButtonText] = useState(STEPS_LOADING.ready)
	const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS_AVAILABLE.STANDARD)

	const { generatedImage, handleSaveImage, saveButtonText } = useTicketSave({
		buttonStatus: buttonText
	})

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
	const ogImage = `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?${hash}=_buster`

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

		handleSaveImage(dataURL)

		const file = await dataUrlToFile(dataURL, 'ticket.jpg')
		const filename = `ticket-${ticketNumber}.jpg`

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
			<div aria-disabled className='w-[732px] -mb-[366px] relative -left-[200vw]'>
				<div id='ticket' className='border-[16px] border-transparent'>
					<TicketComponent
						isSizeFixed
						number={ticketNumber}
						flavor={flavor}
						user={{ username, avatar, name }}
					/>
				</div>
			</div>
			<main
				className={`${GeistSans.className} max-w-screen-xl m-auto mt-40 pb-20 gap-8 px-4 flex flex-col lg:grid grid-cols-[auto_1fr] items-center`}
			>
				<div>
					<div className='w-auto'>
						<div className='max-w-[400px] md:max-w-[700px] mx-auto'>
							<Container3D>
								<TicketComponent
									number={ticketNumber}
									flavor={flavor}
									user={{ username, avatar, name }}
								/>
							</Container3D>
						</div>
						<div
							className={cn(
								'w-2/3 mx-auto h-6 rounded-[50%] mt-6 transition-colors duration-300 blur-xl',
								flavor.colorPalette?.bg
							)}
						></div>
					</div>
					<div className='flex flex-col items-center w-full px-8 mt-16 mb-16 gap-x-10 gap-y-4 lg:mb-0 lg:mt-4 md:flex-row'>
						<Button
							variant='secondary'
							onClick={handleShare}
							type='button'
							disabled={buttonText !== STEPS_LOADING.ready}
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
						</Button>
						<Button
							as='a'
							href={generatedImage}
							download
							variant='secondary'
							disabled={buttonText !== STEPS_LOADING.ready}
						>
							<svg
								width='30'
								height='31'
								viewBox='0 0 30 31'
								fill='none'
								className='w-6 h-6'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g clip-path='url(#clip0_90_2554)'>
									<path
										d='M5 21.75V24.25C5 24.913 5.26339 25.5489 5.73223 26.0178C6.20107 26.4866 6.83696 26.75 7.5 26.75H22.5C23.163 26.75 23.7989 26.4866 24.2678 26.0178C24.7366 25.5489 25 24.913 25 24.25V21.75'
										stroke='white'
										stroke-width='1.5'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
									<path
										d='M8.75 14.25L15 20.5L21.25 14.25'
										stroke='white'
										stroke-width='1.5'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
									<path
										d='M15 5.5V20.5'
										stroke='white'
										stroke-width='1.5'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
								</g>
								<defs>
									<clipPath id='clip0_90_2554'>
										<rect width='30' height='30' fill='white' transform='translate(0 0.5)' />
									</clipPath>
								</defs>
							</svg>
							{saveButtonText}
						</Button>
						<button
							onClick={handleLogout}
							className='flex-row justify-center  text-white cursor-pointer hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-70 hover:opacity-100 lg:ml-auto'
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
				</div>
				<div className='w-full -order-1 md:order-none'>
					<div>
						<h2 className='text-2xl font-bold text-white lg:pl-8'>Material</h2>
						<div className='flex flex-wrap items-center px-8 py-3 gap-x-6 gap-y-2'>
							<Button className='py-1' variant='secondary'>
								Estándar{' '}
								<span className='px-2 py-1 text-xs rounded-full bg-white/10 text-white/60'>
									Seleccionado
								</span>
							</Button>
							<p className='text-sm text-white/60'>¡Próximamente nuevos materiales!</p>
						</div>
					</div>
					<div className='w-full z-[99999] opacity-[.99] mt-10 md:mt-2'>
						<h2 className='text-2xl font-bold text-white lg:pl-8'>Tecnología</h2>
						<div className='flex flex-row w-full p-8 max-h-[30rem] overflow-x-auto text-center flex-nowrap md:flex-wrap gap-x-8 gap-y-12 lg:pb-20 hidden-scroll lg:flavors-gradient-list'>
							{Object.entries(FLAVORS).map(([key, { icon: Icon }]) => {
								return (
									<button
										key={key}
										className={`relative flex w-12 h-12 transition cursor:pointer group ${
											key === flavorKey
												? 'scale-125 pointer-events-none contrast-125 before:absolute before:rounded-full before:w-2 before:h-2 before:left-0 before:right-0 before:-top-4 before:mx-auto before:bg-yellow-200'
												: ''
										}`}
										onClick={changeFlavorKey(key)}
									>
										<div className='flex items-center justify-center w-12 h-12 transition group-hover:scale-110'>
											<Icon className='h-auto' />
										</div>
									</button>
								)
							})}
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

async function dataUrlToFile(dataUrl, fileName) {
	const res = await fetch(dataUrl)
	const blob = await res.blob()
	return new File([blob], fileName, { type: 'image/jpg' })
}

const STEPS_LOADING = {
	ready: 'Compartir',
	generate: 'Generando...',
	sharing: 'Compartiendo...'
}

const getInfoFromUser = ({ user }) => {
	const { user_metadata: meta } = user
	const { avatar_url: avatar, full_name: fullname, preferred_username: username } = meta

	return { avatar, fullname, username }
}

const useTicketSave = ({ buttonStatus }) => {
	const [generatedImage, setGeneratedImage] = useState(null)

	const saveButtonText = useMemo(() => {
		if (buttonStatus === STEPS_LOADING.generate) return 'Creando...'
		return 'Guardar'
	}, [buttonStatus])

	useEffect(() => {
		toJpeg(document.getElementById('ticket'), {
			quality: 0.8
		}).then(handleSaveImage)
	}, [])

	const handleSaveImage = (dataURL) => {
		setGeneratedImage(dataURL)
	}

	return { generatedImage, handleSaveImage, saveButtonText }
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
