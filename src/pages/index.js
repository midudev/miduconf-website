import Head from 'next/head'

import { GeistSans } from 'geist/font/sans'

import { Background } from '@/components/Background'
import { Countdown } from '@/components/Countdown'
import { Header } from '@/components/Header'
import { Meteors } from '@/components/MeteorLanguages'
import { Speakers } from '@/components/Speakers'
import { Agenda } from '@/sections/agenda'
import { Gifts } from '@/sections/gifts'
import { Sponsors } from '@/sections/sponsors'
import { TicketHome } from '@/sections/ticket-home'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

const title = 'miduConf - La conferencia de programación y desarrollo'
const description =
	'Conferencia de programación y tecnología para el día del programador y la programadora'
const defaultOgImage = '/og-image.jpg'
const url = 'https://miduconf.com'

export default function Home({ username, flavor, ticketNumber, burst }) {
	const ogImage = username
		? `${PREFIX_CDN}/ticket-${ticketNumber}.jpg?c=${burst}`
		: `${url}${defaultOgImage}`

	return (
		<>
			<Head>
				<title>miduConf - La conferencia de programación y desarrollo</title>
				<meta name='description' content={description} />
				<meta property='og:image' content={ogImage} />
				<meta property='twitter:image' content={ogImage} />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' content={url} />
				<meta property='twitter:url' content={url} />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<Meteors />
			<Background />

			<Header />

			<main className={`${GeistSans.className} max-w-5xl m-auto mt-16 pb-20 px-4`}>
				<h2 className='animate-fade-in-up text-6xl md:text-[80px] mx-auto text-center max-w-[20ch] text-white font-bold mt-40'>
					Conoce el <span className='text-midu-primary'>futuro</span> del{' '}
					<span className='text-midu-primary'>desarrollo</span> web
				</h2>

				<TicketHome ticketNumber={ticketNumber} initialFlavor={flavor} username={username} />
				<Countdown />
				<Speakers />
				<Sponsors />
				<Gifts />
				<Agenda />
			</main>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	// read query parameter
	const { ticket } = ctx.query
	// create supabase client
	const supabase = createPagesServerClient(ctx)
	// if no ticket, return empty props
	if (!ticket) {
		return {
			props: {}
		}
	}

	// search ticket for user
	const { data, error } = await supabase.from('ticket').select('*').eq('user_name', ticket)
	// check if we have results

	if (data.length > 0 && !error) {
		return {
			props: {
				burst: crypto.randomUUID(),
				ticketNumber: data[0].ticket_number,
				username: data[0].user_name,
				flavor: data[0].flavour
			}
		}
	}

	return {
		props: {}
	}
}
