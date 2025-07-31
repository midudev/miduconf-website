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

interface Props {
  ticketDOMContnet: HTMLElement | null
  ticketOGImageElement: HTMLElement | null
  username: string
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
  handleChangeHologram,
  handleChangeSticker
}: Props) => {
  return (
    <div className='hidden lg:flex lg:items-center lg:justify-between lg:min-h-[80vh] lg:w-full mx-auto px-8 py-8 pt-20'>
      <div className='relative'>
        <ShareTicketPanel
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketDOMContnet}
          username={username}
        />
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
    </div>
  )
}
