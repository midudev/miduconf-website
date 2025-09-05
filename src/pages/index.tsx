import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { Agenda } from '@/sections/agenda'
import { FAQS } from '@/sections/faqs'
import { Footer } from '@/sections/footer'
import { GetTicket } from '@/sections/get-ticket'
import { Gifts } from '@/sections/gifts'
import { Hero } from '@/sections/hero'
import { Layout } from '@/sections/layout'
import { Speakers } from '@/sections/speakers'
import { Sponsors } from '@/sections/sponsors'
import { WhatToExpect } from '@/sections/what-to-expect'
import TwitchStream from '@/twitch/components/twitch-stream'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { CONFERENCE_CONFIG } from '@/config/conference'

const title = 'miduConf - La conferencia de programación y desarrollo'
const description =
  'Conferencia de programación y tecnología para el día del programador y la programadora'
const defaultOgImage = '/og-image.jpg'
const url = 'https://miduconf.com'

export default function Home({ userData }) {
  const metadata = {
    title,
    description,
    ogImage: `${url}${defaultOgImage}`,
    url
  }

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'miduConf 2025',
    description,
    startDate: new Date(CONFERENCE_CONFIG.EVENT_DATE).toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    url,
    image: [`${url}${defaultOgImage}`],
    organizer: {
      '@type': 'Organization',
      name: 'midudev',
      url
    },
    location: {
      '@type': 'VirtualLocation',
      url: 'https://www.twitch.tv/midudev'
    },
    isAccessibleForFree: true,
    inLanguage: 'es-ES'
  }

  return (
    <Layout meta={metadata}>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </Head>
      <TwitchStream />
      <main>
        <Hero userData={userData} />
        <WhatToExpect />
        <Speakers />
        <Sponsors />
        <Gifts />
        <Agenda />
        <FAQS />
        <GetTicket />
        <Footer />
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const { session, error } = await supabaseGetServerSession(req, res)

  if (error) {
    return {
      redirect: {
        destination: '/?error-session',
        permanent: false
      }
    }
  }

  return {
    props: {
      userData: session?.user ?? null
    }
  }
}
