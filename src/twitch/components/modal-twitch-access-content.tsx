import { Button } from '@/components/Button'
import { TwitchIcon } from '@/components/icons/twitch'
import { cn } from '@/lib/utils'

interface Props {
  tierNumber: number | null
  handleCloseModal: () => void
}

export const ModalTwitchAccessContent = ({ tierNumber, handleCloseModal }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 text-balance'>
      <header className='w-full px-4 py-4 border-b border-pallet-border-foreground bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] flex items-center justify-center gap-2'>
        <TwitchIcon className='w-auto h-5 text-white' />
        <p className='text-lg font-bold text-white uppercase'>| Twitch</p>
      </header>
      <div className='px-4 py-6'>
        <p className='mb-4 text-lg font-semibold text-center text-white uppercase max-w-[24ch] mx-auto'>
          ¡Nueva personalización desbloqueada!
        </p>
        <div className='flex items-center justify-center gap-2 px-4 py-2 mx-auto text-white uppercase bg-pallet-ghost/20 w-max'>
          {Array(tierNumber)
            .fill(null)
            .map((_, index) => {
              return (
                <img
                  key={`hologram-${index + 1}`}
                  src={`/tickets/holograms/${index + 1}.png`}
                  alt={`Representación del Holograma`}
                  className={cn(
                    'w-6 h-6  border rounded-full border-pallet-border-foreground',
                    index >= 1 && '-ml-4'
                  )}
                  width='30'
                  height='30'
                />
              )
            })}
          {tierNumber! > 1 ? (
            <span>{tierNumber} hologramas</span>
          ) : (
            <span>{tierNumber} holograma</span>
          )}
        </div>
        <p className='mt-4 text-center text-white/80 max-w-[40ch] text-pretty mx-auto'>
          Has conseguido el contenido especial de <strong>nivel {tierNumber} de Twitch</strong>
        </p>
        <Button
          onClick={handleCloseModal}
          containerClassName='mx-auto mt-4 flex'
          className='px-4 py-1 mx-auto text-sm'
        >
          Personalizar
        </Button>
      </div>
    </div>
  )
}
