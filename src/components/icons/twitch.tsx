export function TwitchIcon({ className = '', ...props }) {
	return (
		<svg
			width='2400'
			height='2800'
			viewBox='0 0 2400 2800'
			fill='none'
			className={className}
			{...props}
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_33_542)'>
				<path
					d='M500 0L0 500V2300H600V2800L1100 2300H1500L2400 1400V0H500ZM2200 1300L1800 1700H1400L1050 2050V1700H600V200H2200V1300Z'
					fill='currentColor'
				/>
				<path d='M1700 550H1900V1150H1700V550ZM1150 550H1350V1150H1150V550Z' fill='currentColor' />
			</g>
			<defs>
				<clipPath id='clip0_33_542'>
					<rect width='2400' height='2800' fill='currentColor' />
				</clipPath>
			</defs>
		</svg>
	)
}
