import { cn } from '@/lib/utils'

interface TitleProps {
	className?: string
	children: React.ReactNode
}

export function Title({ className = '', children }: TitleProps) {
	return (
		<h2
			className={cn(
				'flex uppercase text-3xl-semibold items-center gap-spacing-16 justify-center',
				className
			)}
		>
			{children}
		</h2>
	)
}
