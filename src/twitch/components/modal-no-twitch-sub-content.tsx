import { Button } from '@/components/Button'
import { TwitchIcon } from '@/components/icons/twitch'

export const ModalNoTwitchSubContent = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 text-balance'>
      <header className='w-full px-4 py-4 border-b border-palette-border-foreground bg-gradient-to-tr from-[#1f1f25] via-[#101015] to-[#1f1f25] flex items-center justify-center gap-2'>
        <TwitchIcon className='w-auto h-5 text-white' />
        <p className='text-lg font-bold text-white uppercase'>| Twitch</p>
      </header>
      <div className='px-4 py-6'>
        <p className='mb-4 text-lg font-semibold text-center text-white uppercase max-w-[24ch] mx-auto'>
          No eres suscriptor de midudev en twitch
        </p>
        <p className='mt-4 text-center text-white/80 max-w-[40ch] text-pretty mx-auto'>
          Para poder personalizar tu Ticket, debes ser suscriptor o alumno en midu.dev
        </p>
        <Button
          as='a'
          href='https://www.twitch.tv/subs/midudev'
          target='_blank'
          containerClassName='mx-auto mt-4 flex'
          className='px-4 py-1 mx-auto text-sm'
        >
          Suscribirse en Twitch
        </Button>
      </div>
    </div>
  )
}
