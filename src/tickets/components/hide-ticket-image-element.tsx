import { RefObject } from 'react'
import { TicketCard } from './ticket-card'
import { HologramOption } from '../types/hologram-option'

interface Props {
  hologram: HologramOption
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
        />
      </section>
    </div>
  )
}
