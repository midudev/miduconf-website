module.exports = {
	env: {
		node: true,
		es2022: true,
		browser: true
	},
	extends: ['eslint:recommended', 'standard', 'plugin:astro/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'no-multiple-empty-lines': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab']
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.astro'],
			parser: '@typescript-eslint/parser'
		},
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro']
			},
			rules: {
				'astro/no-set-html-directive': 'error' // prevent XSS attack
			}
		}
	]
}
