import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export default async function handler (req, res) {
	const supabase = createPagesServerClient({ req, res })

	// count number of tickets
	const { count: number } = await supabase.from('ticket').select('*', { count: 'exact' })

	return res.status(200).json({ number: number + 1 })
}
