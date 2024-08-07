export function TicketIcon({ className = '', ...props }) {
	return (
		<svg
			width='32'
			height='32'
			viewBox='0 0 24 24'
			strokeWidth='1'
			stroke='currentColor'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
			{...props}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
			<path d='M15 5l0 2'></path>
			<path d='M15 11l0 2'></path>
			<path d='M15 17l0 2'></path>
			<path d='M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2'></path>
		</svg>
	)
}
