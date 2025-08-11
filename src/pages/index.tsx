import { supabaseGetServerSession } from '@/auth/services/supabase-get-server-session'
import { Agenda } from '@/sections/agenda'
import { FAQS } from '@/sections/faqs'
import { Footer } from '@/sections/footer'
import { GetTicket } from '@/sections/get-ticket'
import { Gifts } from '@/sections/gifts'
import { Hero } from '@/sections/hero'
import { Layout } from '@/sections/layout'
import { PreFooter } from '@/sections/pre-footer'
import { Speakers } from '@/sections/speakers'
import { Sponsors } from '@/sections/sponsors'
import { WhatToExpect } from '@/sections/what-to-expect'
import TwitchStream from '@/twitch/components/twitch-stream'
import { GetServerSideProps } from 'next'

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

  return (
    <Layout meta={metadata}>
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
        <PreFooter className='w-full mt-20' />
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
