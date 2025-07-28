import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useUpdateTicketImageInDB } from '@/tickets/hooks/use-update-ticket-image-in-db'
import { useLayoutEffect, useRef } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { createTicketImage } from '@/tickets/utils/create-ticket-image'
import { HideTicketImageElement } from '@/tickets/components/hide-ticket-image-element'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'
import { ViewTicketMobile } from '@/tickets/components/view-ticket-mobile'
import { ViewTicketDesktop } from '@/tickets/components/view-ticket-desktop'

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
  const metadata = getTicketMetadata({ ticketNumber, username: user.username })
  const { ticketDesign, handleChangeHologram, handleChangeSticker } = useDesignTicket()
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
      <main className='flex flex-col items-center justify-center min-h-screen text-white'>
        {/* Mobile/Tablet Layout - Full screen with draggable panel */}
        <ViewTicketMobile
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
        />

        {/* Desktop Layout */}
        <ViewTicketDesktop
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
        />
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
