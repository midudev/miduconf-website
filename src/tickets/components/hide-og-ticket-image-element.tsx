import { RefObject, useLayoutEffect } from 'react'
import { TicketCard } from './ticket-card'
import { cn } from '@/lib/utils'
import { HologramOption } from '../types/hologram-option'
import { ColorOption } from '../types/color-option'
import { useUpdateTicketImageInDB } from '../hooks/use-update-ticket-image-in-db'
import { createTicketImage } from '../utils/create-ticket-image'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { useMounted } from '@/hooks/use-mounted'

interface Props {
  hologram: HologramOption
  color?: ColorOption
  fullname: string
  ticketNumber: number
  ref: RefObject<HTMLElement | null>
  username: string
  noHidden?: boolean
  userHadPreviousTicket?: boolean
}

export const HideOGTicketImageElement = ({
  hologram,
  color,
  fullname,
  username,
  ticketNumber,
  noHidden = false,
  userHadPreviousTicket = false,
  ref
}: Props) => {
  const { handleUpdateImageTicket } = useUpdateTicketImageInDB()
  const mounted = useMounted()

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
        <img
          src='/og/by-ticket.jpg'
          className='w-[1200px] h-[630px] absolute top-0 left-0'
          width='1200'
          height='630'
        />
        {mounted && (
          <div className='flex items-center justify-end w-full h-full pr-16'>
            <div className='relative w-max h-max scale-[75%]'>
              <div className='overflow-hidden text-white rounded-2xl'>
                <div className='bg-palette-background'>
                  <TicketCard
                    hologram={hologram}
                    fullname={fullname}
                    ticketNumber={ticketNumber}
                    username={username}
                    color={color}
                  />
                </div>
              </div>
              <div className='absolute left-0 overflow-hidden text-white rounded-2xl top-[calc(-100%_-_16px)] opacity-40'>
                <div className='bg-palette-background'>
                  <TicketCard
                    hologram={getRandomHologram()}
                    fullname={fullname}
                    ticketNumber={ticketNumber}
                    username={username}
                    color={getRandomColor()}
                  />
                </div>
              </div>
              <div className='absolute left-0 overflow-hidden text-white rounded-2xl top-[calc(100%_+_16px)] opacity-40'>
                <div className='bg-palette-background'>
                  <TicketCard
                    hologram={getRandomHologram()}
                    fullname={fullname}
                    ticketNumber={ticketNumber}
                    username={username}
                    color={getRandomColor()}
                  />
                </div>
              </div>
              <div className='absolute left-[calc(100%_+_16px)] overflow-hidden text-white rounded-2xl top-[calc(50%_+_8px)] opacity-40'>
                <div className='bg-palette-background'>
                  <TicketCard
                    hologram={getRandomHologram()}
                    fullname={fullname}
                    ticketNumber={ticketNumber}
                    username={username}
                    color={getRandomColor()}
                  />
                </div>
              </div>
              <div className='absolute left-[calc(100%_+_16px)] overflow-hidden text-white rounded-2xl top-[calc(-50%_-_8px)] opacity-40'>
                <div className='bg-palette-background'>
                  <TicketCard
                    hologram={getRandomHologram()}
                    fullname={fullname}
                    ticketNumber={ticketNumber}
                    username={username}
                    color={getRandomColor()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

const getRandomHologram = () => {
  const holograms = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM)
  const randomHologram = holograms[Math.floor(Math.random() * holograms.length)]
  return randomHologram
}

const getRandomColor = () => {
  const colors = Object.values(PERSONALIZE_TIKET_OPTIONS.COLOR)
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return randomColor
}
