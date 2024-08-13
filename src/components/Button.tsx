import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type Props<C extends React.ElementType> = {
	as?: C
	children: React.ReactNode
	className?: string
	variant?: 'primary' | 'secondary'
	disabled?: boolean
} & ComponentPropsWithoutRef<C>

export const Button = <C extends React.ElementType = 'button'>({
	as,
	children,
	variant = 'primary',
	disabled,
	...restOfProps
}: Props<C>) => {
	const As = as ?? 'button'

	const variantStyle = {
		primary: 'bg-button text-white shadow-button hover:shadow-button-hover hover:scale-110 ',
		secondary:
			'border border-midu-primary/40 bg-[#121226] hover:bg-[#1A1A2E] hover:border-midu-primary/60'
	}

	return (
		<As
			{...restOfProps}
			disabled={disabled}
			className={cn(
				'flex items-center cursor-pointer gap-2 rounded-lg text-white px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
				variantStyle[variant],
				restOfProps.className,
				disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
			)}
		>
			{children}
		</As>
	)
}
