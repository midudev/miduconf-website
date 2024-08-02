export const ScheduleIcon = ({ className = '', ...props }) => (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
		<g
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.5'
			clipPath='url(#a)'
			className={className}
			{...props}
		>
			<path d='M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7ZM16 3v4M8 3v4M4 11h16' />
			<path d='M8 15h2v2H8v-2Z' />
		</g>
		<defs>
			<clipPath id='a'>
				<path fill='currentColor' d='M0 0h24v24H0z' />
			</clipPath>
		</defs>
	</svg>
)
