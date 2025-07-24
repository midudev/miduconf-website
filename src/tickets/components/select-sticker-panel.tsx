import { Button } from '@/components/Button'
import { StickerOption } from '../types/sticker-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { Stickers } from '@/components/icons/stickers'

interface Props {
  handleChangeSticker: (option: StickerOption) => void
  ticketDesign: TicketDesign
}

export const SelectStickerPanel = ({ ticketDesign, handleChangeSticker }: Props) => {
  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-xs uppercase text-pallet-ghost'>Stickers</h3>
      <ul className='flex flex-wrap items-center gap-4 p-4 mt-2 rounded-md bg-pallet-ghost/10'>
        {Object.values(PERSONALIZE_TIKET_OPTIONS.STICKER).map((label) => (
          <li key={label}>
            <Button
              title={`Aplicar ${label} Holograma`}
              containerClassName='bg-pallet-ghost/10'
              aria-label='Aplicar estructura circular'
              className='px-3 text-sm duration-300 aspect-square'
              onClick={() => handleChangeSticker(label)}
              variant={ticketDesign.sticker?.includes(label) ? 'border' : 'ghost'}
            >
              {STICKERS_LIST.find(({ name }) => name === label)?.StickerImage}
            </Button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export const STICKERS_LIST = [
  {
    name: 'midu-wink',
    StickerImage: <Stickers.MiduWink className='w-auto h-6' />
  },
  {
    name: 'midu-boss',
    StickerImage: <Stickers.MiduBoss className='w-auto h-6' />
  },
  {
    name: 'midu-hype',
    StickerImage: <Stickers.MiduHype className='w-auto h-6' />
  },
  {
    name: 'midu-wtf',
    StickerImage: <Stickers.MiduWtf className='w-auto h-6' />
  },
  {
    name: 'midu-f',
    StickerImage: <Stickers.MiduF className='w-auto h-6' />
  },
  {
    name: 'midu-not-like-this',
    StickerImage: <Stickers.MiduNotLikeThis className='w-auto h-6' />
  },
  {
    name: 'midu-angry',
    StickerImage: <Stickers.MiduAngry className='w-auto h-6' />
  },
  {
    name: 'midu-lul',
    StickerImage: <Stickers.MiduLul className='w-auto h-6' />
  },
  {
    name: 'midu-snif',
    StickerImage: <Stickers.MiduSnif className='w-auto h-6' />
  },
  {
    name: 'midu-wow',
    StickerImage: <Stickers.MiduWow className='w-auto h-6' />
  },
  {
    name: 'midu-love',
    StickerImage: <Stickers.MiduLove className='w-auto h-6' />
  }
]
