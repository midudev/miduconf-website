const background =
	'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)'

export function Card() {
	return (
		<div className='relative flex flex-col gap-4 border border-b-0 rounded-3xl border-slate-6'>
			<div
				aria-hidden='true'
				className='top-0 left-1/2 w-[150px] user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2'
				style={{ background }}
			/>
			<div
				aria-hidden='true'
				className='user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]'
				style={{ background: 'linear-gradient(180deg, #00000000 0%, #000 50%, #000 100%)' }}
			/>
		</div>
	)
}
