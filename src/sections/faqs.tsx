import { ArrowIcon } from '@/components/icons/arrow'
import { Title } from '@/components/Title'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export function FAQS() {
	return (
		<section id='faqs' className='px-5 mt-spacing-180 md:px-8'>
			<Title>FAQ'S</Title>
			<p className='mx-auto mb-spacing-64 mt-spacing-32 text-xl-medium text-pretty max-w-[42ch] text-center text-palette-ghost'>
				Aquí resolvemos las <span className='word-highlight'>dudas más comunes</span>. Si tienes alguna otra <span className='word-highlight'>pregunta, no dudes en
				escribirnos</span>
			</p>
			<ul className='flex flex-col max-w-3xl gap-8 mx-auto'>
				{LIST_FAQS.map(({ content, title }, i) => {
					return (
						<li key={title}>
							<FAQItem title={title} content={content} isOpen={i === 0} />
						</li>
					)
				})}
			</ul>
		</section>
	)
}

interface Props {
	isOpen?: boolean
	title: string
	content: string
}

function FAQItem({ isOpen, title, content }: Props) {
	const [open, setOpen] = useState(isOpen ?? false)
	const contentRef = useRef<HTMLElement>(null)
	const faqItem = useRef<HTMLElement>(null)

	function animateButton(scale: number, ease: string, duration: number) {
		if (!faqItem.current) return
		const button = faqItem.current.querySelector('.faq-item-button')
		if (!button) return

		gsap.to(button, {
			scale,
			duration,
			ease,
			overwrite: 'auto'
		})
	}

	useEffect(() => {
		const header = faqItem.current?.querySelector('.faq-item-header')
		if (!header) return

		header.addEventListener('mouseenter', () => {
			animateButton(1.1, 'elastic.out(1, 0.5)', 0.7)
		})

		header.addEventListener('mouseleave', () => {
			animateButton(1.0, 'elastic.out(1, 0.5)', 0.7)
		})

		header.addEventListener('mousedown', () => {
			animateButton(0.90, 'back.out(2)', 0.3)
		})

		header.addEventListener('mouseup', () => {
			animateButton(1.0, 'elastic.out(1, 0.5)', 0.7)
		})
	}, [])

	useEffect(() => {
		const content = faqItem.current?.querySelector('.faq-item-content')
		if (!content) return

		const scrollHeight = content.scrollHeight

		gsap.to(content, {
			maxHeight: open ? scrollHeight : 0,
			autoAlpha: open ? 1 : 0,
			duration: 0.3,
			ease: 'power4.out',
		})
	}, [open])
	return (
		<article
			ref={faqItem}
			className="faq-item border rounded-md bg-palette-bg-foreground-primary border-palette-border-foreground"
		>
			<header
				onClick={() => setOpen(!open)}
				className="faq-item-header flex items-center justify-between p-spacing-16 lg:p-spacing-24 cursor-pointer select-none"
			>
				<h3 className="text-2xl-semibold !normal-case">{title}</h3>
				<button
					className="faq-item-button px-2 rounded-md aspect-square bg-palette-primary"
					title={open ? 'Cerrar' : 'Abrir'}
				>
					<ArrowIcon
						className={cn('w-4 h-auto transition', open && 'rotate-180')}
					/>
				</button>
			</header>
			<footer
				ref={contentRef}
				className="faq-item-content max-h-0 invisible opacity-0 overflow-hidden"
			>
				<p className="p-spacing-16 lg:p-spacing-24 text-body">
					{content}
				</p>
			</footer>
		</article>
	)
}

const LIST_FAQS = [
	{
		title: '¿Qué es la miduConf?',
		content:
			'La miduConf es una conferencia online y gratuita sobre programación, donde podrás conocer las últimas novedades del desarrollo web y mucho más.'
	},
	{
		title: '¿Es gratis el evento?',
		content: 'Sí, el evento es completamente gratuito.'
	},
	{
		title: '¿Cuándo se celebra la miduConf?',
		content: 'Se celebra el 10 de septiembre de 2025.'
	},
	{
		title: '¿Dónde se puede ver la miduConf?',
		content: 'Podrás verla online a través del canal de Twitch de midudev.'
	},
	{
		title: '¿Hay que registrarse?',
		content: 'No es necesario registrarse para ver el evento.'
	}
]
