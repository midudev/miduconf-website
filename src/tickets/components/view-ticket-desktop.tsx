import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectStickerPanel } from './select-sticker-panel'
import { HologramOption } from '../types/hologram-option'
import { StickerOption } from '../types/sticker-option'
import { TicketDesign } from '../types/ticket-design'
import { Button } from '@/components/Button'
import { TwitchIcon } from '@/components/icons/twitch'
import { PencilIcon } from '../icons/structure-ticket/pencil'
import { useState } from 'react'

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
	handleChangeSticker
}: Props) => {
	const [isPanelMinimized, setIsPanelMinimized] = useState(false)
	return (
		<div className='hidden lg:flex lg:items-center lg:justify-between lg:min-h-[80vh] lg:w-full mx-auto px-8 py-8 pt-20 relative'>
			<div className='relative'>
				<ShareTicketPanel
					ticketDesign={ticketDesign}
					ticketDOMContnet={ticketDOMContnet}
					username={username}
				/>
			</div>
			<div className={`flex items-center justify-center min-h-[80vh] transition-all duration-500 ease-in-out ${isPanelMinimized ? 'flex-1 px-8 ml-64' : 'flex-1 px-16'
				}`}>
				<Container3D>
					<TicketCard
						fullname={fullname}
						ticketNumber={ticketNumber}
						username={username}
						hologram={ticketDesign.hologram}
					/>
				</Container3D>
			</div>

			<div className={`sticky top-8 w-80 transition-all duration-500 ease-in-out ${isPanelMinimized
				? 'transform translate-x-full opacity-0 pointer-events-none'
				: 'transform translate-x-0 opacity-100'
				}`}>
				<div className='p-6 border rounded-xl border-palette-border-foreground bg-palette-bg-foreground-primary max-h-[calc(100dvh_-_140px)] overflow-auto custom-scroll'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-3xl font-semibold text-pretty'>Personaliza tu ticket</h2>
						<button
							onClick={() => setIsPanelMinimized(true)}
							className='p-2 hover:bg-palette-bg-foreground-secondary rounded-lg transition-colors'
							aria-label='Minimizar panel'
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					</div>
					<div className='relative min-h-[400px]'>
						<SelectHologramPanel
							midudevTypeSub={midudevTypeSub}
							ticketNumber={ticketNumber}
							ticketOGImageElement={ticketOGImageElement}
							username={username}
							ticketDesign={ticketDesign}
							twitchTier={twitchTier}
							midudevTokentId={midudevTokentId}
							handleChangeHologram={handleChangeHologram}
						/>
						{/* <SelectStickerPanel
              ticketDesign={ticketDesign}
              handleChangeSticker={handleChangeSticker}
            /> */}
					</div>
				</div>
			</div>

			{isPanelMinimized && (
				<button
					onClick={() => setIsPanelMinimized(false)}
					className='fixed top-24 right-8 p-4 bg-palette-bg-foreground-primary border border-palette-border-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-in fade-in slide-in-from-right-5'
					aria-label='Mostrar panel de personalización'
				>
					<PencilIcon className='w-6 h-6 text-palette-text-primary' />
				</button>
			)}
		</div>
	)
}
