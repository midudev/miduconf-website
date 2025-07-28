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
  ticketDOMContnet: HTMLElement | null
  username: string
  fullname: string
  ticketNumber: number
  ticketDesign: TicketDesign
  handleChangeHologram: (hologram: HologramOption) => void
  handleChangeSticker: (sticker: StickerOption) => void
}

export const ViewTicketMobile = ({
  ticketDOMContnet,
  username,
  fullname,
  ticketNumber,
  ticketDesign,
  handleChangeHologram,
  handleChangeSticker
}: Props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <div className='relative w-full min-h-screen lg:hidden'>
      <div
        className={cn(
          'absolute z-40 -translate-x-1/2 top-16 transition',
          isPanelOpen ? 'left-6 translate-x-0' : 'left-1/2 -translate-x-1/2'
        )}
      >
        <ShareTicketPanel
          ticketDOMContnet={ticketDOMContnet}
          username={username}
          className={cn(isPanelOpen ? 'flex-col' : 'flex-row')}
        />
      </div>

      <div
        className={`flex items-center justify-center transition-all duration-300 ${
          isPanelOpen ? 'h-[50vh]' : 'min-h-screen pb-20 pt-32 px-4'
        }`}
      >
        <div
          className={cn(
            'transition-transform duration-300',
            isPanelOpen ? 'scale-[0.6] pt-16' : 'scale-90 sm:scale-100'
          )}
        >
          <Container3D>
            <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={username} />
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
      </DraggablePanel>
    </div>
  )
}
