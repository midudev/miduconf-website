import { WhiteMidudevLogo } from '../icons/white-midudev-logo'

interface Props {
  username: string
  fullname: string
  ticketNumber: number
}

export const TicketCard = ({ fullname, ticketNumber, username }: Props) => {
  return (
    <article className='w-[426px] h-[640px] overflow-hidden p-2 bg-gradient-to-tr from-white/20 via-transparent to-white/20 rounded-2xl border border-pallet-border-foreground'>
      <div className='bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] border border-pallet-border-foreground rounded-xl flex flex-col relative h-full overflow-hidden font-ibm-plex'>
        <WhiteMidudevLogo className='absolute w-auto h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2' />
        <header className='p-6 uppercase'>
          <p className='text-pallet-ghost'>/@{username}</p>
          <h3 className='mt-2 text-4xl font-medium text-pretty max-w-[16ch]'>{fullname}</h3>
        </header>
        <footer className='flex flex-col justify-end flex-1'>
          <span className='mb-2 mx-auto font-medium text-[calc(426px_/_5)] tabular-nums leading-none'>
            #{String(ticketNumber).padStart(6, '0')}
          </span>
          <time
            dateTime='2025-09-10T16:00:00'
            className='flex items-center justify-between gap-4 px-6 pb-6 text-lg'
          >
            <span>Sept.10 2025</span>
            <span>16:00h CEST</span>
          </time>
        </footer>
      </div>
    </article>
  )
}
