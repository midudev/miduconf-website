import { inter } from '../pages'

export function LinearCard ({ className, children, title }) {
	return (
		<article className={`${className}`}>
			<h2 className={`text-white text-sm font-bold ${inter.className} uppercase`}>
				<span>{title}</span>
			</h2>
			<div className='h-full flex flex-col p-8 items-center justify-center overflow-hidden rounded-3xl relative bg-gradient-to-b border-2 border-white/10 from-white/0 to-white/[0.05] before:absolute before:pointer-events-none before:select-none before:inset-0 before:p-[1px] before:rounded-[inherit] before:bg-gradient-to-b before:from-blue-900/10 before:to-blue-950/10 before:-z-10'>
				{children}
			</div>
		</article>
	)
}
