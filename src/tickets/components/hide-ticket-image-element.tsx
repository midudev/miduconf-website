import { RefObject } from 'react'
import { TicketCard } from './ticket-card'
import { HologramOption } from '../types/hologram-option'
import { ColorOption } from '../types/color-option'

interface Props {
  hologram: HologramOption
  color?: ColorOption
  fullname: string
  ticketNumber: number
  username: string
  ref: RefObject<HTMLElement | null>
}

export const HideTicketImageElement = ({
  fullname,
  username,
  ticketNumber,
  hologram,
  color,
  ref
}: Props) => {
  return (
    <div className='absolute -left-[1000vw] '>
      <section className='relative h-auto text-white w-max' aria-disabled ref={ref}>
        <TicketCard
          fullname={fullname}
          ticketNumber={ticketNumber}
          username={username}
          hologram={hologram}
          color={color}
        />
      </section>
    </div>
  )
}
