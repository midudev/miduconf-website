import { useEffect } from 'preact/hooks'
import { supabase } from 'src/lib/supabase.js'
import { useUser } from './useUser.js'

export const useChangeFlavour = () => {
	const user = useUser()

	useEffect(() => {
		document.querySelectorAll('#select button').forEach((button) =>
			button.addEventListener('click', async (event) => {
				const currentTarget = event.currentTarget as HTMLButtonElement
				const flavour = currentTarget.getAttribute('data-tech')

				const { data, error } = await supabase
					.from('ticket')
					.update({ flavour })
					.match({ user_id: user.id })

				console.log(data, error)
			})
		)
	}, [])
}
