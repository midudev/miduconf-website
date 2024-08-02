export function GiftIcon({ className = '', ...props }) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
			<g
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='1.5'
				clip-path='url(#a)'
				className={className}
				{...props}
			>
				<path d='M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9ZM12 8v13' />
				<path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 1 1 0-5c.965-.017 1.91.451 2.713 1.343C11.015 5.235 11.638 6.51 12 8c.362-1.49.985-2.765 1.787-3.657.803-.892 1.748-1.36 2.713-1.343a2.5 2.5 0 0 1 0 5' />
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='currentColor' d='M0 0h24v24H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}
