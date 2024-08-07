import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type Props<C extends React.ElementType> = {
	as?: C
	children: React.ReactNode
	className?: string
} & ComponentPropsWithoutRef<C>

export const Button = <C extends React.ElementType = 'button'>({
	as,
	children,
	...restOfProps
}: Props<C>) => {
	const As = as ?? 'button'

	return (
		<As
			{...restOfProps}
			className={cn(
				'flex items-center gap-2 rounded-lg text-white px-3 py-[10px] bg-button shadow-button hover:shadow-button-hover hover:scale-110 transition-all duration-300',
				restOfProps.className
			)}
		>
			{children}
		</As>
	)
}
