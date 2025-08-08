import { Button } from '@/components/Button'
import { DiamondIcon } from '@/components/icons/diamond'
import { DotIcon } from '@/components/icons/dot'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { SponsorIcons } from '@/components/icons/sponsors'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import type { JSX } from 'react'

export const Sponsors = () => {
  return (
    <section id='sponsors' className='pt-44 grid lg:grid-cols-[1fr_auto] px-8 gap-8'>
      <div className='h-full'>
        <header className='flex flex-col gap-2 max-w-80 lg:col-[2/3] lg:row-[1/2] mt-8 sticky top-[80px] mx-auto'>
          <h2 className='flex items-center justify-center gap-4 text-4xl font-bold text-white uppercase'>
            <DotIcon className='text-palette-primary' /> Sponsors{' '}
            <DotIcon className='text-palette-primary' />
          </h2>
          <p className='mx-auto text-xl text-white text-pretty max-w-[42ch] text-center'>
            Gracias a ellos hacemos posible el evento
          </p>
          <Button
            as={Link}
            href='mailto:hi@midu.dev'
            containerClassName='w-full md:w-full'
            className='justify-center w-full md:w-full'
          >
            <EnterArrow className='hidden w-auto h-3 lg:block' />
            Ser Patrocinador
          </Button>
        </header>
      </div>

      <div className='lg:col-[1/2] lg:row-[1/2]'>
        <h3 className='flex items-center justify-center gap-2 mb-4 text-2xl font-bold text-white uppercase lg:justify-start'>
          <DiamondIcon className='w-auto h-4 text-yellow-200' />
          Premium
          <DiamondIcon className='w-auto h-4 text-yellow-200' />
        </h3>
        <div className='grid gap-5 lg:grid-cols-2'>
          {premiums.map((premium) => (
            <ReviewCard className='max-w-80' key={premium.name} {...premium} size='large' />
          ))}
        </div>

        {gold.length > 0 && (
          <>
            <h3 className='flex items-center justify-center gap-2 mt-12 mb-4 text-2xl font-bold text-white uppercase lg:justify-start'>
              <DotIcon className='w-auto h-4 text-palette-primary' />
              Gold
              <DotIcon className='w-auto h-4 text-palette-primary' />
            </h3>
            <div className='grid gap-5 lg:grid-cols-3'>
              {gold.map((sponsor) => (
                <ReviewCard key={sponsor.name} className='py-4' {...sponsor} />
              ))}
            </div>
          </>
        )}

        {normalSponsors.length > 0 && (
          <>
            <h3 className='flex items-center justify-center gap-2 mt-12 mb-4 text-2xl font-bold text-white uppercase lg:justify-start'>
              <DotIcon className='w-auto h-4 text-white' />
              Basic
              <DotIcon className='w-auto h-4 text-white' />
            </h3>
            <div className='grid gap-5 lg:grid-cols-4'>
              {normalSponsors.map((sponsor) => (
                <ReviewCard key={sponsor.name} className='py-4' {...sponsor} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const ReviewCard = ({
  logo,
  link,
  size,
  slogan,
  className = ''
}: {
  logo?: JSX.Element
  link: string
  size?: string
  slogan?: string
  className?: string
}) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'flex flex-col items-center justify-center gap-4 border rounded-md min-h-60 bg-palette-bg-foreground-primary border-palette-border-foreground',
        'hover:bg-palette-border-foreground hover:border-palette-ghost transition',
        'focus-visible:outline focus-visible:outline-white focus-visible:bg-palette-border-foreground focus-visible:border-palette-ghost'
      )}
    >
      <figure className={`${size === 'large' ? 'h-12' : 'h-8'} flex items-center justify-center`}>
        {logo}
      </figure>
      {slogan && (
        <p
          className={`${
            size === 'large' ? 'text-base' : 'text-sm'
          } text-center uppercase text-palette-ghost max-w-[36ch] text-balance leading-tight font-light mt-4`}
        >
          {slogan}
        </p>
      )}
    </a>
  )
}

export const premiums = [
  {
    name: 'Malt',
    link: 'https://malt.es/',
    logo: <SponsorIcons.malt className='w-auto h-12 text-white' />,
    slogan: 'Encuentra y contrata a los mejores freelancers en Malt'
  },
  {
    name: 'LemonCode',
    link: 'https://midu.link/lemoncode',
    logo: <SponsorIcons.lemonCodeVertical className='w-auto h-20' />,
    slogan: 'Formaciones con los mejores profesionales'
  },
  {
    name: 'Codely',
    link: 'https://codely.com/pro/midudev',
    logo: <SponsorIcons.codely className='w-auto h-16 max-w-full text-white' />,
    slogan: 'Codely enseña y entretiene'
  },
  {
    name: 'Ignia Cloud',
    link: 'https://www.ignia.cloud/',
    logo: <SponsorIcons.igniaCloud className='w-auto h-20' />,
    slogan: 'Confidencialidad, Integridad y Disponibilidad en un solo lugar'
  },
  {
    name: 'InfoJobs',
    link: 'https://www.infojobs.net/',
    logo: <SponsorIcons.infojobs className='w-auto h-14' />,
    slogan: 'Entra y encuentra el trabajo perfecto para ti'
  }
]

export const gold: Array<{
  name: string
  link: string
  logo: React.ReactElement
}> = []

export const normalSponsors = [
  {
    name: 'Plain Concepts',
    link: 'https://www.plainconcepts.com/',
    logo: <SponsorIcons.plainConcepts className='w-auto h-12 max-w-full text-white' />
  }
]
