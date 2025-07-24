import { Button } from '@/components/Button'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'

interface Props {
  handleChangeHologram: (option: HologramOption) => void
  ticketDesign: TicketDesign
}

export const SelectHologramPanel = ({ ticketDesign, handleChangeHologram }: Props) => {
  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-xs uppercase text-pallet-ghost'>Holográfico</h3>
      <ul className='flex flex-wrap items-center gap-4 p-4 mt-2 rounded-md bg-pallet-ghost/10'>
        {Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).map((label, index) => (
          <li key={label}>
            <Button
              title={`Aplicar ${label} Holograma`}
              containerClassName='bg-pallet-ghost/10'
              aria-label='Aplicar estructura circular'
              className='px-3 text-sm duration-300 aspect-square'
              onClick={() => handleChangeHologram(label)}
              variant={ticketDesign.hologram === label ? 'border' : 'ghost'}
            >
              {index === 0 ? (
                <div className='w-6 h-6 rounded-full border-pallet-border-primary'></div>
              ) : (
                <img
                  src={`/tickets/holograms/${index}.png`}
                  alt={`Representación del ${label} Holograma`}
                  className='w-6 h-6 rounded-full'
                  width='30'
                  height='30'
                />
              )}
            </Button>
          </li>
        ))}
      </ul>
    </article>
  )
}
