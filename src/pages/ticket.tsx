import { Layout } from '@/sections/layout'
import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { GetServerSideProps } from 'next'
import { supabaseGetTicketByUserId } from '@/tickets/services/supabase-get-ticket-by-user-id'
import { supabaseCreateTicket } from '@/tickets/services/supabase-create-ticket'
import { ShareTicketPanel } from '@/tickets/components/share-ticket-panel'
import { useDesignTicket } from '@/tickets/hooks/use-design-ticket'
import { SelectAnimationPanel } from '@/tickets/components/select-animation-panel'
import { SelectStructurePanel } from '@/tickets/components/select-structure-panel'
import { SelectColorPanel } from '@/tickets/components/select-color-panel'
import { SelectHologramPanel } from '@/tickets/components/select-hologram-panel'
import { use } from 'react'
import { MiduLogo } from '@/components/logos/midudev'
import { WhiteMidudevLogo } from '@/tickets/icons/white-midudev-logo'
import { PreFooter } from '@/sections/pre-footer'
import { TicketCard } from '@/tickets/components/ticket-card'
import { Container3D } from '@/components/Container3D'

interface Props {
  user: {
    username: string
    fullname: string
    avatar: string
  }
  ticketNumber: number
  selectedFlavor: 'javascript'
  twitchTier: 1000 | 2000 | 3000
  material: 'standard' | 'special' | 'premium'
  tierQueryData: '1000' | '2000' | '3000'
  notAccessTier: boolean
  userHadPreviousTicket: boolean
  stickers: Array<string | null>
  showAcheivementModal: boolean
}

interface GetMetadataProps {
  username: string
  ticketNumber: number
}

export default function Ticket({
  user,
  ticketNumber,
  selectedFlavor = 'javascript',
  twitchTier,
  material: defaultMaterial,
  tierQueryData,
  notAccessTier,
  userHadPreviousTicket,
  stickers,
  showAcheivementModal
}: Props) {
  const metadata = getMetadata({ ticketNumber, username: user.username })
  const {
    ticketDesign,
    handleChangeAnimation,
    handleChangeStructure,
    handleChangeColor,
    handleChangeHologram
  } = useDesignTicket()

  return (
    <Layout meta={metadata}>
      <main className='text-white grid grid-cols-[auto_1fr_auto] items-start min-h-full pt-32 px-8'>
        <ShareTicketPanel />
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
          {/* <SelectAnimationPanel
            ticketDesign={ticketDesign}
            handleChangeAnimation={handleChangeAnimation}
          />
          <SelectStructurePanel
            ticketDesign={ticketDesign}
            handleChangeStructure={handleChangeStructure}
          /> */}
          {/* <SelectColorPanel ticketDesign={ticketDesign} handleChangeColor={handleChangeColor} /> */}
          <SelectHologramPanel
            ticketDesign={ticketDesign}
            handleChangeHologram={handleChangeHologram}
          />
        </section>
      </main>
    </Layout>
  )
}

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

const getMetadata = ({ username, ticketNumber }: GetMetadataProps) => {
  const title = 'miduConf - Conferencia de Programación y Tecnología'
  const description =
    '¡No te pierdas la miduConf el 12 de SEPTIEMBRE! Charlas para todos los niveles, +256 regalos y premios, ¡y muchas sorpresas!'
  const hash = crypto.randomUUID().split('-')[0]

  const url = `https://miduconf.com/ticket/${username}/${hash}`
  const ogImage = `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?${hash}=_buster`

  return {
    title,
    description,
    ogImage,
    url
  }
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
        flavour: 'javascript',
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
        selectedFlavor: 'javascript',
        ticketNumber: ticketCreated?.ticketNumber,
        initialSession: session,
        user: getInfoFromUser({ user: session?.user }),
        twitchTier: null,
        material: 'standard',
        stickers: ['null', 'null', 'null']
      }
    }
  }

  return {
    props: {
      userHadPreviousTicket: false,
      selectedFlavor: ticket.flavour || 'javascript',
      ticketNumber: ticket.ticketNumber || 0,
      initialSession: session,
      user: getInfoFromUser({ user: session?.user }),
      twitchTier: ticket.twitchTier,
      material: ticket.material,
      stickers: ticket.stickers
    }
  }
}
