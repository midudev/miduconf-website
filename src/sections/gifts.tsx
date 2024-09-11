import { HideContentBox } from '@/components/HideContentBox'
import { NavbarIcons } from '@/components/icons/navbar'
import { cn } from '@/lib/utils'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const GIFTS = [
	{
		img: null,
		special: 'super',
		count: 1,
		name: 'Ordenador Mac Mini',
		detail: 'Si no se puede enviar, se buscará una alternativa'
	},
	{
		special: 'super',
		count: 1,
		name: 'Master Frontend de Lemoncode',
		detail: 'Duración de 6 meses, estimado en 2500€'
	},
	{
		special: 'super',
		count: 1,
		name: 'Bootcamp de JavaScript',
		detail: '100% online. Estimado en 890€'
	},
	{
		special: 'super',
		count: 1,
		name: 'Consola Nintendo Switch',
		detail: 'Si no se puede enviar, se buscará una alternativa'
	},
	{
		special: 'super',
		count: 2,
		name: 'Suscripciones 1 año en CodelyTV'
	},
	{
		special: 'high',
		count: 10,
		name: 'Peluches This is Fine'
	},
	{
		special: 'high',
		count: 3,
		name: 'Códigos de 1 año de ElsaSpeak'
	},
	{
		special: 'high',
		count: 3,
		name: 'Teclados mecánico Keychrone',
		details: 'Máximo de 95$ por teclado'
	},
	{
		special: 'high',
		count: 5,
		name: 'Libros físicos "Programador pragmático"'
	},
	{
		count: 5,
		name: 'Suscripciones 6 meses en CodelyTV'
	},
	{
		count: 5,
		name: 'Dominios + hosting profesional + SSL durante 1 año'
	},
	{
		count: 10,
		name: 'Suscripciones 1 mes de CodelyTV'
	},
	{
		count: 10,
		name: 'Suscripciones 3 meses en DevTalles'
	},
	{
		count: 25,
		name: 'Suscripciones 1 mes en DevTalles'
	},
	{
		count: 25,
		name: 'Libros "Descubre Svelte"'
	},
	{
		count: 50,
		name: 'Libros "Preguntas de entrevista de React"'
	},
	{
		count: 100,
		name: 'Libros "Aprendiendo Git"'
	}
]

export const Gifts = () => {
	return (
		<section id='regalos' className='px-4 pt-24'>
			{/* <HideContentBox
				title='Regalos'
				subtitle='¡Muy pronto revelaremos todos los regalos!'
				BgIcon={NavbarIcons.GiftIcon}
			/> */}
			<GiftsSection />
		</section>
	)
}

const GiftsSection = () => {
	const supabase = useSupabaseClient()

	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo:
					process.env.NODE_ENV !== 'production'
						? 'http://localhost:3000/api/auth/callback'
						: 'https://miduconf.com/api/auth/callback'
			}
		})
	}

	return (
		<section
			id='regalos'
			className='pt-24 bg-button shadow-button rounded-[40px] max-w-screen-xl mx-auto px-4'
		>
			<h2 className='text-4xl font-bold text-center text-white sm:text-6xl'>
				Regalos para la <span className='text-midu-primary'>comunidad</span>
			</h2>
			<p className='mt-4 text-lg text-center text-white/80'>+256 regalos para todo el mundo.</p>
			<button
				onClick={handleLogin}
				className='block mx-auto text-lg text-center text-white underline'
			>
				¡Solo necesitas tener un ticket para participar!
			</button>

			<div className='relative grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-7 my-11 max-w-screen-base'>
				{LIST_OF_GIFTS.map((gift, index) => (
					<GiftItem key={`${gift.title}-${index}`} {...gift} />
				))}
			</div>
			<div className='relative'>
				<div
					className='relative grid grid-cols-1 mx-auto opacity-40 sm:grid-cols-2 lg:grid-cols-3 gap-7 my-11 max-w-screen-base'
					style={{
						maskImage: 'linear-gradient(to top, transparent, black)'
					}}
				>
					<GiftItem imgSmallUrl='' imgUrl='' title='Próximamente' isDisabled />
					<GiftItem
						imgSmallUrl=''
						imgUrl=''
						title='Próximamente'
						isDisabled
						className='hidden sm:flex'
					/>
					<GiftItem
						imgSmallUrl=''
						imgUrl=''
						title='Próximamente'
						isDisabled
						className='hidden lg:flex'
					/>
				</div>
				<p className='absolute bottom-0 left-1/2 -translate-x-1/2 z-[100] text-4xl font-semibold text-center max-w-[24ch] text-wrap text-yellow-300 mx-auto px-4 h-32'>
					¡Muy pronto revelaremos todos los regalos!
				</p>
			</div>

			<small className='text-center w-auto mx-auto block text-white text-sm max-w-xl opacity-80 [text-wrap:balance] py-8'>
				Si ganas un sorteo y no se puede enviar a tu país el regalo, buscaremos una alternativa del
				mismo valor monetario.
			</small>
		</section>
	)
}

const LIST_OF_GIFTS = [
	{
		imgUrl: '/regalo-libro-git.png',
		imgSmallUrl: '/regalo-libro-git.png',
		title: `10 libros físicos de Aprendiendo Git`
	},
	{
		imgUrl: '/gifts/mac-mini.webp',
		imgSmallUrl: '/gifts/mac-mini-small.webp',
		title: (
			<>
				Sorteo de una <br /> Mac mini
			</>
		),
		className: 'row-span-2',
		level: 2 as const
	},
	{
		imgUrl: '/gifts/this-is-fine-small.webp',
		imgSmallUrl: '/gifts/this-is-fine.webp',
		title: (
			<>
				2 peluches de <br /> This is Fine
			</>
		)
	},
	{
		imgUrl: '/gifts/codigo-sostenible.webp',
		imgSmallUrl: '/gifts/codigo-sostenible-small.webp',
		title: '5 libros físicos de Código Sostenible'
	},
	{
		imgUrl: '/gifts/el-programador-pragmatico.webp',
		imgSmallUrl: '/gifts/el-programador-pragmatico.webp',
		title: (
			<>
				5 Libros del Programador Pragmático{' '}
				<span className='inline-flex items-center gap-1 text-lg '>
					(
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='inline w-3 h-3'
						width='1200'
						height='1227'
						fill='none'
						viewBox='0 0 1200 1227'
					>
						<path
							fill='#fff'
							d='M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z'
						/>
					</svg>
					)
				</span>
			</>
		)
	},
	{
		imgUrl: '/gifts/cupon-github.webp',
		imgSmallUrl: '/gifts/cupon-github-small.webp',
		title: (
			<>
				4 cupones de <br /> GitHub
			</>
		)
	},
	{
		imgUrl: '/gifts/keychron.webp',
		imgSmallUrl: '/gifts/keychron-small.webp',
		title: (
			<>
				2 teclados <br /> Keychron
			</>
		)
	},
	{
		imgUrl: '/gifts/codely.webp',
		imgSmallUrl: '/gifts/codely-small.webp',
		title: (
			<>
				17 suscripciones <br /> de Codely
			</>
		)
	},
	{
		imgUrl: '/gifts/scrimba.webp',
		imgSmallUrl: '/gifts/scrimba-small.webp',
		title: (
			<>
				Suscripciones <br /> de Scrimba
			</>
		)
	},
	{
		imgUrl: '/gifts/platzi-planes.webp',
		imgSmallUrl: '/gifts/platzi-planes-small.webp',
		title: (
			<>
				5 suscripciones <br /> de Platzi
			</>
		)
	},
	{
		imgUrl: '/gifts/lemon-code-frontend.webp',
		imgSmallUrl: '/gifts/lemon-code-small.webp',
		title: (
			<>
				Master FrontEnd <br /> LemonCode (2500€)
			</>
		)
	},
	{
		imgUrl: '/gifts/supermaven.webp',
		imgSmallUrl: '/gifts/supermaven-small.webp',
		title: (
			<>
				Suscripciones <br /> de Supermaven
			</>
		)
	},
	{
		imgUrl: '/gifts/lemon-code-devops.webp',
		imgSmallUrl: '/gifts/lemon-code-small.webp',
		title: (
			<>
				Bootcamp DevOps <br /> LemonCode (2200€)
			</>
		)
	},
	{
		imgUrl: '/gifts/keep-coding-module.webp',
		imgSmallUrl: '/gifts/keep-coding-mini.webp',
		title: (
			<>
				1 módulo en directo <br /> bootcamp de libre elección
			</>
		)
	},
	{
		imgUrl: '/gifts/keep-coding-clock.webp',
		imgSmallUrl: '/gifts/keep-coding-mini.webp',
		title: (
			<>
				1h de tutoría con profesor <br /> de bootcamp a elección
			</>
		)
	},
	{
		imgUrl: '/gifts/keep-coding-job.webp',
		imgSmallUrl: '/gifts/keep-coding-mini.webp',
		title: <>Sesiones de Bolsa de Talento</>
	},
	{
		imgUrl: '/gifts/fazt.webp',
		imgSmallUrl: '/gifts/fazt-mini.webp',
		title: (
			<>
				2 asesorías privadas <br /> con Fazt
			</>
		)
	},
	{
		imgUrl: '/gifts/Hack4U.webp',
		imgSmallUrl: '/gifts/Hack4U-mini.webp',
		title: (
			<>
				3 suscripciones de <br /> 3 meses a Hack4U
			</>
		)
	},
	{
		title: 'Próximamente',
		className: 'hidden sm:block',
		imgUrl: '',
		imgSmallUrl: '',
		isDisabled: true
	},
	{
		title: 'Próximamente',
		className: 'hidden lg:block',
		imgUrl: '',
		imgSmallUrl: '',
		isDisabled: true
	}
]

interface GiftItemProps {
	imgUrl: string
	imgSmallUrl: string
	title: React.ReactNode
	className?: string
	level?: 1 | 2 | 3
	isDisabled?: boolean
}

function GiftItem({
	imgUrl,
	title,
	imgSmallUrl,
	className,
	level = 1,
	isDisabled = false
}: GiftItemProps) {
	return (
		<div
			className={cn(
				'relative flex items-center justify-center py-5 transition-all duration-500 border bg-button rounded-2xl group px-7 before:w-full before:h-full before:rounded-2xl before:backdrop-blur-md before:z-10 before:absolute before:inset-0  cursor-crosshair group',
				className,
				level === 1 && 'bg-midu-primary/30 border-midu-primary',
				level === 2 && 'bg-[#5C9AFF]/30 border-[#5C9AFF]',
				level === 3 && 'bg-[#93C5FD]/30 border-[#93C5FD]'
			)}
		>
			<p
				className={cn(
					'absolute z-20 w-full text-lg font-bold text-center text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-[20ch]',
					'transition-all duration-500 z-[60]',
					!isDisabled && 'group-hover:translate-y-1/2',
					isDisabled && 'opacity-20'
				)}
			>
				{title}
			</p>
			<div
				className={cn(
					'relative h-auto opacity-20 w-max rotate-6 z-50 blur-sm ',
					'transition-all duration-500',
					!isDisabled &&
						'group-hover:blur-none group-hover:-translate-y-1/3 group-hover:opacity-100'
				)}
			>
				<img src={imgUrl} className='w-auto h-32 drop-shadow-gift' alt='' />
				<img
					src={imgSmallUrl}
					className='h-16 w-auto drop-shadow-gift absolute -bottom-0.5 -right-2'
					alt=''
				/>
			</div>
		</div>
	)
}
