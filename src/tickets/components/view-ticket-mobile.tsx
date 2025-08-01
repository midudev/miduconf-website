import { useState } from 'react'
import { ShareTicketPanel } from './share-ticket-panel'
import { TicketCard } from './ticket-card'
import { DraggablePanel } from '@/components/DraggablePanel'
import { SelectHologramPanel } from './select-hologram-panel'
import { TicketDesign } from '../types/ticket-design'
import { HologramOption } from '../types/hologram-option'

interface Props {
  twitchTier: '1' | '2' | '3' | null
  midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
  ticketDOMContnet: HTMLElement | null
  ticketOGImageElement: HTMLElement | null
  username: string
  fullname: string
  ticketNumber: number
  ticketDesign: TicketDesign
  midudevTokentId: string
  handleChangeHologram: (hologram: HologramOption) => void
}

export const ViewTicketMobile = ({
  twitchTier,
  ticketDOMContnet,
  username,
  fullname,
  ticketNumber,
  ticketDesign,
  ticketOGImageElement,
  midudevTokentId,
  midudevTypeSub,
  handleChangeHologram
}: Props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <div className='relative w-full min-h-screen lg:hidden'>
      {!isPanelOpen && (
        <div className='absolute z-40 left-1/2 -translate-x-1/2 top-[85px] sm:left-4 sm:top-[40%] sm:translate-x-0'>
          <ShareTicketPanel
            ticketDesign={ticketDesign}
            ticketDOMContnet={ticketDOMContnet}
            username={username}
            className='flex-row sm:flex-col'
          />
        </div>
      )}

      <div
        className={`flex items-center justify-center p-4 md:p-8 ${
          isPanelOpen ? 'h-[calc(100vh-55vh)] pt-20' : 'min-h-screen pb-20 pt-32'
        }`}
      >
        <div
          className={`transition-transform duration-300 ${
            isPanelOpen ? 'scale-[0.55] sm:scale-[0.6] md:scale-[0.65]' : 'scale-100'
          }`}
        >
          <TicketCard
            fullname={fullname}
            ticketNumber={ticketNumber}
            username={username}
            hologram={ticketDesign.hologram}
          />
        </div>
      </div>

      <DraggablePanel
        title='Personaliza tu ticket'
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
      >
        <h1 className='text-2xl font-bold normal-case'>Personaliza tu ticket</h1>
        <div className='relative min-h-[400px]'>
          <SelectHologramPanel
            midudevTypeSub={midudevTypeSub}
            ticketNumber={ticketNumber}
            ticketOGImageElement={ticketOGImageElement}
            username={username}
            twitchTier={twitchTier}
            ticketDesign={ticketDesign}
            midudevTokentId={midudevTokentId}
            handleChangeHologram={handleChangeHologram}
          />
          {/* <SelectStickerPanel
                ticketDesign={ticketDesign}
                handleChangeSticker={handleChangeSticker}
              /> */}
        </div>
      </DraggablePanel>
    </div>
  )
}
