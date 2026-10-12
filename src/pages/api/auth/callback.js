import { createSupabaseServerClient } from '@/lib/supabase-server'

const handler = async (req, res) => {
	try {
		const { code } = req.query

		if (code) {
			const supabase = createSupabaseServerClient({ req, res })
			await supabase.auth.exchangeCodeForSession(String(code))
		}

		res.redirect('/ticket')
	} catch (e) {
		console.error(e)
	}
}

export default handler
