import { ShimmerButton } from '@/components/magicui/ShimmerButton'
import Ticket from '@/components/Ticket'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { FLAVORS } from '@/flavors/data'

export const TicketHome = ({ ticketNumber, username, initialFlavor }) => {
	const supabase = useSupabaseClient()
	const [flavor, setFlavor] = useState(FLAVORS[initialFlavor] ?? FLAVORS.javascript)
	const [number, setNumber] = useState(ticketNumber ?? 0)

	useEffect(() => {
		if (initialFlavor) return

		const keys = Object.keys(FLAVORS)
		const length = keys.length

		const intervalId = setInterval(() => {
			// get a random key from FLAVORS object
			const randomKey = keys[Math.floor(Math.random() * length)]
			setFlavor(FLAVORS[randomKey])
		}, 2500)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	useEffect(() => {
		if (ticketNumber) return

		fetch('/api/number')
			.then((res) => res.json())
			.then((response) => {
				setNumber(+response.number + 100)
			})
	}, [])

	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo:
					process.env.NODE_ENV !== 'production'
						? 'http://localhost:3000/api/auth/callback'
						: 'https://miduconf.com/api/auth/callback'
			}
		})
	}

	const handleGoToDiscord = () => {
		window.open('https://discord.gg/qNqRXh3f?event=1146458434682748939', '_blank')
	}

	return (
		<div>
			<div className='block w-full h-full'>
				<div className='flex items-center justify-center max-w-5xl mx-auto mt-10 flex-0'>
					<Ticket
						transition={!initialFlavor}
						number={number}
						flavor={flavor}
						user={{
							avatar: username ? `https://unavatar.io/github/${username}` : null,
							username
						}}
					/>
				</div>
				<div className='flex flex-col items-center justify-center gap-4 mx-auto scale-90 md:flex-row sm:scale-100'>
					<ShimmerButton onClick={handleLogin} size='large'>
						<svg
							className='mr-3'
							width='32'
							height='32'
							viewBox='0 0 24 24'
							strokeWidth='1'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M15 5l0 2'></path>
							<path d='M15 11l0 2'></path>
							<path d='M15 17l0 2'></path>
							<path d='M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2'></path>
						</svg>
						¡Consigue tu entrada GRATIS!
					</ShimmerButton>
					<ShimmerButton
						shimmerDuration='0'
						shimmerSize='0'
						type='secondary'
						onClick={handleGoToDiscord}
						size='large'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='mr-3'
							width='32'
							height='32'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6'></path>
							<path d='M16 3v4'></path>
							<path d='M8 3v4'></path>
							<path d='M4 11h16'></path>
							<path d='M15 19l2 2l4 -4'></path>
						</svg>
						Guarda la fecha del evento
					</ShimmerButton>
				</div>
			</div>
		</div>
	)
}
