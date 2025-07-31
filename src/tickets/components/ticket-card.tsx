import { cn } from '@/lib/utils'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { HologramOption } from '../types/hologram-option'
import { TwitchIcon } from '@/components/icons/twitch'

interface Props {
	username: string
	fullname: string
	ticketNumber: number
	hologram?: HologramOption
	twitchTier?: string | null
}

export const TicketCard = ({
	fullname,
	ticketNumber,
	username,
	hologram = 'standard',
	twitchTier
}: Props) => {
	const hologramStyles = getHologramStyles(hologram)

	return (
		<article
			className={cn(
				'w-full max-w-[320px] md:max-w-[500px] aspect-[397/597] overflow-hidden p-2 bg-gradient-to-tr from-white/20 via-transparent to-white/20 rounded-2xl border border-pallet-border-foreground',
				hologramStyles.outer
			)}
		>
			<div
				className={cn(
					'bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] border border-pallet-border-foreground rounded-xl flex flex-col relative h-full overflow-hidden font-ibm-plex',
					hologramStyles.inner
				)}
			>
				{hologramStyles.badge && (
					<span
						className={cn(
							'absolute top-4 right-4 flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-full border border-white/20 backdrop-blur-sm',
							hologramStyles.badge.gradient,
							hologramStyles.badge.textColor,
							hologramStyles.badge.shadow,
							'animate-pulse-slow'
						)}
					>
						<TwitchIcon className='w-auto h-4 drop-shadow-sm' />
						<span className='drop-shadow-sm'>{hologramStyles.badge.label}</span>
					</span>
				)}
				<WhiteMidudevLogo
					className={cn(
						'absolute w-auto h-20 max-sm:h-[70px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2',
						hologramStyles.logo
					)}
				/>
				<header className='p-6 uppercase max-sm:p-5'>
					<p className={cn('text-pallet-ghost mt-2', hologramStyles.text && hologramStyles.text)}>
						/@{username}
					</p>
					<h3
						className={cn(
							'mt-6 text-4xl max-sm:text-3xl font-medium text-pretty max-w-[16ch]',
							hologramStyles.text && hologramStyles.text
						)}
					>
						{fullname}
					</h3>
				</header>
				<footer className='flex flex-col justify-end flex-1'>
					<span
						className={cn(
							'mb-2 mx-auto font-medium text-[calc(426px_/_8)] sm:text-[calc(375px_/_6)] md:text-[calc(375px_/_6)] tabular-nums leading-none',
							hologramStyles.text && hologramStyles.text
						)}
					>
						#{String(ticketNumber).padStart(6, '0')}
					</span>
					<time
						dateTime='2025-09-10T16:00:00'
						className={cn(
							'flex items-center text-pallet-ghost justify-between gap-4 font-light px-3 pb-2 text-xs sm:px-5 sm:pb-5 sm:text-base',
							hologramStyles.text && hologramStyles.text
						)}
					>
						<span>Sept.10 2025</span>
						<span>16:00h CEST</span>
					</time>
				</footer>
			</div>
		</article>
	)
}

const getHologramStyles = (hologram: HologramOption) => {
	const styles = {
		outer: '',
		inner: '',
		logo: '',
		text: '',
		badge: null as { label: string; gradient: string; textColor: string; shadow: string } | null
	}

	switch (hologram) {
		case 'twitch-1':
			styles.outer =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-20 from-pink-200/20 to-sky-200/20'
			styles.inner =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-20 from-pink-200/20 to-sky-200/20 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10'
			styles.logo =
				'text-pallet-background [filter:drop-shadow(-2px_-2px_.5px_#695f68)_drop-shadow(2px_2px_.5px_#59646f)_drop-shadow(-2px_2px_.5px_#695f68)_drop-shadow(2px_-2px_.5px_#596460)]'
			styles.text =
				'bg-gradient-to-r from-pink-200 via-white to-sky-200 bg-clip-text text-transparent'
			styles.badge = {
				label: 'Tier 1',
				gradient: 'bg-gradient-to-tr from-purple-400 via-pink-300 to-purple-500',
				textColor: 'text-black',
				shadow: 'shadow-lg shadow-purple-500/30'
			}
			break

		case 'twitch-2':
			styles.outer =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-15 from-[#F8F4CE]/20 to-[#C6C2DD]/20'
			styles.inner =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-15 from-[#F8F4CE]/20 to-[#C6C2DD]/20 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10'
			styles.logo = 'text-[#F8F4CE] [filter:drop-shadow(0_0_8px_#F8F4CE)]'
			styles.text =
				'bg-gradient-to-r from-[#F8F4CE] via-[#D1B8DF] to-[#C6C2DD] bg-clip-text text-transparent'
			styles.badge = {
				label: 'Tier 2',
				gradient: 'bg-gradient-to-tr from-[#F8F4CE] via-[#D1B8DF] to-[#C6C2DD]',
				textColor: 'text-black',
				shadow: 'shadow-lg shadow-[#D1B8DF]/40'
			}
			break

		case 'twitch-3':
			styles.outer =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-25 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-br before:from-[#9CFCC4]/30 before:via-[#B3A1E5]/20 before:to-[#F2B4E0]/30 before:opacity-60 from-[#9CFCC4]/25 to-[#F2B4E0]/25 shadow-2xl shadow-[#B3A1E5]/40'
			styles.inner =
				'after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-[url(/tickets/gradient.png)] after:opacity-20 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10 relative overflow-hidden [&::before]:bg-gradient-to-br [&::before]:from-[#9CFCC4]/8 [&::before]:via-[#B3A1E5]/12 [&::before]:to-[#F2B4E0]/8'
			styles.logo =
				'text-[#FCFCFA] [filter:drop-shadow(0_0_6px_#9CFCC4)_drop-shadow(0_0_4px_#B3A1E5)]'
			styles.text =
				'bg-gradient-to-r from-[#9CFCC4] via-[#B3A1E5] via-[#F2B4E0] to-[#D5DFC5] bg-clip-text text-transparent font-bold [text-shadow:0_0_15px_rgba(156,252,196,0.6)]'
			styles.badge = {
				label: 'Tier 3',
				gradient: 'bg-gradient-to-tr from-[#9CFCC4] via-[#B3A1E5] via-[#F2B4E0] to-[#D5DFC5]',
				textColor: 'text-black',
				shadow: 'shadow-xl shadow-[#B3A1E5]/50'
			}
			break

		case 'academia-mensual':
		case 'academia-trimestral':
		case 'academia-anual':
		case 'academia-lifetime':
			// Sin estilos - usar default
			break
	}

	return styles
}
