import { gsap } from 'gsap'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { DiamondIcon } from '@/components/icons/diamond'

export function ShareLink({ href, title }: { href: string; title: string }) {
	const linkRef = useRef<HTMLAnchorElement>(null)
	const iconRef = useRef<SVGSVGElement>(null)
	const spanRef = useRef<HTMLSpanElement>(null)

	const handleMouseEnter = () => {
		if (iconRef.current && spanRef.current) {
			gsap.killTweensOf([iconRef.current, spanRef.current])
			gsap.to(iconRef.current, { scale: 1, x: 0, opacity: 1,ease: 'elastic.out(1, 0.75)', rotate: -90, duration: 0.7 })
			gsap.to(spanRef.current, { x: 0, ease: 'elastic.out(1, 0.75)', duration: 0.7})
		}
	}

	const handleMouseLeave = () => {
		if (iconRef.current && spanRef.current) {
			gsap.killTweensOf([iconRef.current, spanRef.current])
			gsap.to(iconRef.current, { scale: 0, x: -16, opacity: 0, ease: 'power4.out', rotate: 0, duration: 0.5 })
			gsap.to(spanRef.current, { x: '-28px', ease: 'elastic.out(1, 0.75)', duration: 0.5})
		}
	}

	return (
		<li>
			<Link
				ref={linkRef}
				href={href}
				target='_blank'
				className={cn('text-palette-default text-xl-code relative flex items-center gap-3')}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<DiamondIcon ref={iconRef} className="text-palette-primary scale-0 opacity-0 -translate-x-spacing-16" />
				<span ref={spanRef} className='-translate-x-[28px]'>{title}</span>
			</Link>
		</li>
	)
}
