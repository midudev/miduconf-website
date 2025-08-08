import { Button } from '@/components/Button'
import { LockIcon } from '../icons/structure-ticket/lock'
import { cn } from '@/lib/utils'
import { AnimationType } from '../animations'

interface Props {
	handleChangeAnimation: (option: AnimationType) => void
	selectedAnimation: AnimationType
}

const listOfAnimations = [
	{
		label: 'Default',
		value: 'default' as const,
		disabled: false
	},
	{
		label: 'Pirámide',
		value: 'pyramid' as const,
		disabled: false
	},
	{
		label: 'Orbital',
		value: 'friction' as const,
		disabled: false
	}
]

export const SelectAnimationPanel = ({ handleChangeAnimation, selectedAnimation }: Props) => {

	return (
		<article className='flex flex-col gap-4'>
			<h3 className='text-sm font-medium uppercase text-palette-ghost'>Animación</h3>
			<ul className='flex flex-wrap items-center gap-1 mb-3 rounded-md'>
				{listOfAnimations.map(({ label, value, disabled }) => {
					const isSelected = selectedAnimation === value

					return (
						<li key={value}>
							{disabled ? (
								<div className="relative">
									<Button
										title={`Animación ${label} bloqueada`}
										aria-label='Animación bloqueada'
										className='px-3 py-1 text-base duration-300 cursor-not-allowed'
										disabled={true}
										variant='ghost'
									>
										{label}
									</Button>
									<LockIcon className="absolute -top-1 -right-4 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5" />
								</div>
							) : (
								<Button
									title={`Aplicar animación ${label}`}
									aria-label={`Aplicar animación ${label}`}
									className={cn('px-3 py-1 text-base duration-300', isSelected && 'bg-palette-ghost/50 scale-[0.8]')}
									onClick={() => handleChangeAnimation(value)}
									variant={isSelected ? 'border' : 'ghost'}
								>
									<span className={cn('transition-transform duration-300', isSelected && 'scale-[1.2]')}>
										{label}
									</span>
								</Button>
							)}
						</li>
					)
				})}
			</ul>
		</article>
	)
}
