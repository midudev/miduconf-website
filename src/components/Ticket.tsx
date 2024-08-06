'use client'

import { cn } from '@/lib/utils'
import 'atropos/css'
import { TwitchIcon } from './icons'
import { MiduLogo } from './logos/midudev'

interface Props {
	transition?: boolean
	number: number
	flavor: {
		icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
		colorPalette: {
			bg: string
			borders: {
				outside: string
				inside: string
			}
			shadowColor: string
		}
	}
	user: {
		username: string
		avatar: string
	}
	isSizeFixed?: boolean
	id?: string
}

export default function Ticket({
	transition = true,
	number,
	flavor: { icon: Icon, colorPalette },
	user,
	isSizeFixed = false,
	id
}: Props) {
	const { username, avatar } = user ?? {}
	const ticketNumber = `#${number != null ? number.toString().padStart(5, '0') : ''}`

	const currentTicketStyles = {
		background: colorPalette?.bg ?? 'bg-[#101E5B]/65',
		borders: {
			outside: colorPalette?.borders.outside ?? 'border-midu-primary/10',
			inside: colorPalette?.borders.inside ?? 'border-midu-primary/20'
		},
		shadowColor: colorPalette?.shadowColor ?? 'shadow-midu-primary/25'
	}

	return (
		<div
			id={id}
			className={cn(
				'block h-full overflow-hidden opacity-100 rounded-[60px] shadow-[inset_0_4px_30px] bg-transparent border p-5',
				isSizeFixed ? 'aspect-[2/1] w-full' : 'aspect-[9/10] md:aspect-[2/1]',
				currentTicketStyles.borders.outside,
				currentTicketStyles.shadowColor,
				transition ? 'transition duration-500 ease-in-out' : ''
			)}
		>
			<div
				className={cn(
					'relative flex h-full overflow-hidden border rounded-[40px]',
					currentTicketStyles.background,
					currentTicketStyles.borders.inside,
					transition ? 'transition duration-500 ease-in-out' : ''
				)}
			>
				<div className='absolute w-1/2 rotate-45 h-[300%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#41b3ff00] via-[#b0a9ff13] to-[#41b3ff00]'></div>
				<span
					className={cn(
						'ticket-dash-border h-full font-mono text-center text-white font-bold [writing-mode:vertical-lr]',
						isSizeFixed ? 'px-4 text-[40px] leading-none' : 'px-4 text-sm md:px-7 md:text-[40px]'
					)}
				>
					{ticketNumber}
				</span>
				{
					<div key={username} className='absolute bottom-[10%] -rotate-12 left-[25%] h-[40%]'>
						<Icon className='absolute w-auto h-full' />
						<Icon
							className='absolute w-auto h-full scale-105 blur-xl -z-10 opacity-40'
							key={`${username}-shadow`}
						/>
					</div>
				}
				<div
					className={cn(
						'z-10 grid w-full grid-rows-2',
						isSizeFixed ? 'h-full pd-0' : 'h-auto md:h-full pt-5 md:pt-0'
					)}
				>
					<div className={cn('grid', isSizeFixed ? 'grid-cols-2' : 'md:grid-cols-2')}>
						<div className='h-max'>
							{avatar && (
								<div
									className={cn(
										'flex items-end justify-center gap-4 font-mono text-white gap-y-2',
										isSizeFixed
											? 'items-start flex-row p-6'
											: 'p-5 flex-col md:items-start md:flex-row md:p-6 '
									)}
								>
									<img
										src={avatar}
										crossOrigin='anonymous'
										className={cn(
											'block rounded-full',
											isSizeFixed ? 'w-[78px] h-[78px]' : 'w-20 h-20 md:w-[78px] md:h-[78px]'
										)}
										alt={`Avatar de ${username}`}
										width='78'
										height='78'
									/>
									<div>
										<p className={`text-xl font-bold`}>{username}</p>
										<span className='block px-2 py-1 mt-1 text-sm rounded w-max bg-white/10 text-white/60'>
											Ticket regular
										</span>
									</div>
								</div>
							)}
						</div>
						<div className={cn('items-center gap-4 p-5', isSizeFixed ? 'block' : 'flex md:block')}>
							<MiduLogo
								className={cn('order-1 h-auto w-9', isSizeFixed ? 'ml-auto' : ' ml-0 md:ml-auto')}
							/>
							<time
								dateTime='2024-09-12T06:00:00'
								className='block mt-2 ml-auto font-bold text-right text-white md:ml-0'
							>
								Sept. 12 2024
								<span className='block text-sm font-normal text-white/60'>06:00 GTM-6</span>
							</time>
						</div>
					</div>
					<a
						href='https://www.twitch.tv/midudev'
						target='_blank'
						rel='nofollow'
						className={cn(
							'flex items-center justify-self-end justify-end self-end gap-2 p-5 font-bold text-white col-span-full w-max hover:text-[#b9a3e3] transition-colors',
							isSizeFixed ? 'text-xl' : 'text-md md:text-xl'
						)}
					>
						<TwitchIcon className={cn('h-auto', isSizeFixed ? 'w-5' : 'w-4 md:w-5')} />
						twitch.tv/midudev
					</a>
				</div>
			</div>
		</div>
	)
}
