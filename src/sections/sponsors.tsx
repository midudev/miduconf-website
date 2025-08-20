// import { CallToAction } from '@/components/CallToAction'
// import { EnterArrow } from '@/components/icons/enter-arrow'
import { SponsorIcons } from '@/components/icons/sponsors'
import { ReviewCard } from '@/components/ReviewCard'
import { Title } from '@/components/Title'

export const Sponsors = () => {
  return (
    <section
      id='sponsors'
      className='relative pt-spacing-180 lg:grid lg:grid-cols-[0.30fr_1fr] lg:gap-spacing-64 px-5'
    >
      <div className='h-full'>
        <header className='flex flex-col lg:sticky lg:top-[80px] lg:items-start'>
          <Title>Sponsors</Title>
          <p className='w-[350px] lg:w-full mx-auto text-center lg:ml-0 text-xl-medium text-pretty lg:text-left pt-spacing-32 pb-spacing-40 text-palette-ghost'>
            Gracias a nuestros <span className='word-highlight'>sponsors</span> que hacen posible{' '}
            <span className='word-highlight'>este evento</span>
          </p>
          {/* <CallToAction
            text='Ser patrocinador'
            href='mailto:hi@midu.dev'
            estilo='default'
            IconComponent={EnterArrow}
            className='mx-auto lg:ml-0'
          /> */}
        </header>
      </div>

      <div className='mt-spacing-64 lg:mt-0 space-y-spacing-40'>
        {sponsors.map(({ level, sponsors }) => (
          <ReviewCard key={level} level={level} sponsors={sponsors} />
        ))}
      </div>
    </section>
  )
}

const sponsors = [
  {
    level: 'diamond',
    sponsors: [
      {
        name: 'Malt',
        link: 'https://malt.es/',
        logo: <SponsorIcons.malt className='clamp-sponsor' />,
        slogan: 'Encuentra y contrata a los mejores freelancers en Malt'
      },
      {
        name: 'LemonCode',
        link: 'https://midu.link/lemoncode',
        logo: <SponsorIcons.lemonCodeVertical className='clamp-sponsor' />,
        slogan: 'Formaciones con los mejores profesionales'
      },
      {
        name: 'Codely',
        link: 'https://codely.com/pro/midudev',
        logo: <SponsorIcons.codely className='clamp-sponsor md:w-auto md:h-16' />,
        slogan: 'Codely enseña y entretiene'
      },
      {
        name: 'Ignia Cloud',
        link: 'https://www.ignia.cloud/',
        logo: <SponsorIcons.igniaCloud className='clamp-sponsor' />,
        slogan: 'Confidencialidad, Integridad y Disponibilidad en un solo lugar'
      },
      {
        name: 'InfoJobs',
        link: 'https://www.infojobs.net/',
        logo: <SponsorIcons.infojobs className='clamp-sponsor md:h-14' />,
        slogan: 'Entra y encuentra el trabajo perfecto para ti'
      },
      {
        name: 'Windsurf',
        link: 'https://www.windsurf.com/',
        logo: <SponsorIcons.windsurf className='clamp-sponsor md:w-auto md:h-32' />,
        slogan: 'El mejor editor de código con IA'
      }
    ]
  },
  {
    level: 'premium',
    sponsors: []
  },
  {
    level: 'pro',
    sponsors: [
      {
        name: 'Plain Concepts',
        link: 'https://www.plainconcepts.com/',
        logo: <SponsorIcons.plainConcepts className='clamp-sponsor md:h-14 md:w-auto' />,
        slogan: 'Impulsamos la transformación digital de empresas'
      },
      {
        name: 'Don Dominio',
        link: 'https://www.dondominio.com/es/',
        logo: <SponsorIcons.donDominio className='clamp-sponsor md:h-6 md:w-auto' />,
        slogan: 'Donde tu web se hace realidad'
      }
    ]
  }
]
