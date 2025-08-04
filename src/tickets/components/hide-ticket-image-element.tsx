import { RefObject } from 'react'
import { TicketCard } from './ticket-card'
import { HologramOption } from '../types/hologram-option'
import { cn } from '@/lib/utils'

interface Props {
  hologram: HologramOption
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
        />
      </section>
    </div>
  )
}
