import { useEffect } from 'preact/hooks'
import { useUser } from './useUser.js'

const unhideElement = (selector) => {
	const el = document.querySelector(selector) as HTMLElement | null
	if (el) {
		el.style.display = 'flex'
		el.classList.remove('hidden')
	}
}

export const useShowNeededOptions = ({ userName }) => {
	const user = useUser()

	useEffect(() => {
		const isYourTicket = user?.userName === userName

		if (isYourTicket) {
			document.querySelector('#ticket-grid')?.classList.remove('ticket-only')
			document.querySelector('#ticket-grid')?.classList.add('ticket-with-flavours')

			unhideElement('#select-flavour')
			return
		}

		unhideElement('#get-your-ticket')
	}, [])
}
