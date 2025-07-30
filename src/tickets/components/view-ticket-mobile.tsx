import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { DraggablePanel } from '@/components/DraggablePanel'
import { DiamondIcon } from '@/components/icons/diamond'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectStickerPanel } from './select-sticker-panel'
import { TicketDesign } from '../types/ticket-design'
import { HologramOption } from '../types/hologram-option'
import { StickerOption } from '../types/sticker-option'

interface Props {
  twitchTier: '1' | '2' | '3' | null
  ticketDOMContnet: HTMLElement | null
  ticketOGImageElement: HTMLElement | null
  username: string
  fullname: string
  ticketNumber: number
  ticketDesign: TicketDesign
  handleChangeHologram: (hologram: HologramOption) => void
  handleChangeSticker: (sticker: StickerOption) => void
}

export const ViewTicketMobile = ({
  twitchTier,
  ticketDOMContnet,
  username,
  fullname,
  ticketNumber,
  ticketDesign,
  ticketOGImageElement,
  handleChangeHologram,
  handleChangeSticker
}: Props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <div className='relative w-full min-h-screen lg:hidden'>
      <div
        className={cn(
          'absolute z-40 transition',
          isPanelOpen
            ? 'hidden'
            : 'left-1/2 -translate-x-1/2 top-[100px] md:left-4 md:top-[40%] md:translate-x-0'
        )}
      >
        <ShareTicketPanel
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketDOMContnet}
          username={username}
          className={cn(isPanelOpen ? 'flex-row' : 'flex-row md:flex-col')}
        />
      </div>

      <div
        className={`flex items-center justify-center transition-all duration-300 ${
          isPanelOpen ? 'h-[50vh]' : 'min-h-screen pb-20 pt-32 px-4'
        }`}
      >
        <div
          className={cn(
            'transition-transform duration-300 rounded-2xl overflow-hidden',
            isPanelOpen ? 'scale-[0.6] pt-16' : 'scale-90 sm:scale-100'
          )}
        >
          <Container3D>
            <TicketCard
              fullname={fullname}
              ticketNumber={ticketNumber}
              username={username}
              hologram={ticketDesign.hologram}
            />
          </Container3D>
        </div>
      </div>

      <DraggablePanel
        title='Personaliza tu ticket'
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
      >
        <div className='p-6'>
          <div className='relative min-h-[400px]'>
            <SelectHologramPanel
              ticketNumber={ticketNumber}
              ticketOGImageElement={ticketOGImageElement}
              username={username}
              twitchTier={twitchTier}
              ticketDesign={ticketDesign}
              handleChangeHologram={handleChangeHologram}
            />
            {/* <SelectStickerPanel
                ticketDesign={ticketDesign}
                handleChangeSticker={handleChangeSticker}
              /> */}
          </div>
        </div>
      </DraggablePanel>
    </div>
  )
}
