import { Button } from '@/components/Button'
import { ColorOption } from '../types/color-option'
import { TicketDesign } from '../types/ticket-design'

interface Props {
	handleChangeColor: (option: ColorOption) => void
	ticketDesign: TicketDesign
}

export const SelectColorPanel = ({ ticketDesign, handleChangeColor }: Props) => {
	return (
		<article className='pt-6'>
			<h3 className='ml-1 text-xs uppercase text-palette-ghost'>Colores</h3>
			<ul className='flex flex-wrap items-center gap-4 p-4 mt-2 rounded-md bg-palette-ghost/10'>
				{listOfCOlors.map(({ label, value, color }) => (
					<li key={value}>
						<Button
							title={`Aplicar color ${label}`}
							containerClassName='bg-palette-ghost/10'
							aria-label='Aplicar estructura circular'
							className='px-3 text-sm duration-300 aspect-square'
							onClick={() => handleChangeColor(value)}
							variant={ticketDesign.color === value ? 'border' : 'ghost'}
						>
							<div
								style={{
									backgroundColor: color
								}}
								className='w-4 h-4 rounded-full'
							/>
						</Button>
					</li>
				))}
			</ul>
		</article>
	)
}

const listOfCOlors = [
	{
		label: 'azul',
		value: 'blue',
		color: '#5A8CF6'
	},
	{
		label: 'naranja',
		value: 'orange',
		color: '#FC9211'
	},
	{
		label: 'rojo',
		value: 'red',
		color: '#FA444A'
	},
	{
		label: 'verde',
		value: 'green',
		color: '#00FC65'
	},
	{
		label: 'rosa',
		value: 'pink',
		color: '#FB4AD8'
	},
	{
		label: 'gris',
		value: 'gray',
		color: '#949494'
	}
] as const
