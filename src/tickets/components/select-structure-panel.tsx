import { Button } from '@/components/Button'
import { CircleIcon } from '../icons/structure-ticket/circle'
import { PrismIcon } from '../icons/structure-ticket/prism'
import { BackgroundIcon } from '../icons/structure-ticket/background'
import { PiramideIcon } from '../icons/structure-ticket/piramide'
import { BoxIcon } from '../icons/structure-ticket/box'
import { HeartIcon } from '../icons/structure-ticket/heart'
import { LockIcon } from '../icons/structure-ticket/lock'
import { StructureOpcion } from '../types/structure-option'
import { TicketDesign } from '../types/ticket-design'
import { cn } from '@/lib/utils'

interface Props {
	handleChangeStructure: (option: StructureOpcion) => void
	ticketDesign: TicketDesign
	twitchTier?: '1' | '2' | '3' | null
	midudevTypeSub?: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
}

const listOfStructures = [
	{
		label: 'circular',
		value: 'circle' as const,
		icon: CircleIcon,
		disabled: false
	},
	{
		label: 'prisma',
		value: 'prism' as const,
		icon: PrismIcon,
		disabled: false
	},
	{
		label: 'background',
		value: 'background' as const,
		icon: BackgroundIcon,
		disabled: false
	},
	{
		label: 'pirámide',
		value: 'piramide' as const,
		icon: PiramideIcon,
		disabled: false
	},
	{
		label: 'caja',
		value: 'box' as const,
		icon: BoxIcon,
		disabled: true
	},
	{
		label: 'corazón',
		value: 'heart' as const,
		icon: HeartIcon,
		disabled: true
	}
]

export const SelectStructurePanel = ({ ticketDesign, handleChangeStructure, twitchTier, midudevTypeSub }: Props) => {
	// Helper function to check if user has unlocking tier
	const hasUnlockingTier = () => {
		// Twitch tier 1 or higher unlocks
		if (twitchTier && Number(twitchTier) >= 1) return true
		// Academia mensual or higher unlocks
		if (midudevTypeSub) return true
		return false
	}
	return (
		<article className='flex flex-col gap-4'>
			<h3 className='text-sm font-medium uppercase text-palette-ghost'>Estructura</h3>
			<ul className='grid grid-cols-3 grid-rows-2 gap-1 p-3 rounded-md bg-palette-ghost/10 lg:flex lg:flex-wrap lg:items-center lg:gap-x-1'>
				{listOfStructures.map(({ label, value, icon: Icon, disabled }) => {
					// Override disabled state based on tier
					const isDisabled = disabled && !hasUnlockingTier()
					return (
					<li key={value}>
						{isDisabled ? (
							<div className="relative">
								<Button
									title={`Estructura ${label} bloqueada`}
									aria-label='Estructura bloqueada'
									className='px-3 text-sm duration-300 aspect-square cursor-not-allowed'
									disabled={true}
									variant='ghost'
								>
									<Icon className='size-6' />
								</Button>
								<LockIcon className="absolute top-0 -right-1 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5" />
							</div>
						) : (
							<Button
								title={`Aplicar estructura ${label}`}
								aria-label={`Aplicar estructura ${label}`}
								className={cn('px-3 text-sm aspect-square', ticketDesign.structure === value && 'bg-palette-ghost/50 scale-[0.8]')}
								onClick={() => handleChangeStructure(value)}
								variant={ticketDesign.structure === value ? 'border' : 'ghost'}
							>
								<Icon className={cn('size-6 transition-transform duration-300', ticketDesign.structure === value && 'scale-[1.2]')} />
							</Button>
						)}
					</li>
					)
				})}
			</ul>
		</article>
	)
}
