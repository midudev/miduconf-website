// la dirección donde tenemos la API
const API_ENDPOINT = 'https://api-eu-central-1.graphcms.com/v2/cl1saxjcw5r5r01xo2zfgc5ah/master'

export const queryGraphQL = ({ query }) => {
	return fetch(API_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query })
	}).then((res) => res.json())
}
