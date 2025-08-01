import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CalltoActionType {
	href: string
	IconComponent: React.ComponentType<{ className?: string }>
	estilo: 'default' | 'discord'
	text: string
	className?: string
}

export const CallToAction = ({
	href,
	IconComponent,
	estilo,
	text,
	className
}: CalltoActionType) => {
	const style = {
		default: 'bg-palette-bg-foreground-secondary',
		discord: 'border border-palette-border-foreground bg-palette-bg-foreground-primary navbar-discord'
	}

	const ctaRef = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		const cta = ctaRef.current
		if (!cta) return

		const $ctaContent = cta.querySelector('.cta-content')
		const items = $ctaContent?.querySelectorAll('.cta-info')

		const animateItems = (y: number) => {
			items?.forEach((item) => {
				gsap.to(item.children, {
					y,
					duration: 0.7,
					stagger: 0.05,
					ease: 'elastic.out(1, 0.75)'
				})
			})
		}

		const handleEnter = () => animateItems(32)
		const handleLeave = () => animateItems(0)

		cta.addEventListener('mouseenter', handleEnter)
		cta.addEventListener('mouseleave', handleLeave)

		return () => {
			cta.removeEventListener('mouseenter', handleEnter)
			cta.removeEventListener('mouseleave', handleLeave)
		}
	})

	return (
		<Link
			href={href}
			ref={ctaRef}
			target='_blank'
			rel='noopener noreferrer'
			className={cn(
				'cta rounded-[5px] w-auto inline-block relative overflow-hidden text-palette-default',
				style[estilo],
				className
			)}
		>
			<div className='cta-content py-[10px] px-4 lg:py-[6px] lg:px-[12px]'>
				<div className='absolute flex items-center gap-2 -translate-y-8 cta-info'>
					<IconComponent className='size-5 lg:size-6' />
					<span className='text-xl-code !font-cta'>{text}</span>
				</div>
				<div className='flex items-center gap-2 cta-info'>
					<IconComponent className='size-5 lg:size-6' />
					<span className='text-xl-code !font-cta'>{text}</span>
				</div>
			</div>
		</Link>
	)
}
