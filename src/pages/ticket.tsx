import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { getTicketMetadata } from '@/tickets/utils/get-ticket-metadata'
import { useEffect, useRef, useState } from 'react'
import { HologramOption } from '@/tickets/types/hologram-option'
import { AnimationType, StructureType } from '@/tickets/animations'
import { AnimationOption } from '@/tickets/types/animation-option'
import { StructureOpcion } from '@/tickets/types/structure-option'
import { HideTicketImageElement } from '@/tickets/components/hide-ticket-image-element'
import { HideOGTicketImageElement } from '@/tickets/components/hide-og-ticket-image-element'
import { ViewTicketMobile } from '@/tickets/components/view-ticket-mobile'
import { ViewTicketDesktop } from '@/tickets/components/view-ticket-desktop'
import { TicketData } from '@/tickets/types/ticket-data'
import { Modal } from '@/components/Modal'
import { throwConfetti } from '@/utils/throw-confetti'
import { ModalTwitchAccessContent } from '@/twitch/components/modal-twitch-access-content'
import { ModalNoTwitchSubContent } from '@/twitch/components/modal-no-twitch-sub-content'
import { ModalNoTHasMoreTierContent } from '@/twitch/components/modal-no-has-more-tier-content'

// Map between the two type systems
const mapOpcionToStructure = (opcion: StructureOpcion): StructureType => {
  const mapping: Record<StructureOpcion, StructureType> = {
    box: 'box',
    circle: 'circle',
    piramide: 'piramide',
    prism: 'prism',
    background: 'background',
    heart: 'heart'
  }
  return mapping[opcion] || 'box'
}

const mapOptionToAnimation = (option: AnimationOption): AnimationType => {
  const mapping: Record<string, AnimationType> = {
    default: 'default',
    piramide: 'pyramid',
    friccion: 'friction'
  }
  return mapping[option] || 'default'
}

interface Props {
  user: {
    username: string
    fullname: string
    avatar: string
  }
  ticketNumber: number
  twitchTier: TicketData['twitchTier']
  hologram: HologramOption
  savedDesign?: string | null
  tierQueryData: {
    tier: string | null
    error: string | null
  }
  notAccessTier: string
  userHadPreviousTicket: boolean
  midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime'
  midudevTokentId: string
}

export default function Ticket({
  user,
  ticketNumber,
  userHadPreviousTicket,
  twitchTier,
  hologram,
  savedDesign,
  tierQueryData,
  notAccessTier,
  midudevTokentId,
  midudevTypeSub
}: Props) {
  const ticketImageElement = useRef<HTMLElement | null>(null)
  const ticketOGImageElement = useRef<HTMLElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(() => {
    return tierQueryData == null ? false : true
  })

  const metadata = getTicketMetadata({ ticketNumber, username: user.username })
  const {
    ticketDesign,
    hasUnsavedChanges,
    isSaving,
    handleChangeHologram,
    handleChangeSticker,
    handleChangeColor,
    handleChangeStructure,
    handleChangeAnimation,
    handleSaveDesign
  } = useDesignTicket({
    hologram,
    savedDesign,
    username: user.username
  })

  const handleCloseModal = () => {
    setIsModalOpen(false)
    /* remove queryparams in url */
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  useEffect(() => {
    if (tierQueryData == null) return

    throwConfetti()
  }, [tierQueryData])

  return (
    <Layout meta={metadata}>
      <main className='flex flex-col items-center justify-center min-h-screen text-white'>
        {/* Mobile/Tablet Layout - Full screen with draggable panel */}
        <ViewTicketMobile
          midudevTokentId={midudevTokentId}
          twitchTier={twitchTier}
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          ticketDesign={ticketDesign}
          midudevTypeSub={midudevTypeSub}
          ticketDOMContnet={ticketImageElement}
          ticketOGImageElement={ticketOGImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
          handleChangeColor={handleChangeColor}
        />

        {/* Desktop Layout */}
        <ViewTicketDesktop
          midudevTokentId={midudevTokentId}
          twitchTier={twitchTier}
          fullname={user.fullname}
          username={user.username}
          ticketNumber={ticketNumber}
          midudevTypeSub={midudevTypeSub}
          ticketDesign={ticketDesign}
          ticketDOMContnet={ticketImageElement}
          ticketOGImageElement={ticketOGImageElement.current}
          handleChangeHologram={handleChangeHologram}
          handleChangeSticker={handleChangeSticker}
          handleChangeColor={handleChangeColor}
          handleChangeStructure={handleChangeStructure}
          handleChangeAnimation={handleChangeAnimation}
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
          onSave={handleSaveDesign}
        />
      </main>
      {/* Contenido para crear captura */}
      <HideTicketImageElement
        hologram={ticketDesign.hologram}
        color={ticketDesign.color}
        structure={mapOpcionToStructure(ticketDesign.structure)}
        animation={mapOptionToAnimation(ticketDesign.animation)}
        refElement={ticketImageElement}
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
      <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
        {tierQueryData?.tier === 'null' && tierQueryData?.error && <ModalNoTwitchSubContent />}
        {['1', '2', '3'].includes(tierQueryData?.tier!) && notAccessTier === 'false' && (
          <ModalTwitchAccessContent
            tierNumber={tierQueryData?.tier ? +tierQueryData?.tier : null}
            handleCloseModal={handleCloseModal}
          />
        )}
        {notAccessTier === 'true' && tierQueryData?.error === 'null' && (
          <ModalNoTHasMoreTierContent />
        )}
      </Modal>
    </Layout>
  )
}

const getInfoFromUser = ({ user }) => {
  const { user_metadata: meta } = user
  const { avatar_url: avatar, full_name: fullname, preferred_username: username } = meta

  return { avatar, fullname, username }
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
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
        midudevTypeSub: ticketCreated?.midudevTypeSub,
        midudevTokentId: ticketCreated?.midudevTokentId,
        initialSession: session,
        user: getInfoFromUser({ user: session?.user }),
        twitchTier: null,
        hologram: 'standard'
      }
    }
  }

  const tierLevelFromQueryParam = query?.tier
  const tierErrorFromQueryParam = query?.error
  const notAccessTier = query?.notAccessTier ?? null

  const tierQueryData =
    tierLevelFromQueryParam == null && tierErrorFromQueryParam == null
      ? null
      : {
          tier: tierLevelFromQueryParam,
          error: tierErrorFromQueryParam
        }

  return {
    props: {
      userHadPreviousTicket: true,
      ticketNumber: ticket.ticketNumber || 0,
      initialSession: session,
      midudevTypeSub: ticket.midudevTypeSub,
      midudevTokentId: ticket.midudevTokentId,
      user: getInfoFromUser({ user: session?.user }),
      twitchTier: ticket.twitchTier,
      hologram: ticket.hologram,
      savedDesign: ticket.designData || null,
      notAccessTier,
      tierQueryData
    }
  }
}
