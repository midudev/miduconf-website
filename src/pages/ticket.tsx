import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useRef } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { HideTicketImageElement } from '@/tickets/components/hide-ticket-image-element'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'
import { ViewTicketMobile } from '@/tickets/components/view-ticket-mobile'
import { ViewTicketDesktop } from '@/tickets/components/view-ticket-desktop'
import { TicketData } from '@/tickets/types/ticket-data'

interface Props {
  user: {
    username: string
    fullname: string
    avatar: string
  }
  ticketNumber: number
  twitchTier: TicketData['twitchTier']
  hologram: HologramOption
  tierQueryData: '1000' | '2000' | '3000'
  notAccessTier: boolean
  userHadPreviousTicket: boolean
}

export default function Ticket({
  user,
  ticketNumber,
  userHadPreviousTicket,
  twitchTier,
  hologram
}: Props) {
  const ticketImageElement = useRef<HTMLElement | null>(null)
  const ticketOGImageElement = useRef<HTMLElement | null>(null)
  const metadata = getTicketMetadata({ ticketNumber, username: user.username })
  const { ticketDesign, handleChangeHologram, handleChangeSticker } = useDesignTicket({
    hologram
  })

  return (
    <Layout meta={metadata}>
      <main className='flex flex-col items-center justify-center min-h-screen text-white'>
        {/* Mobile/Tablet Layout - Full screen with draggable panel */}
        <ViewTicketMobile
          twitchTier={twitchTier}
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketImageElement.current}
          ticketOGImageElement={ticketOGImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
        />

        {/* Desktop Layout */}
        <ViewTicketDesktop
          twitchTier={twitchTier}
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketImageElement.current}
          ticketOGImageElement={ticketOGImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
        />
      </main>
      {/* Contenido para crear captura */}
      <HideTicketImageElement
        hologram={ticketDesign.hologram}
        ref={ticketImageElement}
        fullname={user.fullname}
        ticketNumber={ticketNumber}
        username={user.username}
      />
      {/* Contenido para crear OG Image */}
      <HideOGTicketImageElement
        ref={ticketOGImageElement}
        userHadPreviousTicket={userHadPreviousTicket}
        hologram={ticketDesign.hologram}
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
