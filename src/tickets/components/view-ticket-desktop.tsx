import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { DiamondIcon } from '@/components/icons/diamond'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectStickerPanel } from './select-sticker-panel'
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
          <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={username} />
        </Container3D>
      </div>

      <div className='sticky flex-shrink-0 top-8 w-80'>
        <div className='p-6 border rounded-xl border-pallet-border-foreground bg-pallet-b-foreground-primary max-h-[calc(100dvh_-_140px)]'>
          <h2 className='mb-6 text-3xl font-semibold text-pretty'>Personaliza tu ticket</h2>
          <div className='relative min-h-[400px]'>
            <div className='absolute inset-0 z-10 flex items-center justify-center'>
              <p className='flex items-center gap-2 px-4 py-2 text-xl font-medium text-center uppercase border rounded-lg font-ibm-plex bg-pallet-b-foreground-primary border-pallet-border-foreground'>
                <DiamondIcon className='w-auto h-4' />
                Muy pronto
                <DiamondIcon className='w-auto h-4' />
              </p>
            </div>
            <div className='opacity-20 [mask-image:linear-gradient(#000_20%,_transparent)] select-none pointer-events-none'>
              <SelectHologramPanel
                ticketDesign={ticketDesign}
                handleChangeHologram={handleChangeHologram}
              />
              <SelectStickerPanel
                ticketDesign={ticketDesign}
                handleChangeSticker={handleChangeSticker}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
