import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseGetTicketByUsername } from '@/tickets/services/supabase-get-ticket-by-username'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { ShareTicketPanel } from '@/tickets/components/share-ticket-panel'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { SelectHologramPanel } from '@/tickets/components/select-hologram-panel'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useUpdateTicketInDB } from '@/tickets/hooks/use-update-ticket-in-db'
import { useUpdateTicketImageInDB } from '@/tickets/hooks/use-update-ticket-image-in-db'
import { useRef, useState } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { SelectStickerPanel } from '@/tickets/components/select-sticker-panel'
import { DiamondIcon } from '@/components/icons/diamond'
import { Button } from '@/components/Button'
import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'

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
	isOwner: boolean
}

export default function TicketPage({ user, ticketNumber, isOwner }: Props) {
	const metadata = getTicketMetadata({ ticketNumber, username: user.username, fullname: user.fullname })
	const [fullname, setFullname] = useState(user.fullname)
	const {
		ticketDesign,
		handleChangeAnimation,
		handleChangeStructure,
		handleChangeColor,
		handleChangeHologram,
		handleChangeSticker
	} = useDesignTicket()
	const { handleUpdateTicket } = useUpdateTicketInDB()
	const { handleUpdateImageTicket } = useUpdateTicketImageInDB()
	const ticketImageElement = useRef<HTMLElement | null>(null)

	if (isOwner) {
		// OWNER MODE - Full editor with responsive layout
		return (
			<Layout meta={metadata}>
				<main className='text-white min-h-screen py-8 px-4'>
					<div className='max-w-7xl mx-auto'>
						{/* Mobile Layout - Stack vertically */}
						<div className='lg:hidden space-y-8'>
							<div className='flex flex-col items-center space-y-6'>
								<Container3D>
									<TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
								</Container3D>
								<ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
							</div>
						</div>

						{/* Desktop Layout - 3 columns */}
						<div className='hidden lg:grid lg:grid-cols-[300px_1fr_320px] lg:gap-8 lg:items-start lg:justify-center lg:min-h-[80vh]'>
							<div className='sticky top-8'>
								<ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
							</div>

							<div className='flex items-center justify-center'>
								<Container3D>
									<TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
								</Container3D>
							</div>

							<div className='sticky top-8'>
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
					</div>
				</main>

				{/* Hidden elements for capture */}
				<div className='sr-only'>
					<input value={fullname} onChange={(evt) => setFullname(evt.target.value)} />
					<section className='h-auto text-white w-max' aria-disabled ref={ticketImageElement}>
						<TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
					</section>
				</div>
			</Layout>
		)
	}

	// PUBLIC VIEW MODE - Others see shared ticket (like Vercel Ship)
	return (
		<Layout meta={metadata}>
			<main className='text-white min-h-screen flex items-center justify-center px-4 py-8'>
				<div className='max-w-6xl mx-auto w-full'>
					{/* Mobile Layout - Stack vertically */}
					<div className='md:hidden flex flex-col items-center space-y-8 text-center pt-16'>
						<div className='space-y-4'>
							<h1 className='text-3xl font-semibold'>
								Ticket de {user.username}
							</h1>
							<p className='text-gray-400 text-base'>
								Únete a miduConf 2025 - 10 de Septiembre
							</p>
						</div>
						
						<Container3D>
							<TicketCard
								fullname={user.fullname}
								ticketNumber={ticketNumber}
								username={user.username}
							/>
						</Container3D>
						
						<Button as={Link} href="/" className='w-full max-w-xs'>
							Obtén tu Ticket
						</Button>
					</div>

					{/* Desktop Layout - Side by side */}
					<div className='hidden md:grid md:grid-cols-2 md:gap-12 md:items-center md:min-h-[70vh]'>
						<div className='space-y-6 max-w-md'>
							<div className='space-y-4'>
								<h1 className='text-4xl lg:text-5xl font-semibold leading-tight'>
									Ticket de<br />
									<span className='text-blue-400'>{user.username}</span>
								</h1>
								<p className='text-gray-300 text-lg leading-relaxed'>
									Únete a miduConf 2025<br />
									<span className='text-white font-medium'>10 de Septiembre</span>
								</p>
							</div>

							<Button as={Link} href="/" className='inline-flex items-center gap-2'>
								<EnterArrow className='w-4 h-4' />
								Obtén tu Ticket
							</Button>
						</div>

						<div className='flex justify-center'>
							<Container3D>
								<TicketCard
									fullname={user.fullname}
									ticketNumber={ticketNumber}
									username={user.username}
								/>
							</Container3D>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

const getInfoFromUser = ({ user }) => {
	const { user_metadata: meta } = user
	const { avatar_url: avatar, full_name: fullname, preferred_username: username } = meta

	return { avatar, fullname, username }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
	const { params: routeParams } = params as { params: string[] }

	// Extract username (first param), ignore hash if present (legacy)
	const username = routeParams?.[0]

	if (!username) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	try {
		// Get current session to check if user is owner
		const { session } = await supabaseGetServerSession(req, res)

		// Check if ticket exists for this username
		const ticket = await supabaseGetTicketByUsername(req, res, { username })

		if (!ticket) {
			// Username doesn't exist, redirect to home
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		// Check if current user is the owner of this ticket
		const currentUsername = session?.user?.user_metadata?.preferred_username
		const isOwner = currentUsername === username

		if (isOwner && session) {
			// Owner accessing their own ticket - get full ticket data by user ID
			const fullTicket = await supabaseGetTicketByUserId(req, res, {
				id: session.user.id
			})

			// If no ticket for logged user, create one
			if (fullTicket == null) {
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
						userHadPreviousTicket: true,
						ticketNumber: ticketCreated?.ticketNumber,
						initialSession: session,
						user: getInfoFromUser({ user: session?.user }),
						twitchTier: null,
						hologram: 'standard',
						isOwner: true
					}
				}
			}

			return {
				props: {
					userHadPreviousTicket: false,
					ticketNumber: fullTicket.ticketNumber || 0,
					initialSession: session,
					user: getInfoFromUser({ user: session?.user }),
					twitchTier: fullTicket.twitchTier,
					hologram: fullTicket.hologram,
					isOwner: true
				}
			}
		}

		// Not owner - show public view
		return {
			props: {
				user: {
					username: ticket.username,
					fullname: ticket.userFullname || ticket.username,
					avatar: ''
				},
				ticketNumber: ticket.ticketNumber,
				isOwner: false
			}
		}
	} catch (error) {
		console.error('Error checking ticket:', error)
		// On error, redirect to home
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}