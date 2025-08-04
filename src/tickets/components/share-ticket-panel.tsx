import { Button } from '@/components/Button'
import { shareTicketOnX } from '../utils/share-ticket-on-x'
import { DownloadIcon } from '@/components/icons/download'
import { XIcon } from '@/components/icons/x'
import { DiscordIcon } from '@/components/icons/discord'
import { useDownloadTicketImage } from '../hooks/use-download-ticket-image'
import { Tooltip } from '@/components/Tooltip'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { TicketDesign } from '../types/ticket-design'

interface Props {
  username: string
  ticketDOMContnet: HTMLElement | null
  className?: string
  ticketDesign: TicketDesign
}

export const ShareTicketPanel = ({
  username,
  ticketDOMContnet,
  className,
  ticketDesign
}: Props) => {
  const { sharedTicketImageLink, handleCreateImageImage } = useDownloadTicketImage({
    ticketDOMContnet
  })

  useEffect(() => {
    handleCreateImageImage()
  }, [ticketDesign])

  return (
    <nav>
      <h2 className='sr-only'>Opciones para compartir:</h2>
      <ul
        className={cn(
          'flex flex-col gap-2 p-1 bg-palette-bg-foreground-primary text-white border rounded-lg lg:p-2 border-palette-border-foreground',
          className
        )}
      >
        <li>
          <Tooltip tooltipPosition='right' text='Compartir en X' offsetNumber={16}>
            <Button
              variant='icon'
              onClick={() =>
                shareTicketOnX({
                  username
                })
              }
              title='Compartir en X'
              aria-label='Compartir ticket en X (Twitter)'
              containerClassName='bg-palette-bg-foreground-secondary hover:bg-palette-bg-foreground-secondary/80'
            >
              <XIcon className='w-4 h-4' />
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip tooltipPosition='right' text='Descargar Ticket' offsetNumber={16}>
            <Button
              as={'a'}
              href={sharedTicketImageLink ?? '#'}
              download='ticket-miduconf-2025.jpg'
              variant='icon'
              disabled={sharedTicketImageLink == null}
              title='Descargar imagen de tu Ticket'
              aria-label='Descargar imagen de tu Ticket'
              containerClassName='bg-transparent hover:bg-palette-ghost/20'
            >
              <DownloadIcon className='w-auto h-4' />
            </Button>
          </Tooltip>
        </li>
        {/* <li>
					<Tooltip tooltipPosition='right' text='Compartir en Discord' offsetNumber={16}>
						<Button
							as={'a'}
							href='https://discord.gg/midudev'
							target='_blank'
							rel='noopener noreferrer'
							variant='icon'
							title='Compartir en Discord'
							aria-label='Compartir en Discord'
							containerClassName='bg-transparent hover:bg-palette-ghost/20'
						>
							<DiscordIcon className='w-4 h-4' />
						</Button>
					</Tooltip>
				</li> */}
        {/* <li>
          <Link
            href='#'
            className='bg-[rgba(39,_40,_48,_0.4)] p-2.5 rounded-md flex items-center justify-center hover:bg-palette-ghost/20 transition'
            title='Compartir en Instagram'
            aria-label='Compartir ticket en Instagram'
          >
            <InstagramIcon className='w-auto h-4' />
          </Link>
        </li> */}
      </ul>
    </nav>
  )
}
