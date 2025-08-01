import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type Props<C extends React.ElementType> = {
	as?: C
	children: React.ReactNode
	className?: string
	containerClassName?: string
	disabled?: boolean
	variant?: 'default' | 'border' | 'ghost' | 'icon' | 'secondary'
	size?: 'default' | 'small'
} & ComponentPropsWithoutRef<C>

export const Button = <C extends React.ElementType = 'button'>({
	as,
	children,
	disabled,
	className,
	containerClassName,
	variant = 'default',
	size = 'default',
	...restOfProps
}: Props<C>) => {
	const As = as ?? 'button'

	return (
		<As
			{...restOfProps}
			disabled={disabled}
			className={cn(
				'inline-flex flex-col items-center gap-x-2 text-xl text-white uppercase disabled:cursor-not-allowed md:flex-row md:w-max relative group overflow-hidden disabled:opacity-60',
				variant !== 'border' && 'border border-transparent rounded-md',
				variant === 'secondary' && 'border-palette-border-foreground bg-palette-bg-foreground-primary',
				variant === 'border' && 'before:absolute before:z-10 before:top-0 before:left-0 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-palette-primary after:absolute after:z-10 after:top-0 after:right-0 after:w-3 after:h-3 after:border-t-2 after:border-r-2 after:border-palette-primary',
				variant === 'icon' && size === 'default' && 'w-10 h-10 flex-row justify-center',
				variant === 'icon' && size === 'small' && 'w-8 h-8 flex-row justify-center',
				containerClassName,
				variant === 'default' && 'bg-palette-primary',
				variant === 'ghost' && 'hover:bg-palette-ghost/20'
			)}
		>
			{variant === 'border' && (
				<>
					<div className="absolute z-10 bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-palette-primary" />
					<div className="absolute z-10 bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-palette-primary" />
				</>
			)}
			<div
				className={cn(
					'inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white uppercase rounded-md group-disabled:cursor-not-allowed md:flex-row md:w-max relative translate-y-0 group-hover:translate-y-full transition ease-[cubic-bezier(0.746,_-0.622,_0.362,_1.546)] duration-300 w-full h-full group-focus-visible:translate-y-full',
					variant === 'icon' && size === 'default' && 'py-2.5 px-2.5 flex-row justify-center',
					variant === 'icon' && size === 'small' && 'py-1.5 px-1.5 flex-row justify-center',
					className,
					variant === 'default' && 'bg-palette-primary',
					variant === 'secondary' && 'bg-palette-bg-foreground-primary hover:bg-palette-bg-foreground-secondary/20',
					variant === 'ghost' && 'hover:bg-palette-ghost/20'
				)}
			>
				{children}
			</div>
			<div
				aria-disabled
				className={cn(
					'inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white uppercase rounded-md group-disabled:cursor-not-allowed md:flex-row md:w-max absolute inset-0 -translate-y-full group-hover:translate-y-0 transition ease-[cubic-bezier(0.746,_-0.622,_0.362,_1.546)] duration-300 group-focus-visible:translate-y-0',
					variant === 'icon' && size === 'default' && 'py-2.5 px-2.5 flex-row justify-center',
					variant === 'icon' && size === 'small' && 'py-1.5 px-1.5 flex-row justify-center',
					className,
					variant === 'default' && 'bg-palette-primary',
					variant === 'secondary' && 'bg-palette-bg-foreground-primary'
				)}
			>
				{children}
			</div>
		</As>
	)
}
