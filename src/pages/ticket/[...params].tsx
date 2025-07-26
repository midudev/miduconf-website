import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUsername } from '@/tickets/services/supabase-get-ticket-by-username'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
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
}

export default function TicketPage({ user, ticketNumber }: Props) {
	const metadata = getTicketMetadata({ ticketNumber, username: user.username, fullname: user.fullname })

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

		// If user is logged in and is the owner, redirect to /ticket
		if (isOwner && session) {
			return {
				redirect: {
					destination: '/ticket',
					permanent: false
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
				ticketNumber: ticket.ticketNumber
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