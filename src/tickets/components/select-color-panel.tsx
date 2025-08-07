import { Button } from '@/components/Button'
import { ColorOption } from '../types/color-option'
import { TicketDesign } from '../types/ticket-design'
import { LockIcon } from '../icons/structure-ticket/lock'
import { cn } from '@/lib/utils'

interface Props {
	handleChangeColor: (option: ColorOption) => void
	ticketDesign: TicketDesign
	twitchTier?: '1' | '2' | '3' | null
	midudevTypeSub?: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
}

export const SelectColorPanel = ({ ticketDesign, handleChangeColor, twitchTier, midudevTypeSub }: Props) => {
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
			<h3 className='text-sm font-medium uppercase text-palette-ghost'>Colores</h3>
			<ul className='flex flex-wrap items-center gap-1 p-3 rounded-md bg-palette-ghost/10'>
				{listOfCOlors.map(({ label, value, color, disabled }) => {
					// Override disabled state based on tier
					const isDisabled = disabled && !hasUnlockingTier()
					return (
					<li key={value}>
						{isDisabled ? (
							<div className="relative">
								<Button
									title={`Color ${label} bloqueado`}
									aria-label='Color bloqueado'
									className='px-3 text-sm duration-300 aspect-square cursor-not-allowed'
									disabled={true}
									variant='ghost'
								>
									<div
										style={{
											backgroundColor: color,
											boxShadow: `0 0 6px 1px ${color}, inset 0 0 8px ${color}`,
										}}
										className='size-6 rounded-full'
									/>
								</Button>
								<LockIcon className="absolute top-0 -right-1 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5" />
							</div>
						) : (
							<Button
								title={`Aplicar color ${label}`}
								aria-label='Aplicar estructura circular'
								className={cn('px-3 text-sm aspect-square', ticketDesign.color === value && 'bg-palette-ghost/50 scale-[0.8]')}
								onClick={() => handleChangeColor(value)}
								variant={ticketDesign.color === value ? 'border' : 'ghost'}
							>
								<div
									style={{
										backgroundColor: color
									}}
									className={cn('size-6 rounded-full', ticketDesign.color === value && 'border-2 border-palette-default scale-[1.2]')}
								/>
							</Button>
						)}
					</li>
					)
				})}
			</ul>
		</article>
	)
}

const listOfCOlors = [
	{
		label: 'neutro',
		value: 'neutral',
		color: '#6B7280',
		disabled: false
	},
	{
		label: 'azul',
		value: 'blue',
		color: '#5A8CF6',
		disabled: false
	},
	{
		label: 'naranja',
		value: 'orange',
		color: '#FC9211',
		disabled: false
	},
	{
		label: 'rojo',
		value: 'red',
		color: '#FA444A',
		disabled: false
	},
	{
		label: 'verde',
		value: 'green',
		color: '#00FC65',
		disabled: false
	},
	{
		label: 'rosa',
		value: 'pink',
		color: '#A26E93',
		disabled: true
	},
	{
		label: 'amarillo',
		value: 'yellow',
		color: '#DFDFC2',
		disabled: true
	}
] as const
