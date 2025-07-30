import { Button } from '@/components/Button'
import { shareTicketOnX } from '../utils/share-ticket-on-x'
import { DownloadIcon } from '@/components/icons/download'
import { XIcon } from '@/components/icons/x'
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
					'flex flex-col gap-4 p-2 text-white border rounded-lg lg:p-4 border-pallet-border-foreground bg-pallet-b-foreground-primary',
					className
				)}
			>
				<li>
					<Tooltip tooltipPosition='right' text='Compartir en X' offsetNumber={16}>
						<Button
							variant='ghost'
							onClick={() =>
								shareTicketOnX({
									username
								})
							}
							title='Compartir en X'
							aria-label='Compartir ticket en X (Twitter)'
							containerClassName='bg-[rgba(39,_40,_48,_0.4)]'
						>
							<XIcon className='w-auto h-4' />
						</Button>
					</Tooltip>
				</li>
				<li>
					<Tooltip tooltipPosition='right' text='Descargar Ticket' offsetNumber={16}>
						<Button
							as={'a'}
							href={sharedTicketImageLink ?? '#'}
							download='ticket-miduconf-2025.jpg'
							variant='ghost'
							disabled={sharedTicketImageLink == null}
							title='Descargar imagen de tu Ticket'
							aria-label='Descargar imagen de tu Ticket'
							containerClassName='bg-[rgba(39,_40,_48,_0.4)]'
						>
							<DownloadIcon className='w-auto h-4' />
						</Button>
					</Tooltip>
				</li>
				{/* <li>
          <Link
            href='#'
            className='bg-[rgba(39,_40,_48,_0.4)] p-2.5 rounded-md flex items-center justify-center hover:bg-pallet-ghost/20 transition'
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
