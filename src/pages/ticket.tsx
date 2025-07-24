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
import { useUpdateTicketInDB } from '@/tickets/hooks/use-update-ticket-in-db'
import { useUpdateTicketImageInDB } from '@/tickets/hooks/use-update-ticket-image-in-db'
import { useLayoutEffect, useRef, useState } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { SelectStickerPanel } from '@/tickets/components/select-sticker-panel'
import { DiamondIcon } from '@/components/icons/diamond'
import { createTicketImage } from '@/tickets/utils/create-ticket-image'
import { HideTicketImageElement } from '@/tickets/components/hide-ticket-image-element'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'

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
      <main className='text-white grid grid-cols-[auto_1fr_auto] items-start min-h-full pt-32 px-8'>
        <ShareTicketPanel ticketDOMContnet={ticketImageElement.current} username={user.username} />
        <section className='flex items-center justify-center'>
          <Container3D>
            <TicketCard
              fullname={user.fullname}
              ticketNumber={ticketNumber}
              username={user.username}
            />
          </Container3D>
        </section>
        <section className='h-full max-w-md p-8 border rounded-lg border-pallet-border-foreground bg-pallet-b-foreground-primary w-max'>
          <h2 className='w-auto text-5xl font-semibold text-pretty'>Personaliza tu ticket</h2>
          <div className='relative'>
            <p className='absolute flex items-center gap-2 text-2xl font-medium text-center uppercase -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 font-ibm-plex'>
              <DiamondIcon className='w-auto h-4' />
              Muy pronto
              <DiamondIcon className='w-auto h-4' />
            </p>
            {/* <SelectAnimationPanel
            ticketDesign={ticketDesign}
            handleChangeAnimation={handleChangeAnimation}
						/>
						<SelectStructurePanel
            ticketDesign={ticketDesign}
            handleChangeStructure={handleChangeStructure}
						/> */}
            {/* <SelectColorPanel ticketDesign={ticketDesign} handleChangeColor={handleChangeColor} /> */}
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
        </section>
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

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
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
