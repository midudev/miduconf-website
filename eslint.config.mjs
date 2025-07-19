import neostandard from 'neostandard'

export default [
	...neostandard({
		noStyle: true
	}),
	{
		ignores: ['.next/**', 'out/**', 'build/**']
	}
]
