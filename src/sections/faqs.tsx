import { ArrowIcon } from '@/components/icons/arrow'
import { DotIcon } from '@/components/icons/dot'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function FAQS() {
	return (
		<section id='faqs' className='px-4 pt-44 md:px-8'>
			<h2 className='flex items-center justify-center gap-4 mb-8 text-4xl font-bold text-white uppercase'>
				<DotIcon className='text-pallet-primary' /> FAQ'S{' '}
				<DotIcon className='text-pallet-primary' />
			</h2>
			<p className='mx-auto mb-16 text-xl text-white text-pretty max-w-[42ch] text-center'>
				Aquí resolvemos las dudas más comunes. Si tienes alguna otra pregunta, no dudes en
				escribirnos
			</p>
			<ul className='flex flex-col max-w-2xl gap-8 mx-auto'>
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
	return (
		<article className='text-white border rounded-md bg-pallet-b-foreground-primary border-pallet-border-foreground'>
			<header
				onClick={() => setOpen(!open)}
				className='flex items-center justify-between px-4 py-2 cursor-pointer select-none'
			>
				<h3>{title}</h3>
				<button
					className='px-2 rounded-md aspect-square bg-pallet-primary'
					title={open ? 'Cerrar' : 'Abrir'}
				>
					<ArrowIcon className={cn('w-4 h-auto transition', open && 'rotate-180')} />
				</button>
			</header>
			<p className={cn('px-4 py-6 opacity-80', open ? 'block' : 'hidden')}>{content}</p>
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
