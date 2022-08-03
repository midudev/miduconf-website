import { useProgressiveNumber } from '@hooks/useProgressiveNumber'
import { useEffect } from 'preact/hooks'

export const UserTicketNumber = ({ ticketNumber, animate }) => {
	const [number, setNumber] = useProgressiveNumber(() => {
		if (animate) return 0
		return ticketNumber
	})

	useEffect(() => {
		if (!animate) return

		setTimeout(() => {
			setNumber(+ticketNumber)
		}, 500)
	}, [ticketNumber])

	return <div>#{number?.toFixed(0).padStart(5, '0')}</div>
}
