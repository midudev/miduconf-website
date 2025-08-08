import { Button } from '@/components/Button'
import { StickerOption } from '../types/sticker-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { cn } from '@/lib/utils'
import { STICKERS_LIST } from '../constants/stickers-list'
import { getMaxStickersUnlock } from '../utils/get-max-stickers-unlock'
import { LockIcon } from '../icons/structure-ticket/lock'
import { Tooltip } from '@/components/Tooltip'

interface Props {
  handleAddSticker: (option: StickerOption, maxListOfStickers: number) => void
  handleRemoveSticker: (option: StickerOption) => void
  ticketDesign: TicketDesign
  twitchTier?: '1' | '2' | '3' | null
  midudevTypeSub?: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
}

export const SelectStickerPanel = ({
  ticketDesign,
  handleAddSticker,
  handleRemoveSticker,
  twitchTier,
  midudevTypeSub
}: Props) => {
  const numberOfStickersUnlock = getMaxStickersUnlock(twitchTier, midudevTypeSub)
  const hasNotSubscription = numberOfStickersUnlock === 0

  return (
    <article className='flex flex-col gap-4'>
      <h3 className='text-sm font-medium uppercase text-palette-ghost'>Stickers</h3>
      <ul className='flex flex-wrap items-center gap-1 p-3 rounded-md bg-palette-ghost/10'>
        {Object.values(PERSONALIZE_TIKET_OPTIONS.STICKER).map((label) => {
          const existStickerOnList = ticketDesign.sticker?.includes(label)

          if (hasNotSubscription)
            return (
              <li key={label}>
                <div className='relative'>
                  <Tooltip text={'Desbloquear con Twitch o Academia'.toUpperCase()}>
                    <Button
                      title={`Aplicar ${label} Sticker`}
                      containerClassName='w-12! h-12! inline-flex items-center justify-center'
                      className={cn(
                        'w-12! h-12! p-3 text-sm',
                        existStickerOnList && 'bg-palette-ghost/50 scale-[0.8]',
                        hasNotSubscription && 'opacity-50 pointer-events-auto'
                      )}
                      disabled={hasNotSubscription}
                      aria-label='Aplicar estructura circular'
                      onClick={() => {
                        if (hasNotSubscription) return

                        const existSticker = existStickerOnList
                        existSticker
                          ? handleRemoveSticker(label)
                          : handleAddSticker(label, numberOfStickersUnlock)
                      }}
                      variant={existStickerOnList ? 'border' : 'ghost'}
                    >
                      {STICKERS_LIST.find(({ name }) => name === label)?.StickerImage}
                    </Button>
                    {hasNotSubscription && (
                      <LockIcon className='absolute top-0 -right-1 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5' />
                    )}
                  </Tooltip>
                </div>
              </li>
            )

          return (
            <li key={label}>
              <div className='relative'>
                <Button
                  title={`Aplicar ${label} Sticker`}
                  containerClassName='w-12! h-12! inline-flex items-center justify-center'
                  className={cn(
                    'w-12! h-12! p-3 text-sm',
                    existStickerOnList && 'bg-palette-ghost/50 scale-[0.8]',
                    hasNotSubscription && 'opacity-50 pointer-events-auto'
                  )}
                  disabled={hasNotSubscription}
                  aria-label='Aplicar estructura circular'
                  onClick={() => {
                    if (hasNotSubscription) return

                    const existSticker = existStickerOnList
                    existSticker
                      ? handleRemoveSticker(label)
                      : handleAddSticker(label, numberOfStickersUnlock)
                  }}
                  variant={existStickerOnList ? 'border' : 'ghost'}
                >
                  {STICKERS_LIST.find(({ name }) => name === label)?.StickerImage}
                </Button>
                {hasNotSubscription && (
                  <LockIcon className='absolute top-0 -right-1 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5' />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
