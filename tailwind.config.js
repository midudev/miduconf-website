module.exports = {
	content: ['./src/**/*.{html,js,astro,jsx,ts,tsx}'],
	plugins: [],
	theme: {
		extend: {
			dropShadow: {
				'4xl': ['0px 0px 20px rgba(255, 221, 31, 0.75)', '0 0px 30px rgba(255, 221, 31, 0.95)']
			},
			animation: {
				'moving-background': 'moving-background 5s ease-in-out'
			},
			keyframes: {
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
