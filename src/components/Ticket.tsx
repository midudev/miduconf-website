'use client'

import { cn } from '@/lib/utils'
import 'atropos/css'
import { TwitchIcon } from './icons'
import { MiduLogo } from './logos/midudev'
import { SponsorIcons } from '@/components/icons/sponsors'

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
				isSizeFixed ? 'aspect-[2/1] w-full' : 'aspect-none w-full md:aspect-[2/1]',
				currentTicketStyles.borders.outside,
				currentTicketStyles.shadowColor,
				transition ? 'transition duration-500 ease-in-out' : ''
			)}
		>
			<div
				className={cn(
					'relative h-full overflow-hidden border rounded-[40px]',
					isSizeFixed ? 'flex' : 'grid md:flex',
					currentTicketStyles.background,
					currentTicketStyles.borders.inside,
					transition ? 'transition duration-500 ease-in-out' : ''
				)}
			>
				<div className='absolute w-1/2 rotate-45 h-[300%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#41b3ff00] via-[#b0a9ff13] to-[#41b3ff00]'></div>
				<span
					className={cn(
						'h-full font-mono text-center text-white font-bold',
						isSizeFixed
							? 'ticket-dash-border px-4 text-3xl py-0 leading-none [writing-mode:vertical-lr]'
							: 'ticket-dash-border-top row-[3/4] px-4 py-4 md:py-0 text-4xl md:px-4 md:text-3xl md:[writing-mode:vertical-lr] md:ticket-dash-border'
					)}
				>
					{ticketNumber}
				</span>
				{
					<div
						key={username}
						className={cn(
							'-rotate-12',
							isSizeFixed
								? 'absolute bottom-[20%] left-[25%] mb-0 h-[40%] w-auto block'
								: 'md:w-auto row-[2/3] mb-8 md:mb-0 left-0 mx-auto md:mx-0 h-32 md:h-[40%] relative flex justify-center w-full md:block bottom-0 md:left-[25%] md:bottom-[20%]  md:absolute'
						)}
					>
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
						isSizeFixed
							? 'h-full pd-0 grid-rows-2'
							: 'h-auto md:h-full pt-5 md:pt-0 grid-rows-[1fr_auto] md:grid-rows-2'
					)}
				>
					<div className={cn('grid', isSizeFixed ? 'grid-cols-2' : 'md:grid-cols-2')}>
						<div className='h-max'>
							{avatar && (
								<div
									className={cn(
										'flex items-end justify-center font-mono gap-4 text-white gap-y-2',
										isSizeFixed
											? 'items-start flex-row p-6 text-left'
											: 'p-5 flex-col md:items-start md:flex-row md:p-6 items-center text-center md:text-left'
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
										<p className='text-xl font-bold'>{username}</p>
										<span className='block px-2 py-1 mt-1 text-sm font-medium rounded w-max text-white/80 bg-white/10'>
											Normal Ticket
										</span>
									</div>
								</div>
							)}
						</div>
						<div
							className={cn(
								'items-center gap-4 p-5 flex-row',
								isSizeFixed && avatar
									? 'block'
									: `${avatar ? 'hidden' : 'flex'} md:block flex-col-reverse md:flex-row`,
								avatar == null ?? 'hidden'
							)}
						>
							<MiduLogo
								className={cn('order-1 h-auto w-9', isSizeFixed ? 'ml-auto' : ' ml-0 md:ml-auto')}
							/>
							<time
								dateTime='2024-09-12T06:00:00'
								className={cn(
									'block mt-2 ml-auto font-bold text-right text-white md:ml-0',
									isSizeFixed ? 'text-right mr-0' : 'text-center mr-auto md:mr-0 md:text-right'
								)}
							>
								Sept. 12 2024
								<span className='block text-sm font-normal text-white/60'>06:00 GTM-6</span>
							</time>
						</div>
					</div>
					<div
						className={cn(
							'grid self-end gap-4',
							isSizeFixed ? 'grid-cols-[1fr_auto] ' : ' grid-cols-1 md:grid-cols-[1fr_auto]'
						)}
					>
						<div
							className={cn(
								'flex flex-col justify-end',
								isSizeFixed
									? 'mx-0 px-0 pb-5 pl-5 items-start w-auto'
									: 'px-2 md:px-0 items-center w-full md:w-auto md:items-start pb-0 md:pl-5 md:pb-5 mx-auto md:mx-0'
							)}
						>
							<span className='pb-1 pl-2 text-sm text-white/80'>Gracias a:</span>
							<div
								className={cn(
									'flex items-center justify-start grid-cols-3 gap-4 px-4 py-2 bg-white/10 w-auto',
									isSizeFixed ? 'rounded-full' : 'rounded md:rounded-full '
								)}
							>
								{LIST_OF_TICKET_SPONSORS.map(({ Icon, name }) => (
									<Icon className='w-auto h-auto text-white max-h-5' key={name} />
								))}
							</div>
						</div>
						<a
							href='https://www.twitch.tv/midudev'
							target='_blank'
							rel='nofollow'
							className={cn(
								'flex items-center justify-self-end justify-end gap-2 p-5 font-bold text-white w-max hover:text-[#b9a3e3] transition-colors',
								isSizeFixed
									? 'text-xl mx-0 pt-5'
									: 'pt-0 text-md md:text-xl mx-auto md:mx-0 md:pt-5'
							)}
						>
							<TwitchIcon className={cn('h-auto', isSizeFixed ? 'w-5' : 'w-4 md:w-5')} />
							twitch.tv/midudev
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

const LIST_OF_TICKET_SPONSORS = [
	{
		name: 'platzi',
		Icon: SponsorIcons.platzi
	},
	{
		name: 'donDominio',
		Icon: SponsorIcons.donDominio
	},
	{
		name: 'keepCode',
		Icon: SponsorIcons.keepCoding
	}
]
