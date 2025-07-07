import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useRemainingTime } from '../hooks/useRemainingTime'

const LITERALS = ['Días', null, 'Horas', null, 'Minutos', null, 'Segundos']
const EVENT_DATE = 1757512800000 // 10 de septiembre de 2025 - 16:00h CEST

export function Countdown({ className }) {
	const { seconds, minutes, hours, days } = useRemainingTime(new Date(1757512800000), {
		fillingZeros: true
	})
	const [show, setShow] = useState(false)

	useEffect(() => {
		// solo en client side para evitar problemas de hidratacion
		setShow(true)
	}, [])

	const showValue = (value) => {
		if (value === null) return ':'
		if (show) return value
		return '00'
	}

	return (
		<>
			<div
				className={cn(
					'flex flex-row items-center justify-center gap-4 text-white md:gap-x-4',
					className
				)}
			>
				{[days, null, hours, null, minutes, null, seconds].map((value, index) => {
					return (
						<div key={index}>
							<div className='flex flex-col items-center justify-center text-center'>
								<strong className='text-xl md:text-4xl tabular-nums'>{showValue(value)}</strong>
								<span className='text-sm font-light md:text-md'>
									{value === null ? ' ' : LITERALS[index]}
								</span>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}
