import { Button } from '@/components/Button'
import { AnimationOption } from '../types/animation-option'
import { StructureOpcion } from '../types/structure-option'
import { ColorOption } from '../types/color-option'

interface Props {
  handleChangeAnimation: (option: AnimationOption) => void
  ticketDesign: {
    animation: AnimationOption
    structure: StructureOpcion
    color: ColorOption
  }
}

export const SelectAnimationPanel = ({ handleChangeAnimation, ticketDesign }: Props) => {
  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-sm text-pallet-ghost'>Animación</h3>
      <ul className='flex flex-wrap items-center gap-4 mt-2'>
        <li>
          <Button
            className='px-3 py-1 text-sm duration-300'
            onClick={() => handleChangeAnimation('default')}
            variant={ticketDesign.animation === 'default' ? 'border' : 'ghost'}
          >
            Default
          </Button>
        </li>
        <li>
          <Button
            className='px-3 py-1 text-sm duration-300'
            onClick={() => handleChangeAnimation('piramide')}
            variant={ticketDesign.animation === 'piramide' ? 'border' : 'ghost'}
          >
            Piramide
          </Button>
        </li>
        <li>
          <Button
            className='px-3 py-1 text-sm duration-300'
            onClick={() => handleChangeAnimation('friccion')}
            variant={ticketDesign.animation === 'friccion' ? 'border' : 'ghost'}
          >
            Fricción
          </Button>
        </li>
      </ul>
    </article>
  )
}
