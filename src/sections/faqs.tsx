import { ArrowIcon } from '@/components/icons/arrow'
import { DotIcon } from '@/components/icons/dot'
import { cn } from '@/lib/utils'
import { Fahkwang } from 'next/font/google'
import { useState } from 'react'

export function FAQS() {
	return (
		<section id='faqs' className='pt-44'>
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
				className='flex items-center justify-between px-4 py-2'
			>
				<h3>{title}</h3>
				<button
					className='px-2 rounded-md aspect-square bg-pallet-primary'
					title={open ? 'Cerrar' : 'Abrir'}
				>
					<ArrowIcon className={cn('w-4 h-auto transition', open && 'rotate-180')} />
				</button>
			</header>
			<p className={cn('px-4 py-6', open ? 'block' : 'hidden')}>{content}</p>
		</article>
	)
}

const LIST_FAQS = [
	{
		title: '¿Es gratis el evento?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non enim eget enim sagittis elementum.'
	},
	{
		title: '¿Es gratis el evento?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non enim eget enim sagittis elementum.'
	},
	{
		title: '¿Es gratis el evento?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non enim eget enim sagittis elementum.'
	},
	{
		title: '¿Es gratis el evento?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non enim eget enim sagittis elementum.'
	},
	{
		title: '¿Es gratis el evento?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non enim eget enim sagittis elementum.'
	}
]
