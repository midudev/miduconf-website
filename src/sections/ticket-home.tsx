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
		window.open('https://discord.gg/EuxacQb2?event=1146458434682748939', '_blank')
	}

	return (
		<div>
			<div className='block w-full h-full'>
				<div className='mt-10 flex items-center justify-center flex-0 max-w-5xl scale-[0.9] sm:scale-[0.7] md:scale-[.9] xl:scale-100 mx-auto'>
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
						¡Consigue tu entrada GRATIS!
					</ShimmerButton>
					<ShimmerButton
						shimmerDuration='0'
						shimmerSize='0'
						type='secondary'
						onClick={handleGoToDiscord}
						size='large'
					>
						Guarda la fecha del evento
					</ShimmerButton>
				</div>
			</div>
		</div>
	)
}
