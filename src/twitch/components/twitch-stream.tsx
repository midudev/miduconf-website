import { Button } from '@/components/Button'
import { CrossIcon } from '@/components/icons/cross'
import { DotIcon } from '@/components/icons/dot'
import { useTwitchOnline } from '@/hooks/use-twitch-online'
import { useState } from 'react'

interface Props {
  hide?: boolean;
}

export default function TwitchStream({ hide = false }: Props) {
  const [open, setOpen] = useState(true)
  const online = useTwitchOnline()

  if (!online || hide) return <div></div>

  const { hostname } = document.location

  if (!open) return null

  return (
    <article className='fixed z-50 p-2 border shadow-2xl animate-fade-in-down bg-palette-bg-foreground-primary border-palette-border-foreground rounded-xl top-20 right-2 animation-twitch'>
      <header className='flex items-center justify-between pb-2 gap-x-2 gap-y-1'>
        <div className='flex items-center px-1 gap-x-2'>
          <DotIcon className='w-auto h-3 text-red-500' />
          <p className='pb-0 text-base uppercase'>En vivo</p>
        </div>
        <Button
          onClick={() => setOpen(false)}
          containerClassName='w-6 h-6 p-0 aspect-squere inline-flex items-center justify-center'
          className='inline-flex items-center justify-center w-6 h-6 p-0 text-xs transition rounded-lg aspect-square bg-palette-primary'
        >
          <CrossIcon className='w-3 h-3' />
        </Button>
      </header>
      <iframe
        src={`https://player.twitch.tv/?channel=midudev&parent=${hostname}`}
        frameBorder='0'
        width='320'
        className='rounded-md aspect-video'
        allowFullScreen={true}
        scrolling='no'
      ></iframe>
      <p className='flex items-center justify-center max-w-full gap-2 pt-2 text-sm text-center text-pretty text-violet-100'>
        ¡Estamos en directo!
        <a
          href='https://twitch.tv/midudev'
          className='underline text-violet-200'
          rel='noopener nofollow noreferrer'
          target='_blank'
        >
          ¿Quieres unirte?
        </a>
      </p>
    </article>
  )
}

