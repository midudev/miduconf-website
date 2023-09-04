import { Meteors } from './Meteor'
import { useRemainingTime } from '../hooks/useRemainingTime'
import { useEffect, useState } from 'react'
import { ShareTicketButton } from './ShareTicketButton'

export function HeaderCountdown () {
	const { seconds, minutes, hours, days } = useRemainingTime(new Date(1694628000000), {
		fillingZeros: false
	})
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<>
			<div className='relative w-full h-14 p-2 flex items-center justify-center text-white !bg-cover !bg-center overflow-hidden'>
				<div className='relative z-10 flex items-center justify-center'>
					<div className='w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center'>
						<p>
							<span className='font-semibold text-yellow-300'>Empieza en...</span>
						</p>
						<div className='flex items-center gap-1'>
							<div className='flex items-center gap-1'>
								<div className='rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]'>
									<div className='py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md'>
										<span className='m-0'>{show && days}</span>
										<span>d</span>
									</div>
								</div>
								:
								<div className='rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]'>
									<div className='py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md'>
										<span className='m-0'>{show && hours}</span>
										<span>h</span>
									</div>
								</div>
								:
								<div className='rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]'>
									<div className='py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md'>
										<span className='m-0'>{show && minutes}</span>
										<span>m</span>
									</div>
								</div>
								:
								<div className='rounded-md p-[1px] overflow-hidden bg-gradient-to-b from-[#514b6130] to-[#514b6100]'>
									<div className='py-1 px-2 rounded-md w-11 leading-4 flex items-center justify-center bg-gradient-to-b from-[#51269c40] to-[#DBB8BF10] backdrop-blur-md'>
										<span className='m-0'>{show && seconds}</span>
										<span>s</span>
									</div>
								</div>
							</div>
						</div>
						<div className='hidden md:block'>
							<ShareTicketButton>Conseguir Ticket</ShareTicketButton>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
