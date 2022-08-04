import { extractInfoFrom, supabase } from '../lib/supabase'
import type { User } from '../lib/supabase'

import { useState } from 'preact/hooks'

export const useUser = () => {
	const [user] = useState<User>(() => {
		const rawUser = supabase.auth.user()

		if (rawUser !== null) return extractInfoFrom(rawUser)
		return null
	})

	return user
}
