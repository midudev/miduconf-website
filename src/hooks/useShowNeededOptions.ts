import { useEffect } from 'preact/hooks'
import { useUser } from './useUser.js'

export const useShowNeededOptions = ({ userName }) => {
	const user = useUser()

	useEffect(() => {
		const isYourTicket = user.userName === userName

		if (isYourTicket) {
			document.querySelector('#select-flavour')?.classList.remove('hidden')
			return
		}

		document.querySelector('#get-your-ticket')?.classList.remove('hidden')
	}, [])
}
