import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { SelectHologramPanel } from './select-hologram-panel'
import { TicketDesign } from '../types/ticket-design'
import { HologramOption } from '../types/hologram-option'
import { StickerOption } from '../types/sticker-option'

interface Props {
	ticketDOMContnet: HTMLElement | null
	username: string
	fullname: string
	ticketNumber: number
	ticketDesign: TicketDesign
	handleChangeHologram: (hologram: HologramOption) => void
	handleChangeSticker: (sticker: StickerOption) => void
}

export const ViewTicketDesktop = ({
	ticketDOMContnet,
	username,
	fullname,
	ticketNumber,
	ticketDesign,
	handleChangeHologram,
	handleChangeSticker
}: Props) => {
	return (
		<div className='hidden lg:flex lg:items-start lg:justify-between lg:min-h-[80vh] lg:w-full mx-auto px-8 py-8 pt-20'>
			<div className='relative'>
				<ShareTicketPanel ticketDOMContnet={ticketDOMContnet} username={username} />
			</div>

			<div className='flex items-center justify-center flex-1 px-16 min-h-[80vh]'>
				<Container3D>
					<TicketCard
						fullname={fullname}
						ticketNumber={ticketNumber}
						username={username}
						hologram={ticketDesign.hologram}
					/>
				</Container3D>
			</div>

			<div className='sticky flex-shrink-0 top-8 w-80'>
				<div className='p-6 border rounded-xl border-pallet-border-foreground bg-pallet-b-foreground-primary max-h-[calc(100dvh_-_140px)] overflow-auto custom-scroll'>
					<h2 className='mb-6 text-3xl font-semibold text-pretty'>Personaliza tu ticket</h2>
					<div className='relative min-h-[400px]'>
						<SelectHologramPanel
							ticketDesign={ticketDesign}
							handleChangeHologram={handleChangeHologram}
						/>
						{/* <SelectStickerPanel
              ticketDesign={ticketDesign}
              handleChangeSticker={handleChangeSticker}
            /> */}
					</div>
				</div>
			</div>
		</div>
	)
}
