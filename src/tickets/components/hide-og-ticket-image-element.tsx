import { RefObject, useLayoutEffect } from 'react'
import { TicketCard } from './ticket-card'
import { cn } from '@/lib/utils'
import { HologramOption } from '../types/hologram-option'
import { useUpdateTicketImageInDB } from '../hooks/use-update-ticket-image-in-db'
import { createTicketImage } from '../utils/create-ticket-image'

interface Props {
  hologram: HologramOption
  fullname: string
  ticketNumber: number
  ref: RefObject<HTMLElement | null>
  username: string
  noHidden?: boolean
  userHadPreviousTicket?: boolean
}

export const HideOGTicketImageElement = ({
  hologram,
  fullname,
  username,
  ticketNumber,
  noHidden = false,
  userHadPreviousTicket = false,
  ref
}: Props) => {
  const { handleUpdateImageTicket } = useUpdateTicketImageInDB()

  useLayoutEffect(() => {
    if (userHadPreviousTicket) return

    const handler = async () => {
      if (ref.current == null) return

      const { fileImage, filename } = await createTicketImage({
        ticketDOMContnet: ref.current,
        ticketNumber
      })

      await handleUpdateImageTicket({ filename, file: fileImage })
    }

    handler()
  }, [userHadPreviousTicket])

  return (
    <div className={cn(!noHidden && 'absolute -left-[1000vw]')}>
      <section
        ref={ref}
        aria-disabled
        className='bg-gradient-to-tr items-center from-[#000] via-[#101015] to-[#1f1f25] w-[1200px] h-[630px] grid grid-cols-[1fr_auto] relative overflow-hidden'
      >
        <div className='flex flex-col justify-between py-20 translate-x-20'>
          <div>
            <h3 className='flex items-center text-6xl font-extrabold text-white'>
              MIDU.<span className='text-pallet-primary'>CONF</span>
              <span className='px-1 py-1 ml-2 text-4xl leading-none border text-pallet-primary border-pallet-primary'>
                25
              </span>
            </h3>
            <p className='mt-8 text-4xl font-medium text-white uppercase text-balance font-ibm-plex'>
              Evento de Programación y Desarrollo Web
            </p>
          </div>
          <div className='text-3xl text-white uppercase font-ibm-plex'>
            <time dateTime='2025-09-10T16:00:00' className='flex items-center gap-4 pt-40 pb-4'>
              <span>Sept.10 2025</span>
              <span>16:00h CEST</span>
            </time>
            <p>twitch.tv/midudev</p>
          </div>
        </div>
        <div className='mr-10 text-white scale-[85%]'>
          <TicketCard
            hologram={hologram}
            fullname={fullname}
            ticketNumber={ticketNumber}
            username={username}
          />
        </div>
      </section>
    </div>
  )
}
