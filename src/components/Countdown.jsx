import { useEffect, useState } from 'react'
import { useRemainingTime } from '../hooks/useRemainingTime'

const LITERALS = ['Días', null, 'Horas', null, 'Minutos', null, 'Segundos']

export function Countdown() {
	const { seconds, minutes, hours, days } = useRemainingTime(new Date(1726153200000), {
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
			<div className='flex flex-row items-center justify-center gap-4 mt-12 text-white animate-blurred-fade-in md:gap-x-12'>
				{[days, null, hours, null, minutes, null, seconds].map((value, index) => {
					return (
						<div key={index}>
							<div className='flex flex-col items-center justify-center text-center'>
								<strong className='text-3xl md:text-7xl tabular-nums'>{showValue(value)}</strong>
								<span className='text-sm font-light md:text-xl'>
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
