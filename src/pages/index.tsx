import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { Agenda } from '@/sections/agenda'
import { FAQS } from '@/sections/faqs'
import { Footer } from '@/sections/footer'
import { GetTicket } from '@/sections/get-ticket'
import { Hero } from '@/sections/hero'
import { Layout } from '@/sections/layout'
import { PreFooter } from '@/sections/pre-footer'
import { Speakers } from '@/sections/speakers'
import { Sponsors } from '@/sections/sponsors'
import { WhatToExpect } from '@/sections/what-to-expect'
import { supabaseGetTicketByUsername } from '@/tickets/services/supabase-get-ticket-by-username'
import { GetServerSideProps } from 'next'

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

const title = 'miduConf - La conferencia de programación y desarrollo'
const description =
  'Conferencia de programación y tecnología para el día del programador y la programadora'
const defaultOgImage = '/og-image.jpg'
const url = 'https://miduconf.com'

export default function Home({ username, ticketNumber, burst, userData }) {
  const ogImage = username
    ? `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?c=${burst}`
    : `${url}${defaultOgImage}`

  const metadata = {
    title,
    description,
    ogImage,
    url
  }

  return (
    <Layout meta={metadata}>
      <main>
        <Hero userData={userData} />
        <WhatToExpect />
        <Speakers />
        <Sponsors />
        <Agenda />
        <FAQS />
        <GetTicket />
        <PreFooter />
        <Footer />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  // read query parameter
  const { ticket, 'no-user': noUser } = query
  const { session, error } = await supabaseGetServerSession(req, res)

  if (error) {
    return {
      redirect: {
        destination: '/?error-session',
        permanent: false
      }
    }
  }

  if (noUser != null) {
    return {
      props: {
        noUser: true,
        userData: session?.user ?? null
      }
    }
  }

  if (Array.isArray(ticket)) {
    return {
      props: {
        userData: session?.user ?? null
      }
    }
  }

  const ticketByUser = ticket
    ? await supabaseGetTicketByUsername(req, res, {
        username: ticket
      })
    : null

  // if no ticket, return empty props
  if (!ticketByUser) {
    return {
      props: {
        userData: session?.user ?? null
      }
    }
  }

  return {
    props: {
      userData: session?.user ?? null,
      burst: crypto.randomUUID(),
      ticketNumber: ticketByUser.ticketNumber,
      username: ticketByUser.username,
      flavor: ticketByUser.flavour,
      material: ticketByUser.material,
      stickers: ticketByUser.stickers,
      twitchTier: ticketByUser.twitchTier
    }
  }
}
