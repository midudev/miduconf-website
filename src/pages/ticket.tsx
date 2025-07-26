import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { ShareTicketPanel } from '@/tickets/components/share-ticket-panel'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { SelectHologramPanel } from '@/tickets/components/select-hologram-panel'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useUpdateTicketImageInDB } from '@/tickets/hooks/use-update-ticket-image-in-db'
import { useLayoutEffect, useRef, useState } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { SelectStickerPanel } from '@/tickets/components/select-sticker-panel'
import { DiamondIcon } from '@/components/icons/diamond'
import { createTicketImage } from '@/tickets/utils/create-ticket-image'
import { HideTicketImageElement } from '@/tickets/components/hide-ticket-image-element'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'
import { DraggablePanel } from '@/components/DraggablePanel'
import { cn } from '@/lib/utils'

interface Props {
	user: {
		username: string
		fullname: string
		avatar: string
	}
	ticketNumber: number
	twitchTier: 1000 | 2000 | 3000
	hologram: HologramOption
	tierQueryData: '1000' | '2000' | '3000'
	notAccessTier: boolean
	userHadPreviousTicket: boolean
}

export default function Ticket({ user, ticketNumber, userHadPreviousTicket }: Props) {
	const [isPanelOpen, setIsPanelOpen] = useState(false)
	const metadata = getTicketMetadata({ ticketNumber, username: user.username })
	const {
		ticketDesign,
		handleChangeHologram,
		handleChangeSticker
	} = useDesignTicket()
	const { handleUpdateImageTicket } = useUpdateTicketImageInDB()
	const ticketImageElement = useRef<HTMLElement | null>(null)
	const ticketOGImageElement = useRef<HTMLElement | null>(null)

	useLayoutEffect(() => {
		if (userHadPreviousTicket) return

		const handler = async () => {
			if (ticketOGImageElement.current == null) return

			const { fileImage, filename } = await createTicketImage({
				ticketDOMContnet: ticketOGImageElement.current,
				ticketNumber
			})

			await handleUpdateImageTicket({ filename, file: fileImage })
		}

		handler()
	}, [userHadPreviousTicket])

	return (
		<Layout meta={metadata}>
			<main className='flex flex-col justify-center items-center text-white min-h-screen'>
				{/* Mobile/Tablet Layout - Full screen with draggable panel */}
				<div className='lg:hidden relative min-h-screen w-full'>
					<div className='absolute top-16 left-8 z-40'>
						<ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
					</div>

					<div className={`flex items-center justify-center transition-all duration-300 ${isPanelOpen ? 'h-[50vh]' : 'min-h-screen pb-20 pt-32 px-4'
						}`}>
						<div className={cn(
							'transition-transform duration-300',
							isPanelOpen ? 'scale-[0.6] pt-16' : 'scale-90 sm:scale-100'
						)}>
							<Container3D>
								<TicketCard
									fullname={user.fullname}
									ticketNumber={ticketNumber}
									username={user.username}
								/>
							</Container3D>
						</div>
					</div>

					<DraggablePanel
						title="Personaliza tu ticket"
						isOpen={isPanelOpen}
						onToggle={() => setIsPanelOpen(!isPanelOpen)}
					>
						<div className='p-6'>
							<div className='relative min-h-[400px]'>
								<div className='absolute inset-0 flex items-center justify-center z-10'>
									<p className='flex items-center gap-2 text-xl font-medium text-center uppercase font-ibm-plex bg-pallet-b-foreground-primary px-4 py-2 rounded-lg border border-pallet-border-foreground'>
										<DiamondIcon className='w-auto h-4' />
										Muy pronto
										<DiamondIcon className='w-auto h-4' />
									</p>
								</div>
								<div className='opacity-20 [mask-image:linear-gradient(#000_20%,_transparent)] select-none pointer-events-none'>
									<SelectHologramPanel
										ticketDesign={ticketDesign}
										handleChangeHologram={handleChangeHologram}
									/>
									<SelectStickerPanel
										ticketDesign={ticketDesign}
										handleChangeSticker={handleChangeSticker}
									/>
								</div>
							</div>
						</div>
					</DraggablePanel>
				</div>

				{/* Desktop Layout */}
				<div className='hidden lg:flex lg:items-start lg:justify-between lg:min-h-[80vh] lg:w-full mx-auto px-8 py-8'>
					<div className='sticky top-8 flex-shrink-0'>
						<ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
					</div>

					<div className='flex items-center justify-center flex-1 px-16 min-h-[80vh]'>
						<Container3D>
							<TicketCard
								fullname={user.fullname}
								ticketNumber={ticketNumber}
								username={user.username}
							/>
						</Container3D>
					</div>

					<div className='sticky top-8 flex-shrink-0 w-80'>
						<div className='p-6 border rounded-xl border-pallet-border-foreground bg-pallet-b-foreground-primary'>
							<h2 className='text-3xl font-semibold mb-6 text-pretty'>Personaliza tu ticket</h2>
							<div className='relative min-h-[400px]'>
								<div className='absolute inset-0 flex items-center justify-center z-10'>
									<p className='flex items-center gap-2 text-xl font-medium text-center uppercase font-ibm-plex bg-pallet-b-foreground-primary px-4 py-2 rounded-lg border border-pallet-border-foreground'>
										<DiamondIcon className='w-auto h-4' />
										Muy pronto
										<DiamondIcon className='w-auto h-4' />
									</p>
								</div>
								<div className='opacity-20 [mask-image:linear-gradient(#000_20%,_transparent)] select-none pointer-events-none'>
									<SelectHologramPanel
										ticketDesign={ticketDesign}
										handleChangeHologram={handleChangeHologram}
									/>
									<SelectStickerPanel
										ticketDesign={ticketDesign}
										handleChangeSticker={handleChangeSticker}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			{/* Contenido para crear captura */}
			<HideTicketImageElement
				ref={ticketImageElement}
				fullname={user.fullname}
				ticketNumber={ticketNumber}
				username={user.username}
			/>
			{/* Contenido para crear OG Image */}
			<HideOGTicketImageElement
				ref={ticketOGImageElement}
				fullname={user.fullname}
				ticketNumber={ticketNumber}
				username={user.username}
			/>
		</Layout>
	)
}

const getInfoFromUser = ({ user }) => {
	const { user_metadata: meta } = user
	const { avatar_url: avatar, full_name: fullname, preferred_username: username } = meta

	return { avatar, fullname, username }
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const { error: sessionError, session } = await supabaseGetServerSession(req, res)

	if (sessionError) {
		console.error(sessionError)
		return {
			redirect: {
				destination: '/?error=session_error',
				permanent: false
			}
		}
	}

	if (!session) {
		return {
			redirect: {
				destination: '/?error=not_logged_in',
				permanent: false
			}
		}
	}

	const ticket = await supabaseGetTicketByUserId(req, res, {
		id: session.user.id
	})

	// si no tenemos ticket -> lo creamos
	if (ticket == null) {
		const metadata = session?.user?.user_metadata ?? {}
		const { full_name: fullname, preferred_username: username } = metadata

		const { error } = await supabaseCreateTicket(req, res, {
			ticketInfo: {
				id: session.user.id,
				user_fullname: fullname,
				user_id: session?.user?.id,
				user_name: username ?? fullname
			}
		})

		const ticketCreated = await supabaseGetTicketByUserId(req, res, {
			id: session.user.id
		})

		if (error) {
			return {
				redirect: {
					destination: '/?ticket-no-created',
					permanent: false
				}
			}
		}

		return {
			props: {
				userHadPreviousTicket: false,
				ticketNumber: ticketCreated?.ticketNumber,
				initialSession: session,
				user: getInfoFromUser({ user: session?.user }),
				twitchTier: null,
				hologram: 'standard'
			}
		}
	}

	return {
		props: {
			userHadPreviousTicket: true,
			ticketNumber: ticket.ticketNumber || 0,
			initialSession: session,
			user: getInfoFromUser({ user: session?.user }),
			twitchTier: ticket.twitchTier,
			hologram: ticket.hologram
		}
	}
}
