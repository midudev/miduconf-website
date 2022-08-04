import { useEffect } from 'preact/hooks'
import { supabase } from 'src/lib/supabase.js'
import { useUser } from './useUser.js'

export const useForceImage = ({ image }) => {
	const user = useUser()

	useEffect(() => {
		const wrongImage = image === 'todotodoaaaaa.png'
		if (!user) return
		if (Boolean(image) === true && !wrongImage) return

		const forceImage = async () => {
			await supabase
				.from('ticket')
				.update({ image: '' })
				.match({ user_id: user.id })
		}

		forceImage()
	}, [])
}
