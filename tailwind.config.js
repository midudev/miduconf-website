module.exports = {
	content: ['./src/**/*.{html,js,astro,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				'moving-background': 'moving-background 5s ease-in-out',
			},
			keyframes: {
				'moving-background': {
					'0%': {
						transform: 'translateY(0)',
						opacity: 0,
					},
					'66%': {
						opacity: 0.4,
					},
					'100%': {
						transform: 'translateY(-150px)',
						opacity: 0,
					},
				},
			},
			colors: {
				miduconf: {
					orange: {
						100: '#FFC837',
						200: '#FF8008',
					},
					purple: {
						100: '#8227FE',
						200: '#D676EA',
					},
					yellow: {
						100: '#fff601',
					},
				},
			},
		},
	},
	plugins: [],
};
