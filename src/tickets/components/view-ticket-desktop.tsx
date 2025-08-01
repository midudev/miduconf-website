import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { SelectHologramPanel } from './select-hologram-panel'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PencilIcon } from '../icons/structure-ticket/pencil'
import { Button } from '@/components/Button'
import { EnterArrow } from '@/components/icons/enter-arrow'
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
	handleChangeHologram
}: Props) => {
	const [isPanelMinimized, setIsPanelMinimized] = useState(false)
	return (
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

			<div className='absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-4'>
				<Button
					variant='default'
					className='uppercase text-lg w-full py-2 flex items-center justify-center gap-2'
				>
					<EnterArrow className='w-4 h-4' />
					Guardar
				</Button>
				<Button
					variant='secondary'
					className='uppercase text-lg w-full py-2'
					onClick={() => setIsPanelMinimized(true)}
				>
					Cancelar
				</Button>
			</div>

			{/* Ticket - Always Centered */}
			<div className='flex items-center justify-center'>
				<Container3D>
					<TicketCard
						fullname={fullname}
						ticketNumber={ticketNumber}
						username={username}
						hologram={ticketDesign.hologram}
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
						<h2 className='text-2xl normal-case font-semibold text-pretty'>Personaliza tu ticket</h2>
						<Button
							variant='icon'
							size='small'
							onClick={() => setIsPanelMinimized(true)}
							containerClassName='bg-palette-bg-foreground-secondary hover:bg-palette-bg-foreground-secondary/80'
							aria-label='Minimizar panel'
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</Button>
					</div>
					<div className='relative flex-1'>
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
	)
}
