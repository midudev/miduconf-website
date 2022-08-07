import { useEffect } from 'preact/hooks'
import { useUser } from './useUser.js'

export const useShowNeededOptions = ({ userName }) => {
	const user = useUser()

	useEffect(() => {
		const isYourTicket = user?.userName === userName

		if (isYourTicket) {
			document.querySelector('#ticket-grid')?.classList.remove('ticket-only')
			document.querySelector('#ticket-grid')?.classList.add('ticket-with-flavours')

			return document.querySelector('#select-flavour')?.classList.remove('hidden')
		}

		document.querySelector('#get-your-ticket')?.classList.remove('hidden')
	}, [])
}
