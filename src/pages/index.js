import { GeistMono } from 'geist/font/mono'

import { Countdown } from '@/components/Countdown'
import { Layout } from '@/sections/layout'
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
			<main className={`${GeistMono.className} relative min-h-screen`}>
				<section className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full px-8 py-16 md:items-end md:flex-row gap-y-4 bg-gradient-to-t from-black md:bg-none'>
					<div>
						<p className='text-white'>
							Con{' '}
							<a
								href='https://midu.dev/'
								target='_blank'
								className='text-white underline md:text-midu-primary'
							>
								@midudev
							</a>
						</p>
						<h2 className='text-4xl leading-normal font-bold max-w-[24ch] text-white text-balance'>
							Evento de <span className='text-midu-primary'>Programación</span> y{' '}
							<span className='text-midu-primary'>Desarrollo Web</span>
						</h2>
					</div>
					<div className='animate-fade-in-up'>
						<p className='mb-2 text-sm text-center text-white md:ml-4 md:text-start'>
							<time dateTime='2025-09-10'>10 de Sepiembre de 2025</time> | Ver en{' '}
							<a
								href='https://www.twitch.tv/midudev'
								className='underline text-violet-200'
								target='_blank'
							>
								Twitch
							</a>
						</p>
						<Countdown className='mb-4' />
						<button
							disabled
							className='flex [box-shadow:-4px_4px_0_0_#0099FF60] items-center gap-x-4 gap-y-2 py-4 pl-8 pr-6 text-xl text-white bg-midu-primary disabled:cursor-not-allowed md:flex-row flex-col w-full md:w-auto'
						>
							Consigue tu Ticket{' '}
							<span className='w-full px-2 py-1 text-sm bg-black/20 md:w-auto'>Próximamente</span>
						</button>
					</div>
				</section>
			</main>
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
