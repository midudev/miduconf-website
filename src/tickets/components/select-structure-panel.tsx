import { Button } from '@/components/Button'
import { CircleIcon } from '../icons/structure-ticket/circle'
import { PrismIcon } from '../icons/structure-ticket/prism'
import { BackgroundIcon } from '../icons/structure-ticket/background'
import { PiramideIcon } from '../icons/structure-ticket/piramide'
import { BoxIcon } from '../icons/structure-ticket/box'
import { HearthIcon } from '../icons/structure-ticket/hearth'
import { StructureOpcion } from '../types/structure-option'
import { AnimationOption } from '../types/animation-option'
import { ColorOption } from '../types/color-option'

interface Props {
  handleChangeStructure: (option: StructureOpcion) => void
  ticketDesign: {
    animation: AnimationOption
    structure: StructureOpcion
    color: ColorOption
  }
}

export const SelectStructurePanel = ({ ticketDesign, handleChangeStructure }: Props) => {
  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-sm text-pallet-ghost'>Estructura</h3>
      <ul className='flex flex-wrap items-center gap-4 p-4 mt-2 rounded-md bg-pallet-ghost/10'>
        <li>
          <Button
            title='Aplicar estructura circular'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura circular'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('circle')}
            variant={ticketDesign.structure === 'circle' ? 'border' : 'ghost'}
          >
            <CircleIcon className='w-auto h-4' />
          </Button>
        </li>
        <li>
          <Button
            title='Aplicar estructura de prisma'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura de prisma'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('prism')}
            variant={ticketDesign.structure === 'prism' ? 'border' : 'ghost'}
          >
            <PrismIcon className='w-auto h-4' />
          </Button>
        </li>
        <li>
          <Button
            title='Aplicar estructura de Background'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura de Background'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('background')}
            variant={ticketDesign.structure === 'background' ? 'border' : 'ghost'}
          >
            <BackgroundIcon className='w-auto h-4' />
          </Button>
        </li>
        <li>
          <Button
            title='Aplicar estructura de piramide'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura de piramide'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('piramide')}
            variant={ticketDesign.structure === 'piramide' ? 'border' : 'ghost'}
          >
            <PiramideIcon className='w-4 h-auto' />
          </Button>
        </li>
        <li>
          <Button
            title='Aplicar estructura de caja'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura de caja'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('box')}
            variant={ticketDesign.structure === 'box' ? 'border' : 'ghost'}
          >
            <BoxIcon className='w-auto h-4' />
          </Button>
        </li>
        <li>
          <Button
            title='Aplicar estructura de corazón'
            containerClassName='bg-pallet-ghost/10'
            aria-label='Aplicar estructura de corazón'
            className='px-3 text-sm duration-300 aspect-square'
            onClick={() => handleChangeStructure('hearth')}
            variant={ticketDesign.structure === 'hearth' ? 'border' : 'ghost'}
          >
            <HearthIcon className='w-auto h-4' />
          </Button>
        </li>
      </ul>
    </article>
  )
}
