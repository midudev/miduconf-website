import { useSupabaseSignInByGitHub } from '@/auth/hooks/use-supabase-signin-by-github'
import { Button } from '@/components/Button'
import { Countdown } from '@/components/Countdown'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface Props {
  userData?: User
}

export function Hero({ userData }: Props) {
  const { signin } = useSupabaseSignInByGitHub()

  return (
    <section
      className='bg-[url(/global/bg.png)] min-h-screen bg-cover bg-center image-pixelated relative border-b border-pallet-primary/20'
      role='banner'
      aria-labelledby='hero-title'
    >
      <div className='absolute bottom-0 left-0 flex flex-col items-center justify-between w-full px-8 py-16 md:items-end md:flex-row gap-y-4 bg-gradient-to-t from-black md:bg-none animate-fade-in-up'>
        <div className='flex flex-col items-center md:items-start'>
          <Countdown className='mb-4' />
          <h1
            id='hero-title'
            className='text-4xl text-center md:text-left md:text-6xl uppercase leading-normal font-medium max-w-[24ch] text-white text-balance'
          >
            La nueva era de la Programación
          </h1>
        </div>
        <div className='flex flex-col gap-6'>
          <p className='text-center md:text-left text-xl max-w-[32ch] text-white text-pretty'>
            Conferencia de Programación y Desarrollo en Español en{' '}
            <Link
              href='https://www.twitch.tv/midudev'
              className='underline text-violet-100 hover:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-black'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Visitar el canal de Twitch de midudev (se abre en nueva ventana)'
            >
              Twitch
            </Link>
          </p>
          {userData ? (
            <div className='flex flex-wrap items-center gap-2'>
              <Button as={Link} href='/ticket'>
                <EnterArrow className='hidden md:block' />
                Ver tu Ticket
              </Button>
              {userData.user_metadata.avatar_url && (
                <img
                  className='object-cover w-12 h-12 rounded aspect-square'
                  width='60'
                  height='60'
                  src={userData.user_metadata.avatar_url}
                  alt={`Avatar de ${
                    userData.user_metadata.name ?? userData.user_metadata.full_name ?? 'tu usuario'
                  }`}
                />
              )}
            </div>
          ) : (
            <Button onClick={signin}>
              <EnterArrow className='hidden md:block' />
              Consigue tu Ticket
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
