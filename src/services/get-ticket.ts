import { supabase } from 'src/lib/supabase.js'

// TODO: type ticket data
export const getTicketDataByUsername = async (username: string | number) => {
	const { error, data } = await supabase
		.from('ticket')
		.select('*')
		.eq('user_name', username)

	if (error) {
		console.error(error)
	}

	return {
		data: data[0],
		error
	}
}
