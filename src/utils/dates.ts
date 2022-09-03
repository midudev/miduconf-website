export const localeDate = (date?: Date) => {
	const d = date || new Date()
	return new Date(d.toLocaleString('en-US'))
}
