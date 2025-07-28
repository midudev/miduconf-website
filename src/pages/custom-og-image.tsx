import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useUpdateTicketImageInDB } from '@/tickets/hooks/use-update-ticket-image-in-db'
import { useRef, useState } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { createTicketImage } from '@/tickets/utils/create-ticket-image'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'
import { isAdminUser } from '@/auth/utils/is-admin-user'
import { Button } from '@/components/Button'

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

export default function CustomOGTicketImage({ user, ticketNumber, userHadPreviousTicket }: Props) {
  const metadata = getTicketMetadata({ ticketNumber, username: user.username })
  const [ogValues, setOgValues] = useState({
    username: user.username,
    fullname: user.fullname,
    ticketNumber
  })
  const { handleUpdateImageTicket } = useUpdateTicketImageInDB()
  const ticketOGImageElement = useRef<HTMLElement | null>(null)

  const handleUpdateOGImage = async (evt: any) => {
    evt.preventDefault()
    if (ticketOGImageElement.current == null) return

    const { fileImage, filename } = await createTicketImage({
      ticketDOMContnet: ticketOGImageElement.current,
      ticketNumber: ogValues.ticketNumber
    })

    await handleUpdateImageTicket({ filename, file: fileImage })
  }

  const handleChangeUsername = (username: string) => {
    setOgValues((lastValues) => ({
      ...lastValues,
      username
    }))
  }

  const handleChangeFullname = (fullname: string) => {
    setOgValues((lastValues) => ({
      ...lastValues,
      fullname
    }))
  }

  const handleChangeTicketNumber = (ticketNumber: number) => {
    setOgValues((lastValues) => ({
      ...lastValues,
      ticketNumber
    }))
  }

  return (
    <Layout meta={metadata}>
      <main className='flex flex-col items-center justify-center min-h-screen text-white'>
        {/* Desktop Layout */}
        <div className='py-20 mx-auto'>
          <HideOGTicketImageElement
            noHidden
            ref={ticketOGImageElement}
            fullname={ogValues.fullname}
            ticketNumber={ogValues.ticketNumber}
            username={ogValues.username}
          />
        </div>
        <form
          onSubmit={handleUpdateOGImage}
          className='flex flex-col items-center px-6 py-4 border rounded border-pallet-border-foreground bg-pallet-b-foreground-primary gap-4 max-w-[600px] w-full'
        >
          <label className='flex flex-col gap-1'>
            <span>Nick de GitHub</span>
            <input
              value={ogValues.username}
              onChange={(evt) => handleChangeUsername(evt.target.value)}
              className='px-4 py-2 border bg-pallet-border-foreground border-pallet-ghost/10'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span>Nombre completo</span>
            <input
              value={ogValues.fullname}
              onChange={(evt) => handleChangeFullname(evt.target.value)}
              className='px-4 py-2 border bg-pallet-border-foreground border-pallet-ghost/10'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span>Número de ticket</span>
            <input
              type='number'
              value={ogValues.ticketNumber}
              onChange={(evt) => handleChangeTicketNumber(+evt.target.value)}
              className='px-4 py-2 border bg-pallet-border-foreground border-pallet-ghost/10'
            />
          </label>
          <Button>Generar nueva OG Image</Button>
        </form>
      </main>
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

  const isAdmin = isAdminUser(session.user.email ?? '#')

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: true
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
