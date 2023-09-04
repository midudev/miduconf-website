import { useId } from 'react'
import { DEVS } from './SelectFighter'

export function Avatar ({ team }) {
	const id = useId()

	const dev = DEVS[team].find((dev) => dev.id === team)
	const src = `img/capitanes-tr/${dev.img}`
	const alt = `${dev.name} avatar`

	return (
		<div>
			<div
				id={id}
				role='tooltip'
				className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'
			>
				{dev.name}
				<div className='tooltip-arrow' data-popper-arrow></div>
			</div>
			<img data-tooltip-target={id} className='w-10 h-10 rounded' src={src} alt={alt} />
		</div>
	)
}
