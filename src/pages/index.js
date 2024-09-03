import { GeistSans } from 'geist/font/sans'

import { Background } from '@/components/Background'
import { Countdown } from '@/components/Countdown'
import { Meteors } from '@/components/MeteorLanguages'
import { Speakers } from '@/components/Speakers'
import { Stars } from '@/components/Stars'
import { Agenda } from '@/sections/agenda'
import { Gifts } from '@/sections/gifts'
import { Layout } from '@/sections/layout'
import { Sponsors } from '@/sections/sponsors'
import { TicketHome } from '@/sections/ticket-home'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

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
	twitchTier
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
			<main className={`${GeistSans.className}`}>
				<section className='relative px-4 pb-20 before:bg-gradient-to-b before:from-[#020617] before:via-[#020617] before:-z-10 before:inset-0 before:to-[#0B217D] before:size-full before:absolute border-b border-midu-primary inset-0 m-auto'>
					<Stars />
					<Meteors />
					<Background />
					<div className='max-w-5xl mx-auto'>
						<h2 className='animate-fade-in-up text-5xl sm:text-6xl md:text-[80px] mx-auto text-center max-w-[20ch] text-white font-bold pt-40'>
							Conoce el <span className='text-midu-primary'>futuro</span> de la{' '}
							<span className='text-midu-primary'>programación</span>
						</h2>
						<TicketHome
							ticketNumber={ticketNumber}
							initialFlavor={flavor}
							username={username}
							material={material}
							stickers={stickers}
							twitchTier={twitchTier}
						/>
						<Countdown />
					</div>
				</section>
				<Speakers />
				<Sponsors />
				<Gifts />
				<Agenda />
			</main>
		</Layout>
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
}
