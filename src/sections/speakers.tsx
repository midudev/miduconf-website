import { Title } from '@/components/Title'
import dynamic from 'next/dynamic'

const Speaker = dynamic(() => import('@/components/Speaker').then(mod => ({ default: mod.Speaker })), {
  ssr: false,
  loading: () => <div className="w-full md:min-w-[336px] md:max-w-[356px] 2xl:max-w-[536px] mx-auto aspect-[534/684] bg-palette-border-foreground rounded-[5px] animate-pulse" />
})

export function Speakers() {
  type SpeakerType = {
    name: string
    title: string
    twitter: string
    img: string
    isPlaceholder: boolean
  }

  const listA: SpeakerType[] = []
  const listB: SpeakerType[] = []
  const listC: SpeakerType[] = []

  for (const speaker of SPEAKERS as SpeakerType[]) {
    if (listA.length > listC.length) {
      listC.push(speaker)
    } else if (listA.length === listC.length && listB.length < listA.length) {
      listB.push(speaker)
    } else {
      listA.push(speaker)
    }
  }
  return (
    <section id='speakers' className='pt-spacing-180 px-5'>
      <Title>Speakers</Title>
      <p className='mx-auto mt-spacing-32 text-xl text-palette-ghost text-pretty max-w-[400px] text-center'>
        <span className='word-highlight'>Creadores y líderes</span> que acercan la <span className='word-highlight'>tecnología</span> y el <span className='word-highlight'>código</span> a todos
      </p>
      <ul className='space-y-spacing-40 md:space-y-0 mt-spacing-64 gap-[40px] md:grid md:grid-cols-2 lg:hidden'>
        {SPEAKERS.length > 0 &&
          SPEAKERS.map(({ img, name, title, isPlaceholder }, index) => {
            return (
              <Speaker
                key={`${name}-${index}`}
                img={img}
                name={name}
                title={title}
                isPlaceholder={isPlaceholder}
              />
            )
          })}
      </ul>

      <ul className='pt-spacing-64 space-y-spacing-40 hidden lg:grid lg:grid-cols-3 md:gap-[80px]'>
        <div className='space-y-spacing-96 2xl:pt-0'>
          {SPEAKERS.length > 0 &&
            listA.map(({ img, name, title, isPlaceholder }, index) => {
              return (
                <Speaker
                  key={`${name}-${index}`}
                  img={img}
                  name={name}
                  title={title}
                  isPlaceholder={isPlaceholder}
                />
              )
            })}
        </div>

        <div className='space-y-spacing-96 pt-spacing-96 !mt-0'>
          {SPEAKERS.length > 0 &&
            listB.map(({ img, name, title, isPlaceholder }, index) => {
              return (
                <Speaker
                  key={`${name}-${index}`}
                  img={img}
                  name={name}
                  title={title}
                  isPlaceholder={isPlaceholder}
                />
              )
            })}
        </div>

        <div className='space-y-spacing-96 !mt-0'>
          {SPEAKERS.length > 0 &&
            listC.map(({ img, name, title, isPlaceholder }, index) => {
              return (
                <Speaker
                  key={`${name}-${index}`}
                  img={img}
                  name={name}
                  title={title}
                  isPlaceholder={isPlaceholder}
                />
              )
            })}
        </div>
      </ul>
    </section>
  )
}

const SPEAKERS = [
  {
    name: 'Miguel Ángel Durán',
    title: 'Creador de contenido y divulgador @ midudev',
    twitter: 'midudev',
    img: 'midudev',
    isPlaceholder: false
  },
  {
    name: 'Guillermo Rauch',
    title: 'CEO @ Vercel',
    twitter: 'rauchg',
    img: 'guillermo-rauch',
    isPlaceholder: false
  },
  {
    name: 'Darwinglish',
    title: 'Darwinglish @ Inglés para Devs',
    twitter: 'darwinglish',
    img: 'darwinglish',
    isPlaceholder: false
  },
  {
    name: 'Theo Browne',
    title: 'CEO @ T3 Chat',
    twitter: 'theo',
    img: 'theo',
    isPlaceholder: false
  },
  {
    name: 'Alba Silvente',
    title: 'Full Stack @ Storyblok',
    twitter: 'dawntraoz',
    img: 'alba-silvente',
    isPlaceholder: false
  },
  {
    name: 'Gisela Torres',
    title: 'Senior Global Blackbelt @ Microsoft',
    twitter: '0gis0',
    img: 'gisela-torres',
    isPlaceholder: false
  },
  {
    name: 'Chema Alonso',
    title: 'Vice President @ Cloudflare',
    twitter: '0gis0',
    img: 'chema-alonso',
    isPlaceholder: false
  },
	{
		name: 'Carlos Santana',
		title: 'Divulgador de IA',
		twitter: 'DotCSV',
		img: 'dotcsv',
		isPlaceholder: false
	}
]
