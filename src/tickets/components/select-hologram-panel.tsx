import { Button } from '@/components/Button'
import { StructureOpcion } from '../types/structure-option'
import { AnimationOption } from '../types/animation-option'
import { ColorOption } from '../types/color-option'
import { HologramOption } from '../types/hologram-option'

interface Props {
  handleChangeHologram: (option: HologramOption) => void
  ticketDesign: {
    animation: AnimationOption
    structure: StructureOpcion
    color: ColorOption
    hologram: HologramOption
  }
}

export const SelectHologramPanel = ({ ticketDesign, handleChangeHologram }: Props) => {
  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-xs uppercase text-pallet-ghost'>Holográfico</h3>
      <ul className='flex flex-wrap items-center gap-4 p-4 mt-2 rounded-md bg-pallet-ghost/10'>
        {listOfHolograms.map(({ label, value }) => (
          <li key={value}>
            <Button
              title={`Aplicar ${label} Holograma`}
              containerClassName='bg-pallet-ghost/10'
              aria-label='Aplicar estructura circular'
              className='px-3 text-sm duration-300 aspect-square'
              onClick={() => handleChangeHologram(value)}
              variant={ticketDesign.hologram === value ? 'border' : 'ghost'}
            >
              <img
                src={`/tickets/holograms/${value}.png`}
                alt={`Representación del ${label} Holograma`}
                className='w-4 h-4 rounded-full'
                width='30'
                height='30'
              />
            </Button>
          </li>
        ))}
      </ul>
    </article>
  )
}

const listOfHolograms = [
  {
    label: 'Primer',
    value: '1'
  },
  {
    label: 'Segundo',
    value: '2'
  },
  {
    label: 'Tercer',
    value: '3'
  },
  {
    label: 'Cuarto',
    value: '4'
  },
  {
    label: 'Quinto',
    value: '5'
  },
  {
    label: 'Sexto',
    value: '6'
  }
] as const
