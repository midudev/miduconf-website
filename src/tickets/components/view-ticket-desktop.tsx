import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { SelectStructurePanel } from './select-structure-panel'
import { SelectColorPanel } from './select-color-panel'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectAnimationPanel } from './select-animation-panel'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PencilIcon } from '../icons/structure-ticket/pencil'
import { Button } from '@/components/Button'
import { useState } from 'react'
import { StickerOption } from '../types/sticker-option'
import { ColorOption } from '../types/color-option'
import { AnimationType, StructureType } from '../animations'
import { StructureOpcion } from '../types/structure-option'
import { AnimationOption } from '../types/animation-option'
import { cn } from '@/lib/utils'
import { AtroposSyncProvider } from '../context/AtroposSync'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { getTwitchAuthorizeUrl } from '@/twitch/utils/get-twitch-authorize-url'

interface Props {
	ticketDOMContnet: HTMLElement | null
	ticketOGImageElement: HTMLElement | null
	username: string
	midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
	twitchTier: '1' | '2' | '3' | null
	fullname: string
	ticketNumber: number
	ticketDesign: TicketDesign
	midudevTokentId: string
	handleChangeHologram: (hologram: HologramOption) => void
	handleChangeSticker: (sticker: StickerOption) => void
	handleChangeColor?: (color: ColorOption) => void
}

export const ViewTicketDesktop = ({
	ticketDOMContnet,
	ticketOGImageElement,
	username,
	fullname,
	ticketNumber,
	ticketDesign,
	twitchTier,
	midudevTokentId,
	midudevTypeSub,
	handleChangeHologram,
	handleChangeSticker,
	handleChangeColor
}: Props) => {
	const [isPanelMinimized, setIsPanelMinimized] = useState(false)
	const [selectedStructure, setSelectedStructure] = useState<StructureType>('box')
	const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>(() => {
		// Initialize with current animation from ticketDesign
		const mapping: Record<string, AnimationType> = {
			'default': 'default',
			'piramide': 'pyramid',
			'friccion': 'friction'
		}
		return mapping[ticketDesign.animation] || 'default'
	})

	const handleChangeAnimation = (animation: AnimationType) => {
		setSelectedAnimation(animation)
	}


	// Map between the two type systems
	const mapStructureToOpcion = (structure: StructureType): StructureOpcion => {
		const mapping: Record<StructureType, StructureOpcion> = {
			'box': 'box',
			'circle': 'circle',
			'piramide': 'piramide',
			'prism': 'prism',
			'background': 'background',
			'heart': 'heart'
		}
		return mapping[structure] || 'box'
	}

	const mapOpcionToStructure = (opcion: StructureOpcion): StructureType => {
		const mapping: Record<StructureOpcion, StructureType> = {
			'box': 'box',
			'circle': 'circle',
			'piramide': 'piramide',
			'prism': 'prism',
			'background': 'background',
			'heart': 'heart'
		}
		return mapping[opcion] || 'box'
	}

	const handleChangeStructure = (opcion: StructureOpcion) => {
		const newStructure = mapOpcionToStructure(opcion)
		setSelectedStructure(newStructure)
	}

	// Map between AnimationType and AnimationOption
	const mapAnimationToOption = (animationType: AnimationType): AnimationOption => {
		const mapping: Record<AnimationType, AnimationOption> = {
			'default': 'default' as AnimationOption,
			'pyramid': 'piramide' as AnimationOption,
			'friction': 'friccion' as AnimationOption
		}
		return mapping[animationType] || 'default' as AnimationOption
	}

	const mapOptionToAnimation = (option: AnimationOption): AnimationType => {
		const mapping: Record<string, AnimationType> = {
			'default': 'default',
			'piramide': 'pyramid',
			'friccion': 'friction'
		}
		return mapping[option] || 'default'
	}

	// Create ticketDesign object for SelectStructurePanel
	const extendedTicketDesign = {
		...ticketDesign,
		structure: mapStructureToOpcion(selectedStructure),
		animation: mapAnimationToOption(selectedAnimation)
	}
	return (
		<AtroposSyncProvider>
			<div className={`hidden lg:flex lg:items-center lg:justify-center lg:min-h-screen lg:w-full mx-auto py-8 pt-20 relative transition-all duration-500 ease-in-out ${isPanelMinimized ? 'px-8' : 'pl-8 pr-96'
				}`}>
				{/* Share Panel - Absolute Left */}
				<div className='absolute left-4 top-24'>
					<ShareTicketPanel
						ticketDesign={ticketDesign}
						ticketDOMContnet={ticketDOMContnet}
						username={username}
					/>
				</div>

				{/* <div className='absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-4'>
				<Button
					variant='default'
					className='flex items-center justify-center w-full gap-2 py-2 text-lg uppercase'
				>
					<EnterArrow className='w-4 h-4' />
					Guardar
				</Button>
				<Button
					variant='secondary'
					className='w-full py-2 text-lg uppercase'
					onClick={() => setIsPanelMinimized(true)}
				>
					Cancelar
				</Button>
			</div> */}

				{/* Ticket - Always Centered */}
				<div className='flex items-center justify-center'>
					<Container3D>
						<TicketCard
							fullname={fullname}
							ticketNumber={ticketNumber}
							username={username}
							hologram={ticketDesign.hologram}
							color={ticketDesign.color}
							structure={selectedStructure}
							animation={selectedAnimation}
						/>
					</Container3D>
				</div>

				{/* Customization Panel - Animated Slide */}
				<div className={`absolute right-4 top-[5.5rem] w-[25rem] h-[calc(100vh-7rem)] transition-all duration-500 ease-in-out flex flex-col ${isPanelMinimized
					? 'transform translate-x-full opacity-0 pointer-events-none mr-8'
					: 'transform translate-x-0 opacity-100 mr-0'
					}`}>
					<div className='p-4 border rounded-md border-palette-border-foreground bg-palette-bg-foreground-primary flex-1 overflow-auto custom-scroll flex flex-col'>
						<div className='flex items-center justify-between mb-8'>
							<h2 className='text-2xl normal-case font-medium text-white'>Personaliza tu ticket</h2>
							<Button
								variant='icon'
								size='small'
								onClick={() => setIsPanelMinimized(true)}
								containerClassName='bg-palette-primary hover:bg-palette-primary/80'
								aria-label='Minimizar panel'
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</Button>
						</div>

						{/* Connection Status Buttons */}
						<div className='mb-6 flex flex-col gap-4'>
							<h4 className='uppercase text-sm font-medium text-palette-ghost tracking-wide'>Vincula tu cuenta</h4>
							{/* Academia Connection Button */}
							<div className='flex gap-3'>
								{midudevTypeSub ? (
									<Button
										variant='default'
										size='small'
										className='py-3 px-4 bg-palette-primary hover:bg-palette-primary/80 text-white font-medium text-sm uppercase tracking-wide'
										disabled={true}
									>
										<div className='flex items-center justify-center gap-2'>
											<WhiteMidudevLogo className='size-5' />
											ACADEMIA
										</div>
									</Button>
								) : (
									<Button
										variant='default'
										size='small'
										href={`https://midu.dev/miduconf/ticket/${midudevTokentId}`}
										target='_blank'
										rel='noopener noreferrer'
										as='a'
									>
										<div className='uppercase text-sm flex items-center justify-center gap-2'>
											<WhiteMidudevLogo className='size-5' />
											Academia
										</div>
									</Button>
								)}

								{/* Twitch Connection Button */}
								{twitchTier ? (
									<Button
										variant='ghost'
										size='small'
										className='py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm uppercase tracking-wide border border-purple-600'
										disabled={true}
									>
										<div className='flex items-center justify-center gap-2'>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
												<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
											</svg>
											TWITCH TIER {twitchTier}
										</div>
									</Button>
								) : (
									<Button
										variant='ghost'
										size='small'
										className='py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm uppercase tracking-wide border border-purple-600'
										href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
										target='_blank'
										rel='noopener noreferrer'
										as='a'
									>
										<div className='flex items-center justify-center gap-2'>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
												<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
											</svg>
											TWITCH
										</div>
									</Button>
								)}
							</div>
						</div>
						<div className='relative flex-1 space-y-6'>
							{/* ANIMACIÓN Section */}
							<SelectAnimationPanel
								selectedAnimation={selectedAnimation}
								handleChangeAnimation={handleChangeAnimation}
							/>

							{/* ESTRUCTURA Section */}
							<SelectStructurePanel
								ticketDesign={extendedTicketDesign}
								handleChangeStructure={handleChangeStructure}
							/>

							{/* COLORES Section */}
							<SelectColorPanel
								ticketDesign={ticketDesign}
								handleChangeColor={handleChangeColor || (() => { })}
							/>

							{/* HOLOGRÁFICO Section */}
							<SelectHologramPanel
								ticketDesign={ticketDesign}
								twitchTier={twitchTier}
								midudevTypeSub={midudevTypeSub}
								username={username}
								ticketNumber={ticketNumber}
								midudevTokentId={midudevTokentId}
								ticketOGImageElement={ticketOGImageElement}
								handleChangeHologram={handleChangeHologram}
								handleChangeSticker={handleChangeSticker}
							/>
						</div>
					</div>
				</div>

				{/* Floating Pencil Button */}
				{isPanelMinimized && (
					<div className='absolute top-24 right-8 z-50 animate-in fade-in slide-in-from-right-5'>
						<Button
							variant='icon'
							onClick={() => setIsPanelMinimized(false)}
							containerClassName='bg-palette-bg-foreground-secondary hover:bg-palette-bg-foreground-secondary/80 border border-palette-border-foreground shadow-lg hover:shadow-xl transition-all duration-300'
							aria-label='Mostrar panel de personalización'
						>
							<PencilIcon className='w-5 h-5 text-palette-text-primary' />
						</Button>
					</div>
				)}
			</div>
		</AtroposSyncProvider>
	)
}
