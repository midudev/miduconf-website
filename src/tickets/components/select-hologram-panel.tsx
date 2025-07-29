import { Button } from '@/components/Button'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PERSONALIZE_TIKET_OPTIONS } from '../constants/personalize-ticket-options'
import { Tooltip } from '@/components/Tooltip'
import { LockIcon } from '@/components/icons/lock'
import { getTwitchAuthorizeUrl } from '@/twitch/utils/get-twitch-authorize-url'
import { TwitchIcon } from '@/components/icons/twitch'

interface Props {
  handleChangeHologram: (option: HologramOption) => void
  ticketDesign: TicketDesign
  twitchTier: '1' | '2' | '3' | null
}

export const SelectHologramPanel = ({ ticketDesign, twitchTier, handleChangeHologram }: Props) => {
  const STANDARD_HOLOGRAM = PERSONALIZE_TIKET_OPTIONS.HOLOGRAM.STANDARD
  const TWITCH_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
    label.startsWith('twitch')
  )
  const ACADEMIA_HOLOGRAMS = Object.values(PERSONALIZE_TIKET_OPTIONS.HOLOGRAM).filter((label) =>
    label.startsWith('academia')
  )

  return (
    <article className='pt-6'>
      <h3 className='ml-1 text-xs uppercase text-pallet-ghost'>Holográficos</h3>
      <div className='mt-2 rounded-md bg-pallet-ghost/10'>
        <span className='text-[10px] uppercase text-pallet-ghost px-4 py-2 block'>Por defecto</span>
        <ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
          <li>
            <Button
              title={`Aplicar Holograma Standard`}
              containerClassName='bg-pallet-ghost/10'
              aria-label='Aplicar estructura circular'
              className='px-1 py-1 text-sm duration-300 aspect-square'
              onClick={() => handleChangeHologram(STANDARD_HOLOGRAM)}
              variant={ticketDesign.hologram === STANDARD_HOLOGRAM ? 'border' : 'ghost'}
            >
              <div className='relative w-6 h-6 overflow-hidden border rounded-full border-pallet-ghost after:h-px after:w-full after:-rotate-45 after:bg-pallet-ghost after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'></div>
            </Button>
          </li>
        </ul>
      </div>
      <div className='relative mt-2 rounded-md bg-pallet-ghost/10'>
        <span className='text-[10px] uppercase text-pallet-ghost block px-4 py-2'>
          Especiales de Twitch
        </span>
        <ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
          {TWITCH_HOLOGRAMS.map((label, index) => (
            <li key={label}>
              {index + 1 > Number(twitchTier ?? 0) ? (
                <LockTwitchButton currentTier={twitchTier} tierNumber={index + 1} />
              ) : (
                <Button
                  title={`Aplicar ${label} Holograma`}
                  containerClassName='bg-pallet-ghost/10'
                  aria-label='Aplicar estructura circular'
                  className='px-1 py-1 text-sm duration-300 aspect-square'
                  onClick={() => handleChangeHologram(label)}
                  variant={ticketDesign.hologram === label ? 'border' : 'ghost'}
                >
                  <img
                    src={`/tickets/holograms/${index + 1}.png`}
                    alt={`Representación del ${label} Holograma`}
                    className='w-6 h-6 rounded-full'
                    width='30'
                    height='30'
                  />
                </Button>
              )}
            </li>
          ))}
        </ul>
        <a
          href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
          target='_blank'
          className='relative flex items-center text-[10px] uppercase w-full justify-center px-4 py-1 bg-pallet-ghost/20 gap-2 hover:bg-pallet-ghost/40 transition rounded-b-md'
        >
          <TwitchIcon className='w-auto h-3' />
          Desbloquear
        </a>
      </div>
      <div className='mt-2 rounded-md bg-pallet-ghost/10'>
        <span className='ml-0.5 text-[10px] uppercase text-pallet-ghost px-4 py-2 block'>
          Especiales de midu.dev
        </span>
        <ul className='flex flex-wrap items-center gap-4 px-4 pb-3'>
          {ACADEMIA_HOLOGRAMS.map((label, index) => (
            <li key={label}>
              {TWITCH_HOLOGRAMS.length + 1 > Number(twitchTier ?? 0) ? (
                <LockTwitchButton currentTier={twitchTier} tierNumber={index + 1} />
              ) : (
                <Button
                  title={`Aplicar ${label} Holograma`}
                  containerClassName='bg-pallet-ghost/10'
                  aria-label='Aplicar estructura circular'
                  className='px-1 py-1 text-sm duration-300 aspect-square'
                  onClick={() => handleChangeHologram(label)}
                  variant={ticketDesign.hologram === label ? 'border' : 'ghost'}
                >
                  <img
                    src={`/tickets/holograms/${TWITCH_HOLOGRAMS.length + index + 1}.png`}
                    alt={`Representación del ${label} Holograma`}
                    className='w-6 h-6 rounded-full'
                    width='30'
                    height='30'
                  />
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function LockTwitchButton({
  tierNumber,
  currentTier
}: {
  tierNumber: number
  currentTier: '1' | '2' | '3' | null
}) {
  return (
    <Tooltip text={`Desbloquear con Tier ${tierNumber} de Twitch`} tooltipPosition='top'>
      <div className='relative flex items-center gap-1 cursor-not-allowed'>
        <LockIcon className='absolute w-auto h-6 -translate-x-1/2 -translate-y-1/2 text-pallet-ghost left-1/2 top-1/2' />
        <div className='relative p-1 text-xs border rounded-md opacity-20 bg-pallet-ghost/20 aspect-square border-pallet-ghost'>
          <img
            src={`/tickets/holograms/${tierNumber}.png`}
            alt={`Representación del Holograma`}
            className='w-6 h-6 rounded-full'
            width='30'
            height='30'
          />
        </div>
      </div>
    </Tooltip>
  )
}
