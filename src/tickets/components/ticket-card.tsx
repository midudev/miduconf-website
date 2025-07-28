import { cn } from '@/lib/utils'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { HologramOption } from '../types/hologram-option'
import { TwitchIcon } from '@/components/icons/twitch'

interface Props {
  username: string
  fullname: string
  ticketNumber: number
  hologram?: HologramOption
}

export const TicketCard = ({ fullname, ticketNumber, username, hologram = 'standard' }: Props) => {
  return (
    <article
      className={cn(
        'w-[426px] h-[563px] sm:w-[426px] sm:h-[563px] max-sm:w-full max-w-[375px]  overflow-hidden p-2 bg-gradient-to-tr from-white/20 via-transparent to-white/20 rounded-2xl border border-pallet-border-foreground',
        hologram === 'twitch-1' &&
          'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-20 from-pink-200/20 to-sky-200/20'
      )}
    >
      <div
        className={cn(
          'bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] border border-pallet-border-foreground rounded-xl flex flex-col relative h-full overflow-hidden font-ibm-plex',
          hologram === 'twitch-1' &&
            'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-20 from-pink-200/20 to-sky-200/20 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10'
        )}
      >
        {hologram === 'twitch-1' && (
          <span className='absolute top-0 flex items-center gap-1 px-2 py-1 text-xs bg-gradient-to-tr from-pink-200 to-yellow-200 text-pallet-background right-4'>
            <TwitchIcon className='w-auto h-3' /> 01
          </span>
        )}
        <WhiteMidudevLogo
          className={cn(
            'absolute w-auto h-20 max-sm:h-[70px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2',
            hologram === 'twitch-1' &&
              'text-pallet-background  [filter:drop-shadow(-2px_-2px_.5px_#695f68)_drop-shadow(2px_2px_.5px_#59646f)_drop-shadow(-2px_2px_.5px_#695f68)_drop-shadow(2px_-2px_.5px_#596460)]'
          )}
        />
        <header className='p-6 uppercase max-sm:p-5'>
          <p
            className={cn(
              'text-pallet-ghost',
              hologram === 'twitch-1' &&
                'bg-gradient-to-r from-pink-50 to-yellow-200 bg-clip-text text-transparent'
            )}
          >
            /@{username}
          </p>
          <h3
            className={cn(
              'mt-2 text-4xl max-sm:text-3xl font-medium text-pretty max-w-[16ch]',
              hologram === 'twitch-1' &&
                'bg-gradient-to-r from-pink-200 via-white to-sky-200 bg-clip-text text-transparent'
            )}
          >
            {fullname}
          </h3>
        </header>
        <footer className='flex flex-col justify-end flex-1'>
          <span
            className={cn(
              'mb-2 mx-auto font-medium text-[calc(426px_/_5.5)] max-sm:text-[calc(375px_/_6.5)] tabular-nums leading-none',
              hologram === 'twitch-1' &&
                'bg-gradient-to-r from-pink-50 to-sky-200 bg-clip-text text-transparent'
            )}
          >
            #{String(ticketNumber).padStart(6, '0')}
          </span>
          <time
            dateTime='2025-09-10T16:00:00'
            className={cn(
              'flex items-center justify-between gap-4 px-6 pb-6 text-lg max-sm:px-5 max-sm:pb-5 max-sm:text-base',
              hologram === 'twitch-1' &&
                'bg-gradient-to-r from-pink-50 to-sky-200 bg-clip-text text-transparent'
            )}
          >
            <span>Sept.10 2025</span>
            <span>16:00h CEST</span>
          </time>
        </footer>
      </div>
    </article>
  )
}
