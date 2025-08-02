import { Button } from '@/components/Button'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { Tooltip } from '@/components/Tooltip'
import { LockIcon } from '@/tickets/icons/structure-ticket/lock'
import { getTwitchAuthorizeUrl } from '@/twitch/utils/get-twitch-authorize-url'
import { TwitchIcon } from '@/components/icons/twitch'
import { useUpdateTicketInDB } from '../hooks/use-update-ticket-in-db'
import { useUpdateTicketImageInDB } from '../hooks/use-update-ticket-image-in-db'
import { createTicketImage } from '../utils/create-ticket-image'
import { StickerOption } from '../types/sticker-option'

interface Props {
	handleChangeHologram: (option: HologramOption) => void
	ticketOGImageElement: HTMLElement | null
	ticketDesign: TicketDesign
	twitchTier: '1' | '2' | '3' | null
	midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
	username: string
	ticketNumber: number
	midudevTokentId: string
	handleChangeSticker: (sticker: StickerOption) => void
}

export const SelectHologramPanel = ({
	ticketDesign,
	twitchTier,
	username,
	ticketOGImageElement,
	ticketNumber,
	midudevTokentId,
	midudevTypeSub,
	handleChangeHologram,
	handleChangeSticker
}: Props) => {
	const { handleUpdateTicket } = useUpdateTicketInDB()
	const { handleUpdateImageTicket } = useUpdateTicketImageInDB()

	const handleChangeHologramAndSave = async (hologram: HologramOption) => {
		handleChangeHologram(hologram)

		await handleUpdateTicket({
			ticketInfo: {
				hologram
			},
			username
		})

		if (ticketOGImageElement == null) return

		const { fileImage, filename } = await createTicketImage({
			ticketDOMContnet: ticketOGImageElement,
			ticketNumber
		})

		await handleUpdateImageTicket({
			file: fileImage,
			filename
		})
	}

	return (
		<article className='pt-6'>
			<h3 className='ml-1 text-xs uppercase text-palette-ghost'>Holográficos</h3>
			<div className='mt-2 rounded-md bg-palette-ghost/10'>
				<span className='text-[10px] uppercase text-palette-ghost px-4 py-2 block'>Por defecto</span>
				<ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
					<li>
						<Button
							title={`Aplicar Holograma Standard`}
							aria-label='Aplicar estructura circular'
							className='px-1 py-1 text-sm duration-300 aspect-square'
							onClick={async () => await handleChangeHologramAndSave(STANDARD_HOLOGRAM)}
							variant={ticketDesign.hologram === STANDARD_HOLOGRAM ? 'border' : 'ghost'}
						>
							<div className='relative w-6 h-6 overflow-hidden border rounded-full border-palette-ghost after:h-px after:w-full after:-rotate-45 after:bg-palette-ghost after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'></div>
						</Button>
					</li>
				</ul>
			</div>
			<div className='relative mt-2 rounded-md bg-palette-ghost/10'>
				<span className='text-[10px] uppercase text-palette-ghost block px-4 py-2'>
					Especiales de Twitch
				</span>
				<ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
					{TWITCH_HOLOGRAMS.map((label, index) => (
						<li key={label}>
							{index + 1 > Number(twitchTier ?? 0) ? (
								<LockTwitchButton currentTier={twitchTier} tierNumber={index + 1} />
							) : (
								<Button
									title={`Aplicar ${label} Holograma`}
									aria-label='Aplicar estructura circular'
									className='px-1 py-1 text-sm duration-300 aspect-square'
									onClick={async () => await handleChangeHologramAndSave(label)}
									variant={ticketDesign.hologram === label ? 'border' : 'ghost'}
								>
									<img
										src={`/tickets/holograms/${index + 1}.png`}
										alt={`Representación del ${label} Holograma`}
										className='w-6 h-6 rounded-full'
										width='30'
										height='30'
									/>
								</Button>
							)}
						</li>
					))}
				</ul>
				{twitchTier !== '3' && (
					<a
						href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
						target='_blank'
						className='relative flex items-center text-[10px] uppercase w-full justify-center px-4 py-1 bg-palette-ghost/20 gap-2 hover:bg-palette-ghost/40 transition rounded-b-md'
					>
						<TwitchIcon className='w-auto h-3' />
						Desbloquear
					</a>
				)}
			</div>
			<div className='mt-2 rounded-md bg-palette-ghost/10'>
				<span className='ml-0.5 text-[10px] uppercase text-palette-ghost px-4 py-2 block'>
					Especiales de midu.dev
				</span>
				<ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
					{ACADEMIA_HOLOGRAMS.map((label, index) => {
						const indexOfAcademyValue = getAcademyTierIndex(midudevTypeSub)
						console.log({ indexOfAcademyValue, index: index + 1 })
						return (
							<li key={label}>
								{index + 1 > indexOfAcademyValue ? (
									<LockAcademiaButton hologramIndex={TWITCH_HOLOGRAMS.length + index + 1} />
								) : (
									<Button
										title={`Aplicar ${label} Holograma`}
										aria-label='Aplicar estructura circular'
										className='px-1 py-1 text-sm duration-300 aspect-square'
										onClick={async () => await handleChangeHologramAndSave(label)}
										variant={ticketDesign.hologram === label ? 'border' : 'ghost'}
									>
										<img
											src={`/tickets/holograms/${TWITCH_HOLOGRAMS.length + index + 1}.png`}
											alt={`Representación del ${label} Holograma`}
											className='w-6 h-6 rounded-full'
											width='30'
											height='30'
										/>
									</Button>
								)}
							</li>
						)
					})}
				</ul>
				<a
					href={`http://localhost:4321/miduconf/ticket/${midudevTokentId}`}
					className='relative flex items-center text-[10px] uppercase w-full justify-center px-4 py-1 bg-palette-ghost/20 gap-2 rounded-b-md transition hover:bg-palette-ghost/40'
				>
					Desbloquear
				</a>
			</div>
		</article>
	)
}

function LockAcademiaButton({ hologramIndex }: { hologramIndex: number }) {
	return (
		<Tooltip text={`Suscripción en midu.dev`} tooltipPosition='top'>
			<div className='relative flex items-center gap-1 cursor-not-allowed'>
				<div className='relative p-1 text-xs rounded-md aspect-square'>
					<img
						src={`/tickets/holograms/${hologramIndex}.png`}
						alt={`Representación del Holograma`}
						className='w-6 h-6 rounded-full'
						width='30'
						height='30'
					/>
					<LockIcon className='absolute -top-2 -right-2 size-7.5 text-palette-ghost bg-palette-dark rounded-full p-0.5' />
				</div>
			</div>
		</Tooltip>
	)
}

function LockTwitchButton({
	tierNumber
}: {
	tierNumber: number
	currentTier: '1' | '2' | '3' | null
}) {
	return (
		<Tooltip text={`Desbloquear con Tier ${tierNumber} de Twitch`} tooltipPosition='top'>
			<div className='relative flex items-center gap-1 cursor-not-allowed'>
				<div className='relative p-1 text-xs rounded-md aspect-square'>
					<img
						src={`/tickets/holograms/${tierNumber}.png`}
						alt={`Representación del Holograma`}
						className='w-6 h-6 rounded-full'
						width='30'
						height='30'
					/>
					<LockIcon className='absolute -top-2 -right-2 size-7.5 text-palette-ghost bg-palette-dark rounded-full p-0.5' />
				</div>
			</div>
		</Tooltip>
	)
}

const STANDARD_HOLOGRAM = PERSONALIZE_TIKET_OPTIONS.HOLOGRAM.STANDARD
const TWITCH_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
	label.startsWith('twitch')
)
const ACADEMIA_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
	label.startsWith('academia')
)

const getAcademyTierIndex = (midudevTypeSub: Props['midudevTypeSub']) => {
	if (midudevTypeSub === 'monthly') return 1
	if (midudevTypeSub === 'quarterly') return 2
	if (midudevTypeSub === 'annual') return 3
	if (midudevTypeSub === 'lifetime') return 4
	return 0
}
