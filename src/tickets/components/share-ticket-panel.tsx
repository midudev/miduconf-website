import { TwitchIcon } from '@/components/icons'
import { InstagramIcon } from '@/components/icons/instagram'
import Link from 'next/link'

export const ShareTicketPanel = () => {
  return (
    <nav>
      <h2 className='sr-only'>Opciones para compartir:</h2>
      <ul className='flex flex-col gap-4 p-4 text-white border rounded-lg border-pallet-border-foreground bg-pallet-b-foreground-primary'>
        <li>
          <Link
            href='#'
            className='bg-[rgba(39,_40,_48,_0.4)] p-2.5 rounded-md flex items-center justify-center hover:bg-pallet-ghost/20 transition'
            title='Compartir en X'
            aria-label='Compartir ticket en X (Twitter)'
          >
            <TwitchIcon className='w-auto h-4' />
          </Link>
        </li>
        <li>
          <Link
            href='#'
            className='bg-[rgba(39,_40,_48,_0.4)] p-2.5 rounded-md flex items-center justify-center hover:bg-pallet-ghost/20 transition'
            title='Compartir en Instagram'
            aria-label='Compartir ticket en Instagram'
          >
            <InstagramIcon className='w-auto h-4' />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
