import React from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { StructureType } from '../animations'

interface Props {
	onStructureSelect: (structure: StructureType) => void
	selectedStructure?: StructureType
}

const STRUCTURES: Array<{ 
	id: StructureType
	name: string
	render: () => React.ReactElement
}> = [
	{ 
		id: 'box', 
		name: 'Cuadrado',
		render: () => <div className='size-8 bg-white rounded'></div>
	},
	{ 
		id: 'piramide', 
		name: 'Triángulo',
		render: () => <div className='size-8 bg-white' style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
	},
	{ 
		id: 'prism', 
		name: 'Hexágono',
		render: () => <div className='size-8 bg-white' style={{
			backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
			backgroundSize: '3px 3px',
			backgroundPosition: '0 0, 1.5px 1.5px'
		}}></div>
	},
	{ 
		id: 'circle', 
		name: 'Círculo',
		render: () => <div className='size-8 bg-white rounded-full'></div>
	}
]

export const StructureSelectorPanel = ({ onStructureSelect, selectedStructure = 'box' }: Props) => {
	return (
		<div>
			<h3 className='text-sm font-medium text-palette-ghost mb-4 tracking-wide'>ESTRUCTURA</h3>
			<div className='bg-palette-border-foreground rounded-lg p-4'>
				<div className='grid grid-cols-4 gap-2'>
					{STRUCTURES.map((structure) => {
						const isSelected = selectedStructure === structure.id
						return (
							<Button
								key={structure.id}
								variant={isSelected ? 'border' : 'ghost'}
								size='small'
								className='aspect-square p-0 flex items-center justify-center'
								onClick={() => onStructureSelect(structure.id)}
								title={structure.name}
							>
								{structure.render()}
							</Button>
						)
					})}
				</div>
			</div>
		</div>
	)
}