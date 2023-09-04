const GIFTS = [
	{
		name: 'Libros físico de Javier Santaolalla',
		img: 'javier'
	},
	{
		name: 'Libros digitales Aprendiendo Git',
		img: 'libro-git'
	},
	{
		name: 'Suscripciones para Codely',
		img: 'codely'
	},
	{
		name: 'Suscripciones a Amautas',
		img: 'amautas'
	},
	{
		name: 'Dominios y hosting de DonDominio',
		img: 'dondominio'
	}
]

export const Gifts = () => {
	return (
		<section className='flex flex-col flex-wrap items-center justify-center my-48'>
			<h2 className='text-6xl font-bold text-center text-white'>Regalos</h2>
			<p className='max-w-xl text-xl text-sky-200 text-center [†ext-wrap:balance] mt-4'>
				256 regalos para todo el mundo.
				<br />
				¡Necesitas tener{' '}
				<a href='#' className='text-yellow-200 underline'>
					el ticket gratuito para participar
				</a>
				!
			</p>
			<div className='bg-[#000214] group-hover:bg-[#000214]/10 w-full px-6 py-10 rounded transition grid grid-cols-3 gap-8'>
				{GIFTS.map((gift, index) => (
					<div
						key={index}
						className='flex flex-col items-center justify-center transition cursor-crosshair hover:scale-110'
					>
						<img
							className='object-cover w-full h-auto transition group-hover:scale-110'
							src={`/img/gifts/${gift.img}.png`}
							alt={`gift: ${gift.name}`}
						/>
						<h2 className='flex-auto text-2xl font-medium text-yellow-200 [text-wrap:balance] text-center '>
							{gift.name}
						</h2>
					</div>
				))}
			</div>
			<h2 className='my-10 text-3xl font-semibold text-center text-white'>Pronto más...</h2>
		</section>
	)
}
