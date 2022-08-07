import { useEffect } from 'preact/hooks'
import { useUser } from './useUser.js'

const unhideElement = (selector: string) => {
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
			return unhideElement('#select-flavour')
		}

		unhideElement('#get-your-ticket')
	}, [])
}
