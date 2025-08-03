import { useSupabaseSignInByGitHub } from '@/auth/hooks/use-supabase-signin-by-github'
import { Countdown } from '@/components/Countdown'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { MiduLogo3D } from '@/components/experience/MiduLogo3D'
import { CallToAction } from '@/components/CallToAction'

interface Props {
	userData?: User
}

export function Hero({ userData }: Props) {
	const { signin } = useSupabaseSignInByGitHub()
	return (
		<section className='relative h-screen' role='banner' aria-labelledby='hero-title'>
			<div className='absolute inset-0'>
				<MiduLogo3D />
			</div>

			<div className='absolute bottom-0 z-10 space-y-spacing-40 lg:grid lg:grid-cols-2 xl:grid-cols-[726px_500px] items-end justify-between w-full px-5 pb-5 bg-gradient-to-t from-black md:bg-none animate-fade-in-up md:bottom-0 md:left-0'>
				<div className='flex flex-col items-center mx-auto lg:ml-0 lg:items-start gap-spacing-24'>
					<Countdown className='' />
					<h1 id='hero-title' className='text-center lg:text-left text-4xl-semibold text-balance'>
						<span className='block'>La nueva era de</span>
						<span className='block'>la programación</span>
					</h1>
				</div>
				<div className='flex flex-col gap-spacing-24'>
					<p className='text-center lg:text-left text-xl-medium text-pretty'>
						Conferencia de Programación y Desarrollo en Español en{' '}
						<Link
							href='https://www.twitch.tv/midudev'
							className='underline text-palette-primary focus:outline-none focus:ring-2 focus:ring-palette-primary focus:ring-offset-2 focus:ring-offset-black'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visitar el canal de Twitch de midudev (se abre en nueva ventana)'
						>
							Twitch
						</Link>
					</p>

					{userData ? (
						<div className='flex flex-wrap items-center gap-spacing-16 mx-auto lg:mx-0'>
							<CallToAction
								className='hidden: md:block'
								IconComponent={EnterArrow}
								estilo='default'
								text='Ver tu Ticket'
								href='/ticket'
							/>
							{userData?.user_metadata.avatar_url && (
								<img
									className='object-cover w-10 h-10 rounded-[5px] aspect-square'
									width='60'
									height='60'
									src={userData.user_metadata.avatar_url}
									alt={`Avatar de ${userData.user_metadata.name ?? userData.user_metadata.full_name ?? 'tu usuario'
										}`}
								/>
							)}
						</div>
					) : (
						<>
							<CallToAction
								onClick={signin}
								className='mx-auto lg:ml-0 hero-ticket'
								text='Obtener ticket'
								estilo='default'
								IconComponent={EnterArrow}
							/>
						</>
					)}
				</div>
			</div>
		</section>
	)
}
