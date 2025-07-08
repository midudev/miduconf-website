import { Layout } from '@/sections/layout'
import confetti from 'canvas-confetti'
import { GeistSans } from 'geist/font/sans'
import { toJpeg } from 'html-to-image'
import { useEffect, useMemo, useState } from 'react'

import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Background } from '@/components/Background'
import { Button } from '@/components/Button'
import { Container3D } from '@/components/Container3D'
import { TwitchIcon } from '@/components/icons'
import { Stickers } from '@/components/icons/stickers/index.tsx'
import { MiduLogo } from '@/components/logos/midudev'
import { Meteors } from '@/components/MeteorLanguages'
import { Modal } from '@/components/Modal'
import { Stars } from '@/components/Stars'
import TicketComponent from '@/components/Ticket'
import TicketGradient from '@/components/TicketGradient'
import TicketPlatinum from '@/components/TicketPlatinum'
import { Tooltip } from '@/components/Tooltip'
import { FLAVORS } from '@/flavors/data.tsx'
import { cn } from '@/lib/utils'

const MATERIALS_AVAILABLE = {
	STANDARD: 'standard',
	SPECIAL: 'special',
	PREMIUM: 'premium'
}

export default function Ticket({
	user,
	ticketNumber,
	selectedFlavor = 'javascript',
	twitchTier,
	material: defaultMaterial,
	tierQueryData,
	notAccessTier,
	userHadPreviousTicket,
	stickers,
	showAcheivementModal
}) {
	const [isShowAchievementModal, setIsShowAchievementModal] = useState(showAcheivementModal)
	const [buttonText, setButtonText] = useState(STEPS_LOADING.ready)
	const [selectedStickers, setSelectedStickers] = useState(() => {
		const currentStickers = stickers.map((sticker) => (sticker === 'null' ? null : sticker))

		const currentList = stickers.map((sticker) => {
			if (sticker === 'null') return null
			const stickerComponent = STICKERS_LIST.find(({ name }) => name === sticker)
			return stickerComponent?.StickerImage
		})

		return {
			limit: twitchTier == null ? 0 : Number(twitchTier),
			list: currentList,
			namesList: currentStickers
		}
	})

	const [isModalOpen, setIsModalOpen] = useState(() => {
		return tierQueryData == null ? false : true
	})
	const [selectedMaterial, setSelectedMaterial] = useState(defaultMaterial)
	const [flavorKey, setFlavorKey] = useState(() => {
		// check selectedFlavor is valid
		if (Object.keys(FLAVORS).includes(selectedFlavor)) {
			return selectedFlavor
		}
		// by default we select javascript
		return 'javascript'
	})

	const handleChangeMaterial = async (material) => {
		setButtonText(STEPS_LOADING.generate)
		setSelectedMaterial(material)

		const { dataURL } = await handleCreateTicketImage({
			supabase,
			selectedFlavorKey: flavorKey,
			userId: user.id,
			username,
			ticketNumber,
			material,
			stickers: selectedStickers.namesList
		})

		handleSaveImage(dataURL)
		setButtonText(STEPS_LOADING.ready)
	}

	const handleSelectSticker = async (sticker, nameSticker) => {
		const newStickers = selectedStickers.list
		const newStickersNames = selectedStickers.namesList
		const limitStickers = Number(selectedStickers.limit)
		const index = newStickers.findIndex((sticker, i) => sticker == null && i + 1 <= limitStickers)

		index === -1 ? (newStickers[limitStickers - 1] = sticker) : (newStickers[index] = sticker)
		index === -1
			? (newStickersNames[limitStickers - 1] = nameSticker)
			: (newStickersNames[index] = nameSticker)

		setSelectedStickers({ list: newStickers, limit: twitchTier, namesList: newStickersNames })

		setButtonText(STEPS_LOADING.generate)

		const { dataURL } = await handleCreateTicketImage({
			supabase,
			selectedFlavorKey: flavorKey,
			userId: user.id,
			username,
			ticketNumber,
			material: selectedMaterial,
			stickers: selectedStickers.namesList
		})

		handleSaveImage(dataURL)
		setButtonText(STEPS_LOADING.ready)
	}

	const handleRemoveSticker = async (index) => {
		const newStickers = selectedStickers.list
		const namesStickers = selectedStickers.namesList
		newStickers[index] = null
		namesStickers[index] = null

		setSelectedStickers({ list: newStickers, limit: twitchTier, namesList: namesStickers })
		setButtonText(STEPS_LOADING.generate)

		const { dataURL } = await handleCreateTicketImage({
			supabase,
			selectedFlavorKey: flavorKey,
			userId: user.id,
			username,
			ticketNumber,
			material: selectedMaterial,
			stickers: selectedStickers.namesList
		})

		handleSaveImage(dataURL)
		setButtonText(STEPS_LOADING.ready)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		/* remove queryparams in url */
		window.history.replaceState({}, document.title, window.location.pathname)
	}

	const supabase = useSupabaseClient()
	const { generatedImage, handleSaveImage, saveButtonText } = useTicketSave({
		buttonStatus: buttonText,
		isMaterialChange: selectedMaterial
	})

	const flavor = FLAVORS[flavorKey]
	const { username, avatar, name } = user

	const title = 'miduConf - Conferencia de Programación y Tecnología'
	const description =
		'¡No te pierdas la miduConf el 12 de SEPTIEMBRE! Charlas para todos los niveles, +256 regalos y premios, ¡y muchas sorpresas!'
	const hash = crypto.randomUUID().split('-')[0]

	const url = `https://miduconf.com/ticket/${username}/${hash}`
	const ogImage = `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?${hash}=_buster`

	const handleLogout = async () => {
		await supabase.auth.signOut()
		// redirect to home
		window.location.href = '/'
	}

	const changeFlavorKey = (selectedFlavorKey) => async () => {
		setButtonText(STEPS_LOADING.generate)
		setFlavorKey(selectedFlavorKey)

		const { dataURL } = await handleCreateTicketImage({
			supabase,
			selectedFlavorKey,
			userId: user.id,
			username,
			ticketNumber,
			material: selectedMaterial,
			stickers: selectedStickers.namesList
		})

		handleSaveImage(dataURL)
		setButtonText(STEPS_LOADING.ready)
	}

	const metadata = {
		title,
		description,
		ogImage,
		url
	}

	useEffect(() => {
		if (!userHadPreviousTicket) {
			handleCreateTicketImage({
				supabase,
				selectedFlavorKey: flavorKey,
				userId: user.id,
				username,
				ticketNumber,
				stickers: selectedStickers.namesList
			})
		}
	}, [])

	useEffect(() => {
		const isSuccessDataInModal =
			['1', '2', '3'].includes(tierQueryData?.tier) && notAccessTier === 'false'

		if (isSuccessDataInModal && isModalOpen) {
			confetti({
				particleCount: 50,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				zIndex: 9999999
			})
			confetti({
				particleCount: 50,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				zIndex: 9999999
			})
		}
	}, [isModalOpen])

	const handleGetAchievement = async () => {
		try {
			const res = await fetch('/api/twitch/signin')
			if (!res.ok) console.log('error in fetch')
			const data = await res.json()

			console.log(data)
		} catch (err) {
			console.log({ err })
		}
	}

	return (
		<Layout meta={metadata}>
			<Stars />
			<Meteors />
			<Background />
			<div aria-disabled className='w-[732px] -mb-[366px] relative -left-[200vw]'>
				<div id='ticket' className='border-[16px] border-transparent'>
					{selectedMaterial === MATERIALS_AVAILABLE.STANDARD && (
						<TicketComponent
							isSizeFixed
							transition={false}
							number={ticketNumber}
							flavor={flavor}
							user={{ username, avatar, name }}
							handleRemoveSticker={handleRemoveSticker}
							selectedStickers={selectedStickers}
						/>
					)}
					{selectedMaterial === MATERIALS_AVAILABLE.SPECIAL && (
						<TicketGradient
							isSizeFixed
							transition={false}
							number={ticketNumber}
							flavor={flavor}
							user={{ username, avatar, name }}
							handleRemoveSticker={handleRemoveSticker}
							selectedStickers={selectedStickers}
						/>
					)}
					{selectedMaterial === MATERIALS_AVAILABLE.PREMIUM && (
						<TicketPlatinum
							isSizeFixed
							transition={false}
							number={ticketNumber}
							flavor={flavor}
							user={{ username, avatar, name }}
							handleRemoveSticker={handleRemoveSticker}
							selectedStickers={selectedStickers}
						/>
					)}
				</div>
			</div>
			<main
				className={`${GeistSans.className} max-w-screen-xl m-auto mt-40 pb-20 gap-8 px-4 flex flex-col lg:grid grid-cols-[auto_1fr] items-center`}
			>
				<div>
					<div className='flex flex-col w-auto'>
						<Button
							as='a'
							href={getTwitchAuthorizeUrlForAchievement()}
							className='inline-flex self-center mx-auto mb-10 text-center'
						>
							<MiduLogo className='w-auto h-4' />
							Conseguir logro en midu.dev con Twitch
						</Button>
						<div className='max-w-[400px] md:max-w-[700px] md:w-[700px] mx-auto'>
							<Container3D>
								{selectedMaterial === MATERIALS_AVAILABLE.STANDARD && (
									<TicketComponent
										number={ticketNumber}
										flavor={flavor}
										user={{ username, avatar, name }}
										handleRemoveSticker={handleRemoveSticker}
										selectedStickers={selectedStickers}
									/>
								)}
								{selectedMaterial === MATERIALS_AVAILABLE.SPECIAL && (
									<TicketGradient
										number={ticketNumber}
										flavor={flavor}
										user={{ username, avatar, name }}
										handleRemoveSticker={handleRemoveSticker}
										selectedStickers={selectedStickers}
									/>
								)}
								{selectedMaterial === MATERIALS_AVAILABLE.PREMIUM && (
									<TicketPlatinum
										number={ticketNumber}
										flavor={flavor}
										user={{ username, avatar, name }}
										handleRemoveSticker={handleRemoveSticker}
										selectedStickers={selectedStickers}
									/>
								)}
							</Container3D>
						</div>
						<div
							className={cn(
								'w-2/3 mx-auto h-6 rounded-[50%] mt-6 transition-colors duration-300 blur-xl',
								flavor.colorPalette?.bg,
								selectedMaterial === MATERIALS_AVAILABLE.SPECIAL && 'bg-[#9354E9]',
								selectedMaterial === MATERIALS_AVAILABLE.PREMIUM && 'bg-[#1B1D51]'
							)}
						></div>
					</div>
					<div className='flex flex-col items-center w-full px-8 mt-16 mb-16 gap-x-10 gap-y-4 lg:mb-0 lg:mt-4 md:flex-row'>
						<Button
							variant='secondary'
							onClick={() =>
								handleShare({
									hash,
									username
								})
							}
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
								<g clipPath='url(#clip0_90_2554)'>
									<path
										d='M5 21.75V24.25C5 24.913 5.26339 25.5489 5.73223 26.0178C6.20107 26.4866 6.83696 26.75 7.5 26.75H22.5C23.163 26.75 23.7989 26.4866 24.2678 26.0178C24.7366 25.5489 25 24.913 25 24.25V21.75'
										stroke='white'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M8.75 14.25L15 20.5L21.25 14.25'
										stroke='white'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M15 5.5V20.5'
										stroke='white'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
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
						<Button
							variant='secondary'
							as='a'
							className='ml-0 lg:ml-auto'
							onClick={handleLogout}
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
						</Button>
					</div>
				</div>
				<div className='w-full md:order-none'>
					<div>
						<h2 className='text-2xl font-bold text-white lg:pl-8'>Material</h2>
						<div className='flex flex-wrap items-center px-8 py-3 gap-x-2 gap-y-2'>
							<Button
								onClick={async () => await handleChangeMaterial(MATERIALS_AVAILABLE.STANDARD)}
								className={cn(
									'py-1 transition-all',
									MATERIALS_AVAILABLE.STANDARD !== selectedMaterial &&
										'bg-transparent border-transparent'
								)}
								variant='secondary'
							>
								Estándar
							</Button>
							{twitchTier == null ? (
								<Tooltip
									tooltipPosition='top'
									text='Desbloquear con suscripción de Nivel 1 y 2 en Twitch'
								>
									<Button
										as='a'
										href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
										className='py-1 bg-transparent border-transparent text-white/40'
										variant='secondary'
									>
										<TwitchIcon className='w-4 h-4' />
										Special
									</Button>
								</Tooltip>
							) : (
								<Tooltip
									tooltipPosition='top'
									text='Desbloqueado con suscripción de Nivel 1 y 2 en Twitch'
								>
									<Button
										onClick={async () => await handleChangeMaterial(MATERIALS_AVAILABLE.SPECIAL)}
										className={cn(
											'py-1 transition-all',
											MATERIALS_AVAILABLE.SPECIAL !== selectedMaterial &&
												'bg-transparent border-transparent'
										)}
										variant='secondary'
									>
										<TwitchIcon className='w-4 h-4' />
										Special
									</Button>
								</Tooltip>
							)}
							{twitchTier == null || Number(twitchTier) < 3 ? (
								<Tooltip
									tooltipPosition='top'
									text='Desbloquear con suscripción de Nivel 3 en Twitch'
								>
									<Button
										as='a'
										href={getTwitchAuthorizeUrl({ requiredTier: '3', currentTier: twitchTier })}
										className='py-1 bg-transparent border-transparent text-white/40'
										variant='secondary'
									>
										<TwitchIcon className='w-4 h-4' />
										Premium
									</Button>
								</Tooltip>
							) : (
								<Tooltip
									tooltipPosition='top'
									text='Desbloqueado con suscripción de Nivel 3 en Twitch'
								>
									<Button
										onClick={async () => await handleChangeMaterial(MATERIALS_AVAILABLE.PREMIUM)}
										className={cn(
											'py-1 transition-all',
											MATERIALS_AVAILABLE.PREMIUM !== selectedMaterial &&
												'bg-transparent border-transparent'
										)}
										variant='secondary'
									>
										<TwitchIcon className='w-4 h-4' />
										Premium
									</Button>
								</Tooltip>
							)}
						</div>
					</div>
					<div className='w-full z-[99999] opacity-[.99] mt-10 md:mt-2'>
						<h2 className='text-2xl font-bold text-white lg:pl-8'>Tecnología</h2>
						<div className='flex flex-row w-full p-8 max-h-[24rem] overflow-x-auto text-center flex-nowrap md:flex-wrap gap-x-8 gap-y-12 lg:pb-20 hidden-scroll lg:flavors-gradient-list'>
							{Object.entries(FLAVORS).map(([key, { icon: Icon }]) => {
								return (
									<Tooltip key={key} text={key} offsetNumber={16}>
										<button
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
									</Tooltip>
								)
							})}
						</div>
					</div>
					<div>
						<h2 className='mt-10 text-2xl font-bold text-white lg:pl-8'>
							Stickers <div></div>
						</h2>
						<div
							className={cn(
								'flex flex-row w-full p-8 max-h-[30rem] overflow-x-auto text-center flex-nowrap md:flex-wrap gap-x-8 gap-y-12 lg:pb-20 hidden-scroll h-40 relative',
								twitchTier == null && 'overflow-hidden'
							)}
							style={{
								maskImage: 'linear-gradient(to top, transparent, #000 40%)'
							}}
						>
							{twitchTier == null && (
								<Button
									as='a'
									href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
									target='_blank'
									variant='secondary'
									className='absolute text-sm -translate-x-1/2 -translate-y-1/2 text-balance left-1/2 top-1/2'
								>
									Desbloquear con suscripción en Twitch
								</Button>
							)}
							{STICKERS_LIST.map(({ name, StickerImage }) => (
								<button
									onClick={() => handleSelectSticker(StickerImage, name)}
									key={name}
									className={cn(
										twitchTier == null && 'user-select-none pointer-events-none opacity-20 -z-10'
									)}
								>
									<div
										className='flex items-center justify-center w-12 h-12 transition-all cursor-pointer hover:scale-125'
										key={name}
									>
										{StickerImage}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</main>
			<Modal onClose={handleCloseModal} isOpen={isModalOpen}>
				{tierQueryData?.tier === 'null' && tierQueryData?.error && (
					<div className='flex flex-col gap-2 py-8'>
						<TwitchIcon className='w-16 h-16 mx-auto mb-6 text-white' />
						<p className='text-lg font-semibold text-center text-white'>
							No has podido desbloquear el contenido especial
						</p>
						<p className='text-center text-white/80'>
							Solo los usuarios suscritos en Twitch con{' '}
							<a
								className='underline text-pallet-primary'
								target='_blank'
								href='https://twitch.tv/midudev'
							>
								midudev
							</a>{' '}
							tiene acceso a este ticket
						</p>
						<Button
							className='mx-auto mt-4'
							as='a'
							href='https://www.twitch.tv/subs/midudev'
							target='_blank'
						>
							<TwitchIcon className='w-4 h-4 text-white' />
							Suscribirse para desbloquear contenido especial
						</Button>
					</div>
				)}
				{['1', '2', '3'].includes(tierQueryData?.tier) && notAccessTier === 'false' && (
					<div className='flex flex-col gap-2 py-8'>
						<TwitchIcon className='w-16 h-16 mx-auto mb-6 text-white' />
						<p className='text-lg font-semibold text-center text-white'>¡Felicidades! 🚀</p>
						<p className='text-center text-white/80'>
							Has desbloqueado el contenido especial de nivel {tierQueryData?.tier} ⭐️
						</p>
						<p className='text-center text-white/80'>¡Ahora puedes personalizar más tu ticket!</p>
						<Button
							onClick={async () => {
								handleCloseModal()
								const materialToChange =
									tierQueryData?.tier === '3'
										? MATERIALS_AVAILABLE.PREMIUM
										: MATERIALS_AVAILABLE.SPECIAL

								await handleChangeMaterial(materialToChange)
							}}
							className='mx-auto mt-4'
						>
							Aceptar
						</Button>
					</div>
				)}
				{notAccessTier === 'true' && tierQueryData?.error === 'null' && (
					<div className='flex flex-col gap-2 py-8'>
						<TwitchIcon className='w-16 h-16 mx-auto mb-6 text-white' />
						<p className='text-lg font-semibold text-center text-white'>¡Ups!</p>
						<p className='text-center text-white/80'>No puedes desbloquear este contenido.</p>
						<p className='text-center text-white/80'>
							¡Para ello debes suscribirte con Nivel 3 en Twitch!
						</p>
						<Button
							className='mx-auto mt-4'
							as='a'
							href='https://www.twitch.tv/subs/midudev'
							target='_blank'
						>
							<TwitchIcon className='w-4 h-4 text-white' />
							Suscribirte en Twitch
						</Button>
					</div>
				)}
			</Modal>
			<Modal isOpen={isShowAchievementModal} onClose={() => setIsShowAchievementModal(false)}>
				<MiduLogo className='w-20 h-auto mx-auto mt-4' />
				<h2 className='mt-4 text-4xl text-center text-pallet-secondary text-pretty'>
					¡Logro conseguido!
				</h2>
				<p className='px-4 py-2 my-4 text-center border rounded-lg bg-pallet-primary/20 border-pallet-primary/20 text-pallet-secondary text-balance'>
					¡Si eres suscriptor de{' '}
					<a target='_blank' href='https://twitch.tv/midudev' className='underline'>
						midudev
					</a>{' '}
					en Twitch, podrás ver en{' '}
					<a href='https://midu.dev/usuario' target='_blank' className='underline'>
						midu.dev
					</a>{' '}
					tu nuevo logro!
				</p>
			</Modal>
		</Layout>
	)
}

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

export const STICKERS_LIST = [
	{
		name: 'midu-wink',
		StickerImage: <Stickers.MiduWink className='w-auto h-12' />
	},
	{
		name: 'midu-boss',
		StickerImage: <Stickers.MiduBoss className='w-auto h-12' />
	},
	{
		name: 'midu-hype',
		StickerImage: <Stickers.MiduHype className='w-auto h-12' />
	},
	{
		name: 'midu-wtf',
		StickerImage: <Stickers.MiduWtf className='w-auto h-12' />
	},
	{
		name: 'midu-f',
		StickerImage: <Stickers.MiduF className='w-auto h-12' />
	},
	{
		name: 'midu-not-like-this',
		StickerImage: <Stickers.MiduNotLikeThis className='w-auto h-12' />
	},
	{
		name: 'midu-angry',
		StickerImage: <Stickers.MiduAngry className='w-auto h-12' />
	},
	{
		name: 'midu-lul',
		StickerImage: <Stickers.MiduLul className='w-auto h-12' />
	},
	{
		name: 'midu-snif',
		StickerImage: <Stickers.MiduSnif className='w-auto h-12' />
	},
	{
		name: 'midu-wow',
		StickerImage: <Stickers.MiduWow className='w-auto h-12' />
	},
	{
		name: 'midu-love',
		StickerImage: <Stickers.MiduLove className='w-auto h-12' />
	},
	{
		name: 'start',
		StickerImage: <Stickers.Start className='w-12 h-auto' />
	},
	{
		name: 'mario',
		StickerImage: <Stickers.Mario className='w-auto h-12' />
	},
	{
		name: 'glasses',
		StickerImage: <Stickers.Glasses className='w-12 h-auto' />
	},
	{
		name: 'midudev',
		StickerImage: <Stickers.Midu className='w-12 h-auto' />
	},
	{
		name: 'libro-git',
		StickerImage: <Stickers.LibroGit className='w-auto h-12' />
	},
	{
		name: 'vercel',
		StickerImage: <Stickers.Vercel className='w-12 h-auto' />
	},
	{
		name: 'this-is-fine',
		StickerImage: <Stickers.ThisIsFine className='w-auto h-12' />
	},
	{
		name: 'platzi',
		StickerImage: <Stickers.Platzi className='w-auto h-12' />
	},
	{
		name: 'don-dominio',
		StickerImage: <Stickers.DonDominio className='w-auto h-12' />
	},
	{
		name: 'lemon-code',
		StickerImage: <Stickers.LemonCode className='w-12 h-14' />
	},
	{
		name: 'keep-coding',
		StickerImage: <Stickers.KeepCoding className='w-12 h-12' />
	},
	{
		name: 'malt',
		StickerImage: <Stickers.Malt className='w-12 h-auto' />
	},
	{
		name: 'cloudinary',
		StickerImage: <Stickers.Cloudinary className='w-12 h-auto' />
	},
	{
		name: 'twitch',
		StickerImage: <Stickers.Twitch className='w-12 h-12' />
	}
]

const handleCreateTicketImage = async ({
	supabase,
	selectedFlavorKey,
	userId,
	username,
	ticketNumber,
	material,
	stickers
}) => {
	// update ticket in supabase
	const { error } = await supabase
		.from('ticket')
		.update({ flavour: selectedFlavorKey, user_id: userId, material, stickers })
		.eq('user_name', username)

	const dataURL = await toJpeg(document.getElementById('ticket'), {
		quality: 0.8
	})

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

	return {
		dataURL,
		file,
		filename
	}
}

const handleShare = async ({ username, hash }) => {
	const intent = 'https://twitter.com/intent/tweet'
	const text = `¡No te pierdas la miduConf!

👩‍💻 Conferencia de programación gratuita
🔥 Speakers TOP internacionales
🎁 +256 regalos para todos
...¡y muchas sorpresas más!

Apunta la fecha: 12 de SEPTIEMBRE

miduconf.com/ticket/${username}/${hash}`

	window.open(`${intent}?text=${encodeURIComponent(text)}`)
}

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

const useTicketSave = ({ buttonStatus, isMaterialChange }) => {
	const [generatedImage, setGeneratedImage] = useState(null)

	const saveButtonText = useMemo(() => {
		if (buttonStatus === STEPS_LOADING.generate) return 'Creando...'
		return 'Guardar'
	}, [buttonStatus])

	useEffect(() => {
		toJpeg(document.getElementById('ticket'), {
			quality: 0.8
		}).then(handleSaveImage)
	}, [isMaterialChange])

	const handleSaveImage = (dataURL) => {
		setGeneratedImage(dataURL)
	}

	return { generatedImage, handleSaveImage, saveButtonText }
}

function getTwitchAuthorizeUrl({ requiredTier = '1', currentTier }) {
	const redirectUrl =
		process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://www.miduconf.com'

	const authorizeTwitchUrl = new URL('https://id.twitch.tv/oauth2/authorize')
	authorizeTwitchUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)

	const redirectUri = new URL(
		`${redirectUrl}/api/special-ticket/twitch${currentTier == null ? '/' : ''}`
	)
	const requiredTierToSend = requiredTier === '2' ? '1' : requiredTier
	if (currentTier != null) redirectUri.searchParams.append('requiredTier', requiredTierToSend)

	authorizeTwitchUrl.searchParams.append('redirect_uri', redirectUri.href)
	authorizeTwitchUrl.searchParams.append('', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)

	authorizeTwitchUrl.searchParams.append('scope', 'user:read:subscriptions')
	authorizeTwitchUrl.searchParams.append('response_type', 'code')

	return authorizeTwitchUrl.href
}

function getTwitchAuthorizeUrlForAchievement() {
	const redirectUrl =
		process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://www.miduconf.com'

	const authorizeTwitchUrl = new URL('https://id.twitch.tv/oauth2/authorize')
	authorizeTwitchUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)

	const redirectUri = new URL(`${redirectUrl}/api/twitch/signin/`)

	authorizeTwitchUrl.searchParams.append('redirect_uri', redirectUri.href)
	authorizeTwitchUrl.searchParams.append('', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID)

	authorizeTwitchUrl.searchParams.append('scope', 'user:read:subscriptions')
	authorizeTwitchUrl.searchParams.append('response_type', 'code')

	return authorizeTwitchUrl.href
}

export const getServerSideProps = async (ctx) => {
	// Create authenticated Supabase Client
	const supabase = createPagesServerClient(ctx)

	const tierLevelFromQueryParam = ctx.query?.tier
	const tierErrorFromQueryParam = ctx.query?.error
	const notAccessTier = ctx.query?.notAccessTier ?? null

	const { 'achievement-saved': isAchievementOfAcademySaved } = ctx.query

	const tierQueryData =
		tierLevelFromQueryParam == null && tierErrorFromQueryParam == null
			? null
			: {
					tier: tierLevelFromQueryParam,
					error: tierErrorFromQueryParam
			  }

	let selectedFlavor = 'javascript'
	let ticketNumber = 0
	let twitchTier = null
	let stickers = ['null', 'null', 'null']
	let material = 'standard'

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

	/* const userId = session?.user?.id */
	/* const metadata = session?.user?.user_metadata ?? {} */
	/* const { full_name: userFullName, preferred_username: username } = metadata */

	let userHadPreviousTicket = false

	// if no ticket present, create one
	if (data.length === 0) {
		console.info('[info] No ticket. Creating for user {')
		/* const { error } = await supabase.from('ticket').insert({
			flavour: 'javascript',
			id: session.user.id,
			user_fullname: userFullName,
			user_id: userId,
			user_name: username ?? userFullName
		})

		if (error) console.error(error) */

		/* const { data } = await supabase.from('ticket').select('ticket_number').eq('id', session.user.id)
		const [ticketInfo] = data
		ticketNumber = ticketInfo.ticket_number || 0 */

		return {
			redirect: {
				destination: '/?no-user',
				permanent: false
			}
		}
	} else {
		userHadPreviousTicket = true
		const [ticketInfo] = data
		selectedFlavor = ticketInfo.flavour || 'javascript'
		ticketNumber = ticketInfo.ticket_number || 0
		twitchTier = ticketInfo.twitch_tier
		stickers = ticketInfo.stickers
		material = ticketInfo.material
	}

	return {
		props: {
			userHadPreviousTicket,
			selectedFlavor,
			showAcheivementModal: isAchievementOfAcademySaved != null,
			ticketNumber,
			initialSession: session,
			user: getInfoFromUser({ user: session?.user }),
			twitchTier,
			material,
			notAccessTier,
			stickers,
			tierQueryData
		}
	}
}
