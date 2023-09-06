import { cn } from '@/lib/utils'
import { Children, ReactNode, cloneElement } from 'react'

interface MarqueeProps {
	className?: string
	reverse?: boolean
	pauseOnHover?: boolean
	children?: ReactNode
	[key: string]: unknown
	size?: string
}

export const Marquee = ({
	className,
	reverse,
	pauseOnHover = false,
	size = 'small',
	children,
	...props
}: MarqueeProps) => {
	return (
		<div
			{...props}
			className={cn('flex w-full overflow-x-hidden [--duration:40s] [--gap:1rem]', className, {
				'flex-col xl:flex-row items-center xl:justify-normal xl:items-stretch': size === 'large'
			})}
		>
			<div
				className={cn('flex w-max animate-marquee items-stretch gap-[--gap]', {
					'[animation-direction:reverse]': reverse,
					'hover:[animation-play-state:paused]': pauseOnHover,
					'flex-col xl:flex-row   h-full': size === 'large'
				})}
			>
				{children}
				{size !== 'large' && Children.map(children, (child) => cloneElement(child as any))}
			</div>
		</div>
	)
}

export default Marquee
