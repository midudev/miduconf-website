import { GeistSans } from 'geist/font/sans'

import { Background } from '@/components/Background'
import { Button } from '@/components/Button'
import { TicketIcon } from '@/components/icons'
import { MiduLogo } from '@/components/logos/midudev'
import { Meteors } from '@/components/MeteorLanguages'
import { Modal } from '@/components/Modal'
import { Speakers } from '@/components/Speakers'
import { Stars } from '@/components/Stars'
import { Agenda } from '@/sections/agenda'
import { Gifts } from '@/sections/gifts'
import { Layout } from '@/sections/layout'
import { Sponsors } from '@/sections/sponsors'
import { TicketHome } from '@/sections/ticket-home'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

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
	const [showNoUserModal, setShowNoUserModal] = useState(noUser)

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
						<h2 className='animate-fade-in-up text-5xl sm:text-6xl md:text-[80px] mx-auto text-center max-w-[20ch] text-white font-bold pt-60 pb-4 text-balance'>
							¡Gracias por disfrutar la <span className='text-yellow-300'>miduConf 2024</span>!
						</h2>
						<h3 className='pt-4 pb-4 text-lg text-center text-white'>
							Volvemos en el año que viene con más y mejores charlas y sorteos.
						</h3>
						<h3 className='pb-4 text-lg text-center text-yellow-300'>
							Pero el 1 de marzo de 2025 tenemos nueva conferencia:
						</h3>

						<div className='flex justify-center'>
							<Button
								as='a'
								href='https://jsconf.es'
								className='flex px-6 py-5 text-lg font-bold text-black w-content md:text-3xl rounded-xl bg-yellow-300/90 shadow-yellow-400 hover:shadow-yellow-300 hover:bg-yellow-300 hover:contrast-125'
							>
								<TicketIcon className='mr-3' />
								Ir a la JSConf España 2025
							</Button>
						</div>

						<hr className='pt-8 mt-16' />

						<TicketHome
							ticketNumber={ticketNumber}
							initialFlavor={flavor}
							username={username}
							material={material}
							stickers={stickers}
							twitchTier={twitchTier}
						/>
					</div>
				</section>
				<Speakers />
				<Sponsors />
				<Gifts />
				<Agenda />
			</main>
			<Modal isOpen={showNoUserModal} onClose={() => setShowNoUserModal(false)}>
				<MiduLogo className='w-20 h-auto mx-auto mt-4' />
				<h2 className='mt-4 text-4xl text-center text-midu-secondary text-pretty'>
					No hay ningún Ticket asociado a tu cuenta
				</h2>
				<p className='px-4 py-2 my-4 border rounded-lg bg-midu-primary/20 border-midu-primary/20 text-midu-secondary'>
					¡Nos vemos este año para celebrar la MiduConf 2025!
				</p>
			</Modal>
		</Layout>
	)
}

export const getServerSideProps = async (ctx) => {
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
}
