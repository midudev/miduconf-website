import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { HologramOption } from '../types/hologram-option'

interface Props {
  username: string
  fullname: string
  ticketNumber: number
  hologram?: HologramOption
}

export const TicketCard = ({ fullname, ticketNumber, username, hologram = 'standard' }: Props) => {
  return (
    <article className='w-[426px] h-[640px] sm:w-[426px] sm:h-[640px] max-sm:w-full max-sm:max-w-[375px] max-sm:h-[563px] overflow-hidden p-2 bg-gradient-to-tr from-white/20 via-transparent to-white/20 rounded-2xl border border-pallet-border-foreground'>
      <div className='bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] border border-pallet-border-foreground rounded-xl flex flex-col relative h-full overflow-hidden font-ibm-plex'>
        <WhiteMidudevLogo className='absolute w-auto h-20 max-sm:h-[70px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2' />
        <header className='p-6 uppercase max-sm:p-5'>
          <p className='text-pallet-ghost'>/@{username}</p>
          <h3 className='mt-2 text-4xl max-sm:text-3xl font-medium text-pretty max-w-[16ch]'>
            {fullname}
          </h3>
        </header>
        <footer className='flex flex-col justify-end flex-1'>
          <span className='mb-2 mx-auto font-medium text-[calc(426px_/_5)] max-sm:text-[calc(375px_/_5)] tabular-nums leading-none'>
            #{String(ticketNumber).padStart(6, '0')}
          </span>
          <time
            dateTime='2025-09-10T16:00:00'
            className='flex items-center justify-between gap-4 px-6 pb-6 text-lg max-sm:px-5 max-sm:pb-5 max-sm:text-base'
          >
            <span>Sept.10 2025</span>
            <span>16:00h CEST</span>
          </time>
        </footer>
      </div>
    </article>
  )
}
