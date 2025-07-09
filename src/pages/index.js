import { Hero } from '@/sections/hero'
import { Layout } from '@/sections/layout'
import { Speakers } from '@/sections/speakers'
import { Sponsors } from '@/sections/sponsors'
import { WhatToExpect } from '@/sections/what-to-expect'

const PREFIX_CDN = 'https://ljizvfycxyxnupniyyxb.supabase.co/storage/v1/object/public/tickets'

const title = 'miduConf - La conferencia de programación y desarrollo'
const description =
	'Conferencia de programación y tecnología para el día del programador y la programadora'
const defaultOgImage = '/og-image.jpg'
const url = 'https://miduconf.com'

export default function Home({
	username,
	flavor,
	ticketNumber,
	burst,
	material,
	stickers,
	twitchTier,
	noUser
}) {
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
				<Hero />
				<WhatToExpect />
				<Speakers />
				<Sponsors />
			</main>
		</Layout>
	)
}

/* export const getServerSideProps = async (ctx) => {
	// read query parameter
	const { ticket, 'no-user': noUser } = ctx.query

	if (noUser != null) {
		return {
			props: {
				noUser: true
			}
		}
	}

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
				flavor: data[0].flavour,
				material: data[0].material,
				stickers: data[0].stickers,
				twitchTier: data[0].twitch_tier
			}
		}
	}

	return {
		props: {}
	}
} */
