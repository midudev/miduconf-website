import { Button } from '@/components/Button'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { Tooltip } from '@/components/Tooltip'
import { LockIcon } from '@/tickets/icons/structure-ticket/lock'
import { TwitchIcon } from '@/components/icons/twitch'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { useUpdateTicketInDB } from '../hooks/use-update-ticket-in-db'
import { useUpdateTicketImageInDB } from '../hooks/use-update-ticket-image-in-db'
import { createTicketImage } from '../utils/create-ticket-image'
import { StickerOption } from '../types/sticker-option'
import { cn } from '@/lib/utils'

interface Props {
  handleChangeHologram: (option: HologramOption) => void
  ticketOGImageElement: HTMLElement | null
  ticketDesign: TicketDesign
  twitchTier: '1' | '2' | '3' | null
  midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
  username: string
  ticketNumber: number
  midudevTokentId: string
  handleAddSticker: (sticker: StickerOption) => void
}

export const SelectHologramPanel = ({
  ticketDesign,
  twitchTier,
  username,
  ticketOGImageElement,
  ticketNumber,
  midudevTokentId,
  midudevTypeSub,
  handleChangeHologram,
  handleAddSticker
}: Props) => {
  const { handleUpdateTicket } = useUpdateTicketInDB()
  const { handleUpdateImageTicket } = useUpdateTicketImageInDB()

  const handleChangeHologramAndSave = async (hologram: HologramOption) => {
    handleChangeHologram(hologram)

    await handleUpdateTicket({
      ticketInfo: {
        hologram
      },
      username
    })

    if (ticketOGImageElement == null) return

    const { fileImage, filename } = await createTicketImage({
      ticketDOMContnet: ticketOGImageElement,
      ticketNumber
    })

    await handleUpdateImageTicket({
      file: fileImage,
      filename
    })
  }

  // Use actual hologram constants
  const STANDARD_HOLOGRAM = PERSONALIZE_TIKET_OPTIONS.HOLOGRAM.STANDARD
  const TWITCH_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
    label.startsWith('twitch')
  )
  const ACADEMIA_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
    label.startsWith('academia')
  )

  const getAcademyTierIndex = (midudevTypeSub: Props['midudevTypeSub']) => {
    if (midudevTypeSub === 'monthly') return 1
    if (midudevTypeSub === 'quarterly') return 2
    if (midudevTypeSub === 'annual') return 3
    if (midudevTypeSub === 'lifetime') return 4
    return 0
  }

  // Function to get tooltip component and className for each hologram
  const getHologramTooltip = (
    value: string,
    disabled: boolean
  ): { content: React.ReactNode; className: string; arrowClassName: string } => {
    if (value === STANDARD_HOLOGRAM) {
      return {
        content: <span className='text-xs'>Estándar</span>,
        className: 'bg-palette-primary',
        arrowClassName: 'fill-palette-primary'
      }
    }

    if (value.startsWith('twitch')) {
      const tierNumber = value.split('-')[1]
      return {
        content: (
          <div className='flex items-center gap-2'>
            <TwitchIcon className='w-4 h-4' />
            <span className='text-xs font-medium tracking-wide uppercase'>TIER {tierNumber}+</span>
          </div>
        ),
        className: 'bg-purple-600 transform -rotate-2',
        arrowClassName: 'fill-purple-600'
      }
    }

    if (value.startsWith('academia')) {
      const tierName = value.includes('mensual')
        ? 'MENSUAL'
        : value.includes('trimestral')
        ? 'TRIMESTRAL'
        : value.includes('anual')
        ? 'ANUAL'
        : 'LIFETIME'
      return {
        content: (
          <div className='flex items-center gap-2'>
            <WhiteMidudevLogo className='w-4 h-4' />
            <span className='text-xs font-medium tracking-wide uppercase'>ACADEMIA {tierName}</span>
          </div>
        ),
        className: 'bg-orange-500 transform -rotate-2',
        arrowClassName: 'fill-orange-500'
      }
    }

    return {
      content: <span className='text-xs'>Especial</span>,
      className: 'bg-palette-primary',
      arrowClassName: 'fill-palette-primary'
    }
  }

  // Build holograms array using real constants - limit to available images (1-7)
  const holograms = [
    { value: STANDARD_HOLOGRAM, imageIndex: 0, disabled: false },
    ...TWITCH_HOLOGRAMS.slice(0, 3).map((label, index) => ({
      value: label,
      imageIndex: index + 1, // 2, 3, 4 for twitch-1, twitch-2, twitch-3
      disabled: !twitchTier || Number(twitchTier) < index + 1
      // disabled: false
    })),
    ...ACADEMIA_HOLOGRAMS.slice(0, 4).map((label, index) => ({
      value: label,
      imageIndex: 4 + index, // 5, 6, 7 for first 3 academia holograms
      disabled: index + 1 > getAcademyTierIndex(midudevTypeSub)
      // disabled: false
    }))
  ]

  return (
    <div>
      <h3 className='mb-4 text-sm font-medium tracking-wide text-palette-ghost'>HOLOGRÁFICO</h3>
      <div className='p-4 rounded-lg bg-palette-border-foreground'>
        <div className='grid grid-cols-6 gap-1'>
          {holograms.map((hologram) => {
            const isSelected = ticketDesign.hologram === hologram.value
            const {
              content: tooltipContent,
              className: tooltipClassName,
              arrowClassName
            } = getHologramTooltip(hologram.value, hologram.disabled)

            if (hologram.disabled) {
              return (
                <Tooltip
                  key={hologram.value}
                  text={tooltipContent}
                  tooltipPosition='top'
                  tooltipClassName={tooltipClassName}
                  arrowClassName={arrowClassName}
                >
                  <div className='relative'>
                    <Button
                      variant='ghost'
                      size='small'
                      className='flex items-center justify-center p-2 opacity-50 cursor-not-allowed aspect-square'
                      disabled={true}
                    >
                      {hologram.value === STANDARD_HOLOGRAM ? (
                        <div className='relative overflow-hidden border rounded-full size-6 border-palette-ghost after:h-px after:w-full after:-rotate-45 after:bg-palette-ghost after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'></div>
                      ) : (
                        <img
                          src={`/tickets/holograms/${hologram.imageIndex}.png`}
                          alt={`Holograma ${hologram.value}`}
                          className='object-cover rounded-full'
                          width='28'
                          height='28'
                        />
                      )}
                    </Button>
                    <LockIcon className='absolute top-0 -right-1 size-8 text-palette-ghost bg-palette-dark rounded-full p-0.5' />
                  </div>
                </Tooltip>
              )
            }

            return (
              <Tooltip
                key={hologram.value}
                text={tooltipContent}
                tooltipPosition='top'
                tooltipClassName={tooltipClassName}
                arrowClassName={arrowClassName}
              >
                <Button
                  variant={isSelected ? 'border' : 'ghost'}
                  size='small'
                  className={cn(
                    'aspect-square p-2 flex items-center justify-center',
                    isSelected && 'bg-palette-ghost/50 scale-[0.8]'
                  )}
                  onClick={async () =>
                    await handleChangeHologramAndSave(hologram.value as HologramOption)
                  }
                >
                  {hologram.value === STANDARD_HOLOGRAM ? (
                    <div
                      className={cn(
                        'relative size-[1.8rem] overflow-hidden border rounded-full border-palette-ghost after:h-px after:w-full after:-rotate-45 after:bg-palette-ghost after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 transition-transform duration-300',
                        isSelected && 'scale-[1.2] border-2 border-palette-default'
                      )}
                    ></div>
                  ) : (
                    <img
                      src={`/tickets/holograms/${hologram.imageIndex}.png`}
                      alt={`Holograma ${hologram.value}`}
                      className={cn(
                        'object-cover rounded-full transition-transform duration-300',
                        isSelected && 'border-2 border-palette-default scale-[1.2]'
                      )}
                      width='28'
                      height='28'
                    />
                  )}
                </Button>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </div>
  )
}
