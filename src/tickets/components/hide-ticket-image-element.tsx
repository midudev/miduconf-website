import { RefObject } from 'react'
import { TicketCard } from './ticket-card'

interface Props {
  fullname: string
  ticketNumber: number
  username: string
  ref: RefObject<HTMLElement | null>
}

export const HideTicketImageElement = ({ fullname, username, ticketNumber, ref }: Props) => {
  return (
    <div className='absolute -left-[200vw]'>
      <section className='relative h-auto text-white w-max' aria-disabled ref={ref}>
        <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={username} />
      </section>
    </div>
  )
}
