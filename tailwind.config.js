module.exports = {
	content: ['./src/**/*.{html,js,astro,jsx,ts,tsx}'],
	plugins: [require('tailwindcss-animated')],
	theme: {
		extend: {
			dropShadow: {
				'4xl': ['0px 0px 20px rgba(255, 221, 31, 0.75)', '0 0px 30px rgba(255, 221, 31, 0.95)']
			},
			animation: {
				meteor: 'meteor 5s linear infinite',
				'moving-background': 'moving-background 5s ease-in-out',
				spin: 'spin calc(var(--speed) * 2) infinite linear',
				slide: 'slide var(--speed) ease-in-out infinite alternate'
			},
			keyframes: {
				spin: {
					'0%': {
						rotate: '0deg'
					},
					'15%, 35%': {
						rotate: '90deg'
					},
					'65%, 85%': {
						rotate: '270deg'
					},
					'100%': {
						rotate: '360deg'
					}
				},
				slide: {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				},
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: 0 },
					'70%': { opacity: 1 },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: 0
					}
				},
				'moving-background': {
					'0%': {
						transform: 'translateY(0)',
						opacity: 0
					},
					'66%': {
						opacity: 0.4
					},
					'100%': {
						transform: 'translateY(-150px)',
						opacity: 0
					}
				}
			},
			colors: {
				miduconf: {
					orange: {
						100: '#FFC837',
						200: '#FF8008'
					},
					purple: {
						100: '#8227FE',
						200: '#D676EA'
					},
					yellow: {
						100: '#fff601'
					}
				}
			}
		}
	}
}
