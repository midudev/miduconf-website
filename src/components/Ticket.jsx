'use client'

import 'atropos/css'
import Atropos from 'atropos/react'
import { Logo } from './Logo'
import { Codely } from '@/components/logos/codely'
import { DonDominio } from '@/components/logos/dondominio'
import { Malt } from '@/components/logos/maltes'
import { LemonCode } from '@/components/logos/lemoncode'

const BackgroundPattern = () => (
	<svg id='patternId' width='200%' height='200%' xmlns='http://www.w3.org/2000/svg'>
		<defs>
			<pattern id='a' patternUnits='userSpaceOnUse' width='180' height='45'>
				<path
					d='m0 5.625 14.06 7.03 16.876-8.438L22.502 0H11.25l8.436 4.219-5.623 2.81L0 0ZM33.75 0l2.81 1.406L39.374 0Zm16.871 0h.002L19.686 15.469l16.877 8.44 30.939-15.47 5.625 2.811-30.94 15.47 16.875 8.438 14.063-7.031 5.623 2.812L50.621 45h11.25l28.131-14.063L73.126 22.5l-14.065 7.033-5.623-2.812L84.374 11.25 67.498 2.81 36.561 18.282l-5.625-2.814L61.87 0H50.62Zm22.505 0L90 8.437l14.06-7.03 5.626 2.812-30.938 15.469 16.874 8.438 30.939-15.472 5.625 2.815L73.126 45h11.25l59.061-29.532L126.56 7.03 95.622 22.499l-5.621-2.814 30.934-15.467L112.498 0H95.621l-5.623 2.813L84.376 0Zm50.624 0h-.002l44.998 22.5-5.623 2.813-14.063-7.032-16.876 8.44 30.941 15.468-2.813 1.407L157.499 45h11.249l5.628-2.813-30.938-15.468 5.624-2.813 14.064 7.033L180 22.501 134.998 0Zm33.749 45L126.56 29.532l-16.877 8.439L123.749 45h11.249l-14.062-7.03 5.625-2.812L146.248 45ZM146.248 0l11.25 5.625L168.748 0Zm16.875 8.44L180 16.877V11.25l-5.625-2.815L180 5.625V0ZM0 11.25v5.627l42.186 21.092-5.625 2.814-30.938-15.47L0 28.122v5.629l5.623-2.813L33.75 45h5.624l14.062-7.031zm0 22.502v5.625L11.251 45h11.251zm180-5.631v.002l-11.252 5.627L180 39.377Zm-75.939 12.662L95.621 45h16.877z'
					strokeWidth='1'
					stroke='none'
					fill='rgba(255, 255, 255, .1)'
				/>
			</pattern>
		</defs>
		<rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' />
	</svg>
)

export default function Ticket({ transition, number, flavor, user }) {
	const { username, avatar, name } = user ?? {}

	return (
		<div className='relative z-[1000] w-full h-auto mx-auto aspect-video'>
			<div className='h-full opacity-100 isolate aspect-video'>
				<div className='h-full sm:px-12'>
					<Atropos
						id='ticket'
						className='block w-full h-auto mx-auto bg-[#000214] shadow-2xl aspect-video rounded-2xl [box-sizing:border-box]'
					>
						<div
							className={`block h-full overflow-hidden opacity-100 rounded-2xl ${
								transition && 'transition duration-500 ease-in-out'
							} ${flavor.colors.ticket}`}
						>
							<div className='relative flex flex-col items-center h-full overflow-hidden'>
								<div className='absolute inset-0 flex items-start justify-center -z-50'>
									<div className='h-full w-full [mask-image:linear-gradient(black_10%,transparent)]'>
										<BackgroundPattern />
									</div>
								</div>

								<div className='z-50 mt-12'>
									<div className='relative block'>
										<Logo />
									</div>
								</div>

								<h4
									className={`hidden md:block ${
										transition && 'transition duration-500 ease-in-out'
									} ${
										flavor.colors.text
									} font-medium text-2xl text-center [text-wrap:balance] max-w-2xl text-shadow-lg z-50 opacity-80 -mt-6`}
								>
									Conferencia de Programación y Tecnología
								</h4>
								<div
									className={`${transition && 'transition duration-500 ease-in-out'} ${
										flavor.colors.text
									} font-semibold z-10 text-base sm:text-xl leading-6 gap-x-2 text-shadow-xl flex justify-center items-center md:mt-6`}
								>
									<svg
										className='w-4 h-auto sm:w-8'
										width='256px'
										height='268px'
										viewBox='0 0 256 268'
										version='1.1'
										xmlns='http://www.w3.org/2000/svg'
										preserveAspectRatio='xMidYMid'
									>
										<g>
											<path
												d='M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z'
												fill='currentColor'
											></path>
										</g>
									</svg>
									<span>twitch.tv/midudev</span>
								</div>
							</div>
							<div className='absolute items-center p-4 overflow-hidden font-mono text-white md:p-6 left-2 top-2'>
								<strong className='text-sm font-extrabold md:text-3xl'>
									#{number != null ? number.toString().padStart(5, '0') : ''}
								</strong>
							</div>

							<div className='absolute items-center p-4 overflow-hidden font-mono text-white z-[1000] md:p-6 left-20 bottom-2 opacity-100 hidden md:block'>
								<span className='block mb-4 text-xs text-left uppercase text-zinc-300'>
									Gracias a:
								</span>
								<div className='flex flex-row items-center gap-x-6'>
									<Codely className='h-auto w-36' />
									<DonDominio className='h-auto w-36' />
									<Malt className='w-24 h-auto' />
									<LemonCode className='h-auto w-28' />
								</div>
							</div>

							<div
								className={
									'absolute z-10 overflow-hidden opacity-30 -right-8 -bottom-10 h-full rounded-r-2xl flex items-end'
								}
							>
								<figure
									className={`${flavor.figure} w-48 h-48 md:w-96 md:h-96 -rotate-6 p-8 -z-10`}
								>
									<flavor.component className='w-full h-auto' />
								</figure>
							</div>

							<div
								className={`${
									transition && 'transition duration-500 ease-in-out'
								} absolute inset-0 flex items-start justify-center z-20 left-0 right-0 w-full h-full border md:border-[6px] ${
									flavor.colors.border
								} rounded-2xl`}
							></div>

							{avatar && (
								<div className='absolute z-50 flex flex-col items-center justify-center p-4 overflow-hidden font-mono text-white md:p-6 right-2 top-2 gap-y-2'>
									<img
										crossOrigin='anonymous'
										className='block w-10 h-10 rounded-full md:w-20 md:h-20'
										src={avatar}
										alt={`Avatar de ${username}`}
									/>
									<h3 className={`text-sm font-bold ${flavor.colors.text}`}>{username ?? name}</h3>
								</div>
							)}

							<div className='absolute z-50 items-center p-4 overflow-hidden font-mono text-white md:p-6 left-2 bottom-2'>
								<div className='z-50 flex flex-col gap-0 leading-none text-shadow-xl'>
									<span
										className={`text-xs sm:text-[23px] leading-none font-black ${flavor.colors.month}`}
									>
										SEP
									</span>
									<span className='text-xl font-bold leading-none text-white sm:text-4xl'>13</span>
									<span className={`text-xs sm:text-[22px] leading-none ${flavor.colors.time}`}>
										6PM
									</span>
								</div>
							</div>
						</div>
					</Atropos>
				</div>
			</div>
		</div>
	)
}
