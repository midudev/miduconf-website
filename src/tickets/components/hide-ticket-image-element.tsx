import { RefObject } from 'react'
import { TicketCard } from './ticket-card'
import { HologramOption } from '../types/hologram-option'
import { ColorOption } from '../types/color-option'
import { AnimationType, StructureType } from '../animations'
import { cn } from '@/lib/utils'
import { StickerOption } from '../types/sticker-option'

interface Props {
  hologram: HologramOption
  color?: ColorOption
  sticker?: Array<StickerOption | null> | null
  structure?: StructureType
  animation?: AnimationType
  fullname: string
  ticketNumber: number
  username: string
  refElement: RefObject<HTMLElement | null>
  noHidden?: boolean
}

export const HideTicketImageElement = ({
  fullname,
  username,
  ticketNumber,
  hologram,
  color,
  structure,
  sticker,
  animation,
  noHidden = false,
  refElement
}: Props) => {
  return (
    <div className={cn(!noHidden && 'absolute -left-[1000vw]')}>
      <section className='relative h-auto text-white w-max' aria-disabled ref={refElement}>
        <TicketCard
          fullname={fullname}
          ticketNumber={ticketNumber}
          username={username}
          hologram={hologram}
          stickers={sticker}
          color={color}
          structure={structure}
          animation={animation}
        />
      </section>
    </div>
  )
}
