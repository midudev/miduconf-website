import { createClient } from '@supabase/supabase-js'

export type User = {
	avatar: string
	userName: string
	name: string
	email: string
	id: string
}

export type Ticket = {
	id: string
	created_at: string
	user_name: string
	user_id: string
	flavour: string
	ticket_number: number
	user_fullname: string
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const extractInfoFrom = (rawUser): User => {
	const userData = rawUser?.identities?.[0]?.identity_data
	if (!userData) return null

	const { id } = rawUser
	const { user_name: userName, name, email } = userData
	const avatar = `https://unavatar.io/github/${userName}`

	return { avatar, id, userName, name, email }
}
