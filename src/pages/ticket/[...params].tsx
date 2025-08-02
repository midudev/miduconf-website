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
import { HologramOption } from '@/tickets/types/hologram-option'
import { ColorOption } from '@/tickets/types/color-option'

interface Props {
  user: {
    username: string
    fullname: string
    avatar: string
  }
  ticketNumber: number
  hologram: HologramOption
  color?: ColorOption
}

export default function TicketPage({ user, ticketNumber, hologram, color }: Props) {
  const metadata = getTicketMetadata({
    ticketNumber,
    username: user.username,
    fullname: user.fullname
  })

  // PUBLIC VIEW MODE - Others see shared ticket (like Vercel Ship)
  return (
    <Layout meta={metadata}>
      <main className='flex items-center justify-center min-h-screen px-4 py-8 text-white'>
        <div className='w-full max-w-6xl mx-auto'>
          {/* Mobile Layout - Stack vertically */}
          <div className='flex flex-col items-center pt-16 space-y-8 text-center md:hidden'>
            <div className='space-y-4'>
              <h1 className='text-3xl font-semibold'>Ticket de {user.username}</h1>
              <p className='text-base text-gray-400'>Únete a miduConf 2025 - 10 de Septiembre</p>
            </div>

            <Container3D>
              <TicketCard
                hologram={hologram}
                color={color}
                fullname={user.fullname}
                ticketNumber={ticketNumber}
                username={user.username}
              />
            </Container3D>

            <Button as={Link} href='/' className='w-full max-w-xs'>
              Obtén tu Ticket
            </Button>
          </div>

          {/* Desktop Layout - Side by side */}
          <div className='hidden md:grid md:grid-cols-2 md:gap-12 md:items-center md:min-h-[70vh]'>
            <div className='max-w-md space-y-6'>
              <div className='space-y-4'>
                <h1 className='text-4xl font-semibold leading-tight lg:text-5xl'>
                  Ticket de
                  <br />
                  <span className='text-blue-400'>{user.username}</span>
                </h1>
                <p className='text-lg leading-relaxed text-gray-300'>
                  Únete a miduConf 2025
                  <br />
                  <span className='font-medium text-white'>10 de Septiembre</span>
                </p>
              </div>

              <Button as={Link} href='/' className='inline-flex items-center gap-2'>
                <EnterArrow className='w-4 h-4' />
                Obtén tu Ticket
              </Button>
            </div>

            <div className='flex justify-center'>
              <Container3D>
                <TicketCard
                  hologram={hologram}
                  color={color}
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
        ticketNumber: ticket.ticketNumber,
        hologram: ticket.hologram,
        color: ticket.color || 'blue'
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
