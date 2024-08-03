'use client'

import 'atropos/css'
import Atropos from 'atropos/react'
import { TwitchIcon } from './icons'
import { MiduLogo } from './logos/midudev'

export default function Ticket({ transition, number, flavor, user }) {
	const { username, avatar, name } = user ?? {}
	const ticketNumber = `#${number != null ? number.toString().padStart(5, '0') : ''}`

	return (
		<div className='relative z-[1000] w-full h-auto mx-auto aspect-video'>
			<div className='h-full opacity-100 isolate aspect-video'>
				<div className='h-full'>
					<Atropos
						id='ticket'
						highlight={false}
						innerClassName='backdrop-blur-xl rounded-[60px]'
						className='block w-full h-auto mx-auto shadow-2xl aspect-video [box-sizing:border-box]'
					>
						<div
							className={`block h-full overflow-hidden opacity-100 rounded-[60px] shadow-[inset_0_4px_30px] shadow-midu-primary/25 bg-transparent border border-midu-primary/10 p-5 ${
								transition && 'transition duration-500 ease-in-out'
							} `}
						>
							<div className='relative flex h-full overflow-hidden bg-[#101E5B]/65 border border-midu-primary/20 rounded-[40px]'>
								<div className='absolute w-1/2 rotate-45 h-[300%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#41b3ff00] via-[#b0a9ff13] to-[#41b3ff00]'></div>
								<span className='ticket-dash-border h-full px-4 font-mono text-center text-white md:px-7 text-sm font-bold md:text-[40px] [writing-mode:vertical-lr]'>
									{ticketNumber}
								</span>
								<div className='z-10 grid w-full grid-rows-2'>
									<div className='grid grid-cols-2'>
										<div className='flex justify-center gap-4 p-5 font-mono text-white h-max md:p-6 gap-y-2'>
											{avatar && (
												<>
													<img
														src={avatar}
														crossOrigin='anonymous'
														className='block w-10 h-10 rounded-full md:w-[78px] md:h-[78px]'
														alt={`Avatar de ${username}`}
														width='78'
														height='78'
													/>
													<div>
														<p className={`text-xl font-bold`}>{username ?? name}</p>
													</div>
												</>
											)}
										</div>
										<div className='p-5'>
											<MiduLogo className='h-auto ml-auto w-9' />
											<time
												dateTime='2024-09-12T06:00:00'
												className='block mt-2 font-bold text-right text-white'
											>
												Sept. 12 2024
												<span className='block text-sm font-normal text-white/60'>06:00 GTM-6</span>
											</time>
										</div>
									</div>

									<a
										href='https://www.twitch.tv/midudev'
										target='_blank'
										rel='nofollow'
										className='flex items-center justify-self-end justify-end self-end gap-2 p-5 text-xl font-bold text-white col-span-full w-max hover:text-[#b9a3e3] transition-colors'
									>
										<TwitchIcon className='w-5 h-auto' />
										twitch.tv/midudev
									</a>
								</div>
								<div
									className={
										'absolute overflow-hidden opacity-30 -right-8 -bottom-10 h-auto rounded-r-2xl flex items-end'
									}
								>
									<figure className={`${flavor.figure} max-w-52 max-h-52 -rotate-6 p-8 -z-10`}>
										<flavor.component className='w-full h-auto ' />
									</figure>
								</div>
							</div>

							{/* <div className='absolute items-center p-4 overflow-hidden font-mono text-white z-[1000] md:p-6 left-20 bottom-2 opacity-100 hidden md:block'>
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
							</div> */}

							{/* <div
								className={`${
									transition && 'transition duration-500 ease-in-out'
								} absolute inset-0 flex items-start justify-center z-20 left-0 right-0 w-full h-full border md:border-[6px] ${
									flavor.colors.border
								} rounded-2xl`}
							></div> */}

							{/* <div className='absolute z-50 items-center p-4 overflow-hidden font-mono text-white md:p-6 left-2 bottom-2'>
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
							</div> */}
						</div>
					</Atropos>
				</div>
			</div>
		</div>
	)
}
