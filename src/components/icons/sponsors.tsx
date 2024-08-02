export function SponsorsIcon({ className = '', ...props }) {
	return (
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
				<path d='M9.5 3h5A1.5 1.5 0 0 1 16 4.5 3.5 3.5 0 0 1 12.5 8h-1A3.5 3.5 0 0 1 8 4.5 1.5 1.5 0 0 1 9.5 3Z' />
				<path d='M4 17v-1a8 8 0 0 1 16 0v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z' />
				<path d='M14.82 12.833c-.12-.235-.338-.44-.626-.589A2.346 2.346 0 0 0 13.2 12h-2.4c-.477 0-.935.132-1.273.366-.337.235-.527.553-.527.884 0 .332.19.65.527.884.338.234.796.366 1.273.366h2.4c.477 0 .935.132 1.273.366.337.235.527.553.527.884 0 .331-.19.65-.527.884-.338.234-.796.366-1.273.366h-2.4a2.346 2.346 0 0 1-.994-.244c-.288-.149-.507-.354-.626-.59M12 10v1.5m0 6V19' />
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='currentColor' d='M0 0h24v24H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}
