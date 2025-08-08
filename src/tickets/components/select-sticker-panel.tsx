import { Button } from '@/components/Button'
import { StickerOption } from '../types/sticker-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { cn } from '@/lib/utils'
import { STICKERS_LIST } from '../constants/stickers-list'

interface Props {
  handleAddSticker: (option: StickerOption) => void
  handleRemoveSticker: (option: StickerOption) => void
  ticketDesign: TicketDesign
}

export const SelectStickerPanel = ({
  ticketDesign,
  handleAddSticker,
  handleRemoveSticker
}: Props) => {
  return (
    <article className='flex flex-col gap-4'>
      <h3 className='text-sm font-medium uppercase text-palette-ghost'>Stickers</h3>
      <ul className='flex flex-wrap items-center gap-1 p-3 rounded-md bg-palette-ghost/10'>
        {Object.values(PERSONALIZE_TIKET_OPTIONS.STICKER).map((label) => (
          <li key={label}>
            <div className='relative'>
              <Button
                title={`Aplicar ${label} Sticker`}
                containerClassName='w-12! h-12! inline-flex items-center justify-center'
                className={cn(
                  'w-12! h-12! p-3 text-sm',
                  ticketDesign.sticker?.includes(label) && 'bg-palette-ghost/50 scale-[0.8]'
                )}
                aria-label='Aplicar estructura circular'
                onClick={() => {
                  const existSticker = ticketDesign.sticker?.includes(label)
                  existSticker ? handleRemoveSticker(label) : handleAddSticker(label)
                }}
                variant={ticketDesign.sticker?.includes(label) ? 'border' : 'ghost'}
              >
                {STICKERS_LIST.find(({ name }) => name === label)?.StickerImage}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}
