import { IconRun } from '@tabler/icons-react'

const types = {
	sprint: {
		name: 'Sprint',
		icon: IconRun,
		className: 'bg-yellow-900 text-yellow-300'
	}
}

export const TypeBadge = ({ name }) => {
	const info = types[name]

	if (!info) return null

	return (
		<span className={`flex justify-center items-center ${info.className}`}>
			<info.icon className='w-8 h-8' />
			{info[name]}
		</span>
	)
}
