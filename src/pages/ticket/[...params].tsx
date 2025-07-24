import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUsername } from '@/tickets/services/supabase-get-ticket-by-username'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { Layout } from '@/sections/layout'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { ShareTicketPanel } from '@/tickets/components/share-ticket-panel'
import { SelectHologramPanel } from '@/tickets/components/select-hologram-panel'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { useState, useRef } from 'react'
import { Button } from '@/components/Button'
import { EnterArrow } from '@/components/icons/enter-arrow'
import Link from 'next/link'

interface Props {
  user: {
    username: string
    fullname: string
  }
  ticketNumber: number
  isOwner: boolean
}

export default function TicketPage({ user, ticketNumber, isOwner }: Props) {
  const metadata = getTicketMetadata({ 
    ticketNumber, 
    username: user.username, 
    fullname: user.fullname 
  })

  const [fullname, setFullname] = useState(user.fullname)
  const { ticketDesign, handleChangeHologram } = useDesignTicket()
  const ticketImageElement = useRef<HTMLElement | null>(null)

  if (isOwner) {
    // EDITOR MODE - Owner can customize their ticket
    return (
      <Layout meta={metadata}>
        <main className='text-white min-h-full pt-16 md:pt-32 px-4 md:px-8'>
          {/* Mobile Layout - Stacked */}
          <div className='flex flex-col gap-8 lg:hidden'>
            <section className='flex items-center justify-center'>
              <Container3D>
                <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
              </Container3D>
            </section>
            
            <div className='flex justify-center'>
              <ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
            </div>
            
            <section className='mx-auto max-w-md p-6 border rounded-lg border-pallet-border-foreground bg-pallet-b-foreground-primary'>
              <h2 className='text-3xl font-semibold text-pretty mb-4'>Personaliza tu ticket</h2>
              <div className='text-center text-gray-400 p-8 mb-4'>
                <p className='text-lg mb-2'>🎨 Personalización</p>
                <p className='text-sm'>Disponible próximamente</p>
              </div>
              <SelectHologramPanel
                ticketDesign={ticketDesign}
                handleChangeHologram={handleChangeHologram}
              />
            </section>
          </div>

          {/* Desktop Layout - Grid */}
          <div className='hidden lg:grid lg:grid-cols-[auto_1fr_auto] items-start gap-8'>
            <ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
            <section className='flex items-center justify-center'>
              <Container3D>
                <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
              </Container3D>
            </section>
            <section className='h-full max-w-md p-8 border rounded-lg border-pallet-border-foreground bg-pallet-b-foreground-primary w-max'>
              <h2 className='w-auto text-5xl font-semibold text-pretty mb-6'>Personaliza tu ticket</h2>
              <div className='text-center text-gray-400 p-8 mb-6'>
                <p className='text-lg mb-2'>🎨 Personalización</p>
                <p className='text-sm'>Disponible próximamente</p>
              </div>
              <SelectHologramPanel
                ticketDesign={ticketDesign}
                handleChangeHologram={handleChangeHologram}
              />
            </section>
          </div>
          
          {/* Hidden ticket for image generation */}
          <section className='h-auto text-white w-max' aria-disabled ref={ticketImageElement} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <TicketCard fullname={fullname} ticketNumber={ticketNumber} username={user.username} />
          </section>
        </main>
      </Layout>
    )
  }

  // PUBLIC VIEW MODE - Others see shared ticket
  return (
    <Layout meta={metadata}>
      <main className='text-white min-h-screen flex flex-col items-center justify-center px-4 py-16'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>
            Ticket de {user.fullname}
          </h1>
          <p className='text-gray-400 text-lg'>
            Únete a miduConf 2025 - 10 de Septiembre
          </p>
        </div>
        
        <div className='mb-8'>
          <Container3D>
            <TicketCard 
              fullname={user.fullname} 
              ticketNumber={ticketNumber} 
              username={user.username} 
            />
          </Container3D>
        </div>
        
        <div className='text-center'>
          <Button as={Link} href="/">
            <EnterArrow className='hidden md:block' />
            Obtén tu Ticket
          </Button>
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

    // Show ticket page with appropriate permissions
    return {
      props: {
        user: {
          username: ticket.username,
          fullname: ticket.userFullname || ticket.username
        },
        ticketNumber: ticket.ticketNumber,
        isOwner
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