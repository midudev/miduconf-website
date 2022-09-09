// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const returnImage = (buffer) => ({
	headers: {
		'Content-Type': 'image/png'
	},
	statusCode: 200,
	body: buffer.toString('base64'),
	isBase64Encoded: true
})

exports.handler = async function (event) {
	const {
		queryStringParameters: { username }
	} = event

	// check if image is already available in supabase to return it
	const { error, data } = await supabase.from('ticket').select('image').eq('user_name', username)

	const [{ image }] = data ?? []

	if (!error && image) {
		const res = await fetch(image)
		const blob = await res.arrayBuffer()
		return returnImage(Buffer.from(blob))
	}

	return new Response('', { statusCode: 404 })
}
