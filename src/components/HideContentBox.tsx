interface Props {
	title: string
	subtitle?: string
	BgIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export function HideContentBox({ title, subtitle, BgIcon }: Props) {
	return (
		<div>
			<div className='flex relative group flex-col cursor-crosshair gap-4 py-20 mx-auto shadow-[inset_0_4px_30px] shadow-midu-primary/25 overflow-hidden rounded-2xl bg-midu-primary/10 max-w-screen-base'>
				<div className='pointer-events-none absolute w-1/2 rotate-45 h-[300%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#41b3ff00] via-[#b0a9ff13] to-[#41b3ff00]'></div>
				<h2 className='text-6xl font-bold text-center text-white'>{title}</h2>
				{subtitle && (
					<p className='text-4xl font-semibold text-center max-w-[24ch] text-yellow-300 mx-auto px-4'>
						{subtitle}
					</p>
				)}
				{BgIcon && (
					<BgIcon className='absolute top-0 right-0 text-white transition duration-300 translate-x-1/4 translate-y-1/4 opacity-10 w-96 h-96 group-hover:-rotate-12 group-hover:scale-125 group-hover:opacity-20 -z-10' />
				)}
			</div>
		</div>
	)
}
