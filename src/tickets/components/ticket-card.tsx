import { cn } from '@/lib/utils'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { HologramOption } from '../types/hologram-option'
import { ColorOption } from '../types/color-option'
import { TwitchIcon } from '@/components/icons/twitch'
import { TicketPhysicsBackground } from './ticket-physics-background'
import { StructureType, AnimationType } from '../animations'

interface Props {
	username: string
	fullname: string
	ticketNumber: number
	hologram?: HologramOption
	color?: ColorOption
	twitchTier?: string | null
	structure?: StructureType
	animation?: AnimationType
}

export const TicketCard = ({
	fullname,
	ticketNumber,
	username,
	hologram = 'standard',
	color = 'blue',
	twitchTier,
	structure = 'box',
	animation = 'default'
}: Props) => {
	const hologramStyles = getHologramStyles(hologram)
	const colorStyles = getColorStyles(color)

	return (
		<article
			className={cn(
				'w-[280px] md:w-[350px] lg:w-[400px] aspect-[397/597] overflow-hidden p-2 bg-gradient-to-tr from-white/20 via-transparent to-white/20 rounded-xl border relative border-palette-border-foreground',
				hologramStyles.outer,
				colorStyles.outer,
				hologram === 'academia-mensual' && 'from-yellow-200/10 via-transparent to-yellow-200/10',
				hologram === 'academia-trimestral' &&
				'from-sky-400/10 via-pink-500/20 to-sky-400/10 border-sky-100/10',
				hologram === 'academia-anual' &&
				'from-red-200/40 via-white/40 to-sky-200/40 border-white/20',
				hologram === 'academia-lifetime' && 'from-yellow-200/10 via-transparent to-yellow-200/10'
			)}
		>
			{['academia-mensual', 'academia-trimestral', 'academia-anual', 'academia-lifetime'].includes(
				hologram
			) && (
					<>
						<div className='w-full h-full absolute left-0 top-0 bg-[url(/tickets/noise.png)] opacity-40 bg-center z-40'></div>
						<div className='w-[200%] h-[200%] -rotate-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[url(/tickets/midudev.png)] [background-size:100px_auto] bg-repeat -z-40'></div>
					</>
				)}
			<div
				className={cn(
					'bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] border border-palette-border-foreground rounded-xl flex flex-col relative h-full overflow-hidden font-ibm-plex',
					hologramStyles.inner,
					hologram === 'academia-mensual' &&
					'bg-gradient-to-t from-yellow-200/10 via-orange-500/5 to-violet-800/10 ',
					hologram === 'academia-mensual' &&
					'after:w-full after:h-full after:absolute after:opacity-80 after:left-0 after:top-0 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10',
					hologram === 'academia-trimestral' &&
					'bg-gradient-to-tl from-[#97d7e2]/10 via-[#88b5ec]/5 to-[#c7b7f0]/10 border-sky-100/10',
					hologram === 'academia-trimestral' &&
					'after:w-full after:h-full after:absolute after:opacity-80 after:left-0 after:top-0 before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-gradient-to-tr before:from-[#1f1f25] before:via-[#101015] before:to-[#1f1f25] before:-z-10',
					hologram === 'academia-anual' &&
					'[background:linear-gradient(45deg,_#b15b6280,_#a4cbbb80,_#efeae580,_#61595c80,_#bfc6a580,_#6b5e8e40),_linear-gradient(-45deg,_#b15b6280,_#a4cbbb80,_#efeae580,_#61595c80,_#bfc6a580,_#6b5e8e40),_linear-gradient(90deg,_#b15b6280,_#a4cbbb80,_#efeae580,_#61595c80,_#bfc6a580,_#6b5e8e40),_linear-gradient(-90deg,_#b15b6280,_#a4cbbb80,_#efeae580,_#61595c80,_#bfc6a580,_#6b5e8e40)] border-yellow-200/10',
					hologram === 'academia-lifetime' &&
					'bg-gradient-conic from-[#3f3c2a] via-palette-border-foreground to-[#3f3c2a] backdrop-blur-md border-yellow-300/10'
				)}
			>
				{hologram === 'academia-mensual' && (
					<div className='absolute text-[10px] text-black bg-gradient-to-tr top-0 right-4 px-2 py-1 from-yellow-200 via-orange-100 to-violet-400/20 opacity-75 inline-flex items-center gap-1'>
						<WhiteMidudevLogo className='w-auto h-3 text-black' /> | mensual
					</div>
				)}
				{hologram === 'academia-trimestral' && (
					<div className='absolute text-[10px] text-black bg-gradient-to-tr top-0 right-4 px-2 py-1 from-sky-200 via-white to-pink-200 opacity-75 inline-flex items-center gap-1'>
						<WhiteMidudevLogo className='w-auto h-3 text-black' /> | trimestral
					</div>
				)}
				{hologram === 'academia-anual' && (
					<div className='absolute text-[10px] text-black bg-gradient-to-tr top-0 right-4 px-2 py-1 from-orange-200 via-red to-yellow-200 opacity-75 inline-flex items-center gap-1'>
						<WhiteMidudevLogo className='w-auto h-3 text-black' /> | anual
					</div>
				)}
				{hologram === 'academia-lifetime' && (
					<div className='absolute text-[10px] text-black bg-gradient-to-tr top-0 right-4 px-2 py-1 from-yellow-300/40 via-yellow-50 to-yellow-200 rounded-b-lg opacity-75 inline-flex items-center gap-1'>
						<WhiteMidudevLogo className='w-auto h-3 text-black' /> | lifetime
					</div>
				)}
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
						hologramStyles.logo,
						hologram === 'academia-mensual' &&
						'text-palette-border-foreground [filter:drop-shadow(-2px_-2px_.5px_#90855c)_drop-shadow(2px_2px_.5px_#c0ab98)_drop-shadow(-2px_2px_.5px_#90855c)_drop-shadow(2px_-2px_.5px_#a89494)]',
						hologram === 'academia-trimestral' &&
						'text-palette-border-foreground [filter:drop-shadow(-2px_-2px_0.5px_#97d7e2)_drop-shadow(2px_2px_0.5px_#e3acd2)_drop-shadow(-2px_2px_0.5px_#c7b7f0)_drop-shadow(2px_-2px_0.5px_#e3acd2)]',
						hologram === 'academia-anual' &&
						'text-palette-border-foreground [filter:drop-shadow(-2px_-2px_0.5px_#b15b62)_drop-shadow(2px_2px_0.5px_#a4cbbb)_drop-shadow(-2px_2px_0.5px_#6b5e8e)_drop-shadow(2px_-2px_0.5px_#bfc6a5)]',
						hologram === 'academia-lifetime' &&
						'text-[#25262a] [filter:drop-shadow(-2px_-2px_0.5px_#d6d5c0)_drop-shadow(2px_2px_0.5px_#d1c67e)_drop-shadow(-2px_2px_0.5px_#d1ca93)_drop-shadow(2px_-2px_0.5px_#afad9b)]'
					)}
				/>
				<header className={cn('p-6 uppercase max-sm:p-5')}>
					<p
						className={cn(
							'text-palette-ghost mt-2',
							hologramStyles.text && hologramStyles.text,
							hologram === 'academia-mensual' &&
							'bg-gradient-to-r from-yellow-200/40 via-white to-orange-200/80 bg-clip-text text-transparent',
							hologram === 'academia-trimestral' &&
							'bg-gradient-to-r from-pink-200/40 via-white to-rose-200/80 bg-clip-text text-transparent',
							hologram === 'academia-anual' &&
							'bg-gradient-to-r from-palette-border-foreground/80 to-yellow-800/80 bg-clip-text text-transparent',
							hologram === 'academia-lifetime' &&
							'bg-gradient-to-r from-yellow-50/80 to-yellow-100/80 bg-clip-text text-transparent'
						)}
					>
						/@{username}
					</p>
					<h3
						className={cn(
							'mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-pretty max-w-[16ch]',
							hologramStyles.text && hologramStyles.text,
							hologram === 'academia-mensual' &&
							'bg-gradient-to-r from-yellow-200/40 via-white/80 to-sky-200/80 bg-clip-text text-transparent leading-normal',
							hologram === 'academia-trimestral' &&
							'bg-gradient-to-r from-pink-200/40 via-white to-sky-200/80 bg-clip-text text-transparent leading-normal',
							hologram === 'academia-anual' &&
							'bg-gradient-to-r from-black/80 via-yellow-800/80 to-palette-border-foreground/80  bg-clip-text text-transparent leading-normal',
							hologram === 'academia-lifetime' &&
							'bg-gradient-to-r from-yellow-50/80 via-yellow-200/80 to-yellow-100/80  bg-clip-text text-transparent leading-normal'
						)}
					>
						{fullname}
					</h3>
				</header>
				<footer className='flex flex-col justify-end flex-1'>
					<span
						className={cn(
							'mb-2 mx-auto font-medium text-[3.5rem] md:text-7xl lg:text-[5.3rem] tabular-nums leading-none',
							hologramStyles.text && hologramStyles.text,
							hologram === 'academia-mensual' &&
							'bg-gradient-to-r from-yellow-200/40 via-pink-200/60 to-orange-200/80 bg-clip-text text-transparent',
							hologram === 'academia-trimestral' &&
							'bg-gradient-to-r from-pink-200/40 via-white to-sky-200/80 bg-clip-text text-transparent',
							hologram === 'academia-anual' &&
							'bg-gradient-to-r from-black/80 via-yellow-800/80 to-palette-border-foreground/80 bg-clip-text text-transparent',
							hologram === 'academia-lifetime' &&
							'bg-gradient-to-r from-yellow-50/80 via-yellow-200/80 to-yellow-100/80 bg-clip-text text-transparent'
						)}
					>
						#{String(ticketNumber).padStart(6, '0')}
					</span>
					<time
						dateTime='2025-09-10T16:00:00'
						className={cn(
							'flex items-center text-palette-ghost justify-between gap-4 font-light px-3 pb-2 text-xs sm:px-5 sm:pb-5',
							hologramStyles.text && hologramStyles.text,
							hologram === 'academia-mensual' &&
							'bg-gradient-to-r from-yellow-200/40 via-white to-orange-200/80 bg-clip-text text-transparent',
							hologram === 'academia-trimestral' &&
							'bg-gradient-to-r from-pink-200/40 via-white to-sky-200/80 bg-clip-text text-transparent',
							hologram === 'academia-anual' &&
							'bg-gradient-to-r from-black/80 via-yellow-800/80 to-palette-border-foreground/80 bg-clip-text text-transparent',
							hologram === 'academia-lifetime' &&
							'bg-gradient-to-r from-yellow-50/80 via-yellow-200/80 to-yellow-100/80 bg-clip-text text-transparent'
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
				'text-palette-background [filter:drop-shadow(-2px_-2px_.5px_#695f68)_drop-shadow(2px_2px_.5px_#59646f)_drop-shadow(-2px_2px_.5px_#695f68)_drop-shadow(2px_-2px_.5px_#596460)]'
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

const getColorStyles = (color: ColorOption) => {
	const styles = {
		outer: '',
		inner: ''
	}

	switch (color) {
		case 'blue':
			styles.outer = 'border-blue-500/30 from-blue-500/10 via-blue-400/5 to-blue-600/10'
			styles.inner = 'border-blue-500/20 from-blue-900/20 via-blue-800/10 to-blue-900/20'
			break
		case 'orange':
			styles.outer = 'border-orange-500/30 from-orange-500/10 via-orange-400/5 to-orange-600/10'
			styles.inner = 'border-orange-500/20 from-orange-900/20 via-orange-800/10 to-orange-900/20'
			break
		case 'red':
			styles.outer = 'border-red-500/30 from-red-500/10 via-red-400/5 to-red-600/10'
			styles.inner = 'border-red-500/20 from-red-900/20 via-red-800/10 to-red-900/20'
			break
		case 'green':
			styles.outer = 'border-green-500/30 from-green-500/10 via-green-400/5 to-green-600/10'
			styles.inner = 'border-green-500/20 from-green-900/20 via-green-800/10 to-green-900/20'
			break
		case 'pink':
			styles.outer = 'border-pink-500/30 from-pink-500/10 via-pink-400/5 to-pink-600/10'
			styles.inner = 'border-pink-500/20 from-pink-900/20 via-pink-800/10 to-pink-900/20'
			break
		case 'gray':
			styles.outer = 'border-gray-500/30 from-gray-500/10 via-gray-400/5 to-gray-600/10'
			styles.inner = 'border-gray-500/20 from-gray-900/20 via-gray-800/10 to-gray-900/20'
			break
	}

	return styles
}
