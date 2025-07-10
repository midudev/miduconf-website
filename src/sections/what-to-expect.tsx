import { DotIcon } from '@/components/icons/dot'
import Marquee from 'react-fast-marquee'

export function WhatToExpect() {
	return (
		<section id='lo-que-puedes-esperar' className='pt-32'>
			<h2 className='flex items-center justify-center gap-4 mb-16 text-4xl font-bold text-white uppercase'>
				<DotIcon className='text-pallet-primary' /> Qué esperar{' '}
				<DotIcon className='text-pallet-primary' />
			</h2>
			<Marquee className='mb-6' autoFill gradient gradientColor='#09090E'>
				{getRandomOrderList(LIST_OF_ITEMS).map((item) => {
					return (
						<div
							className='px-4 py-2 mx-4 text-2xl text-white uppercase transition rounded-md hover:bg-pallet-primary cursor-crosshair'
							key={item}
						>
							{item}
						</div>
					)
				})}
			</Marquee>
			<Marquee className='mb-6' direction='right' autoFill gradient gradientColor='#09090E'>
				{getRandomOrderList(LIST_OF_ITEMS).map((item) => {
					return (
						<div
							className='px-4 py-2 mx-4 text-2xl text-white uppercase transition rounded-md hover:bg-pallet-primary cursor-crosshair'
							key={item}
						>
							{item}
						</div>
					)
				})}
			</Marquee>
			<Marquee autoFill gradient gradientColor='#09090E'>
				{getRandomOrderList(LIST_OF_ITEMS).map((item) => {
					return (
						<div
							className='px-4 py-2 mx-4 text-2xl text-white uppercase transition rounded-md hover:bg-pallet-primary cursor-crosshair'
							key={item}
						>
							{item}
						</div>
					)
				})}
			</Marquee>
		</section>
	)
}

const LIST_OF_ITEMS = [
	'IA',
	'UI/UX',
	'Live Coding',
	'Charlas',
	'Workshops',
	'Animaciones',
	'Novedades',
	'Sorteos'
]

const getRandomOrderList = (list) => {
	return [...list].sort(() => Math.random() - 0.5)
}
