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
      {/* <ul
          className={cn(
            'grid justify-center grid-cols-2 px-5 mx-auto gap-x-4 gap-y-4 md:px-0 md:grid-cols-3 md:gap-y-24',
            SPEAKERS.length === 0 && '[mask-image:linear-gradient(to_bottom,#000,_transparent)]'
          )}
        >
          {SPEAKERS.length > 0 &&
            SPEAKERS.map(({ img, name, title, isPlaceholder }, index) => {
              return (
                <li
                  key={`${name}-${index}`}
                  className={cn(
                    'max-w-80 w-full mx-auto relative',
                    (index - 1) % 3 === 0
                      ? 'animation-speaker-peer md:translate-y-16'
                      : 'animation-speaker',
                    (index - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0',
                    isPlaceholder && 'blur'
                  )}
                >
                  <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md'>
                    <img
                      src={`/speakers/${img}.webp`}
                      className='object-cover w-full h-full'
                      alt={`Retrato de ${name}`}
                    />
                    <p className='absolute inline-flex items-center gap-2 px-2 py-1 mr-2 text-xs text-white uppercase border rounded-md md:text-base bg-palette-bg-foreground-primary border-palette-border-foreground bottom-2 left-2'>
                      <DiamondIcon className='w-3 h-auto md:w-4 text-palette-primary' /> {name}
                    </p>
                  </div>
                  <p className='pl-2 mt-2 text-xs uppercase md:mt-6 text-palette-ghost text-balance md:text-base'>
                    {title}
                  </p>
                </li>
              )
            })}
          <li
            className={cn(
              'max-w-80 w-full mx-auto relative [mask-image:linear-gradient(to_bottom,#000,_transparent)] hidden: md:block',
              (SPEAKERS.length - 1) % 3 === 0
                ? 'animation-speaker-peer md:translate-y-16'
                : 'animation-speaker',
              (SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
            )}
          >
            <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
          </li>
          <li
            className={cn(
              'max-w-80 w-full mx-auto relative [mask-image:linear-gradient(to_bottom,#000,_transparent)] hidden: md:block',
              (SPEAKERS.length - 1) % 3 === 0
                ? 'animation-speaker-peer md:translate-y-16'
                : 'animation-speaker',
              (SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
            )}
          >
            <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
          </li>
          <li
            className={cn(
              'max-w-80 w-full mx-auto relative block',
              (SPEAKERS.length - 1) % 3 === 0
                ? 'animation-speaker-peer md:translate-y-16'
                : 'animation-speaker',
              (SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
            )}
          >
            <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground md:hidden'>
              <p className='text-xs md:text-xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center md:gap-2 z-10'>
                <DiamondIcon className='w-4 h-auto md:w-8' />
                ¡Muy pronto revelaremos más speakers!
                <DiamondIcon className='w-4 h-auto md:w-8' />
              </p>
            </div>
          </li>
        </ul> */}
      {/* <div className='relative hidden md:block'>
          <p className='text-4xl text-wrap text-center max-w-[24ch] text-white mx-auto px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase font-bold flex items-center gap-2 z-10'>
            <DiamondIcon className='w-8 h-auto' />
            ¡Muy pronto revelaremos más Speakers!
            <DiamondIcon className='w-8 h-auto' />
          </p>
          <ul className='grid justify-center grid-cols-2 px-4 mx-auto gap-x-4 gap-y-4 md:px-0 md:grid-cols-3 md:gap-y-24 [mask-image:linear-gradient(to_bottom,#000,_transparent)]'>
            <li
              className={cn(
                'max-w-80 w-full mx-auto relative',
                (SPEAKERS.length - 1) % 3 === 0
                  ? 'animation-speaker-peer md:translate-y-16'
                  : 'animation-speaker',
                (SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
              )}
            >
              <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
            </li>
            <li
              className={cn(
                'max-w-80 w-full mx-auto relative',
                (SPEAKERS.length - 1) % 3 !== 0
                  ? 'animation-speaker-peer md:translate-y-16'
                  : 'animation-speaker',
                (SPEAKERS.length - 1) % 2 !== 0 && 'translate-y-16 md:translate-y-0'
              )}
            >
              <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
            </li>
            <li
              className={cn(
                'max-w-80 w-full mx-auto relative',
                (SPEAKERS.length - 1) % 3 === 0
                  ? 'animation-speaker-peer md:translate-y-16'
                  : 'animation-speaker',
                (SPEAKERS.length - 1) % 2 === 0 && 'translate-y-16 md:translate-y-0'
              )}
            >
              <div className='relative aspect-[9/12] overflow-hidden w-full rounded-md bg-palette-border-foreground'></div>
            </li>
          </ul>
        </div> */}
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
  }
  /* {
		name: 'Guillermo Rauch',
		title: 'CEO @ Vercel',
		twitter: 'rauchg',
		img: 'rauchg',
		country: '🇦🇷'
	},
	{
		name: 'Carmen Ansio',
		title: 'Design Engineer @ LottieFiles',
		twitter: 'carmenansio',
		img: 'carmen',
		country: '🇪🇸'
	},
	{
		name: 'DotCSV',
		title: 'Divulgador de IA',
		twitter: 'dotcsv',
		img: 'dotcsv',
		country: '🇮🇨'
	},
	{
		name: 'Alba Silvente',
		title: 'FullStack @ StoryBlok',
		twitter: 'dawntraoz',
		img: 'dawntraoz',
		country: '🇪🇸'
	},
	{
		name: 'Pelado Nerd',
		title: 'Divulgador DevOps',
		twitter: 'pablokbs',
		img: 'pablokbs',
		country: '🇦🇷'
	},
	{
		name: 'Fazt',
		title: 'Creador de contenido',
		twitter: 'FaztTech',
		img: 'fazt',
		country: '🇵🇪'
	},
	{
		name: 'Estefany Aguilar',
		title: 'Sr. Frontend Dev @ Platzi',
		twitter: 'teffcode',
		img: 'teffcode',
		country: '🇨🇴'
	},
	{
		name: 'S4vitar',
		title: 'Hack4u CEO & Founder',
		twitter: 's4vitar',
		img: 's4vitar',
		country: '🇪🇸'
	},
	{
		name: 'Freddy Vega',
		title: 'CEO @ Platzi',
		twitter: 'freddier',
		img: 'freddyVega',
		country: '🇨🇴'
	},
	{
		name: 'PatoDev',
		title: 'Media Developer @ Cloudinary',
		twitter: 'devpato',
		img: 'patoDev',
		country: '🇺🇸'
	},
	{
		name: 'Grimerloner',
		title: 'Músico y Productor',
		instagram: 'grimerloner',
		img: 'grimerloner',
		country: '🇪🇸'
	},
	{
		name: 'Fernando Rodríguez',
		title: 'Co-Founder @ KeepCoding',
		twitter: 'frr149',
		img: 'fernando-rodriguez',
		country: '🇪🇸'
	},
	{
		name: 'Javier Ferrer',
		title: 'Co-Founder @ Codely',
		twitter: 'CodelyTV',
		img: 'javi',
		country: '🇪🇸'
	},
	{
		name: 'Rafa Gomez',
		title: 'Co-Founder @ Codely',
		twitter: 'CodelyTV',
		img: 'rafa',
		country: '🇪🇸'
	} */
]

const FAKE_SPEAKERS = [
  {
    name: 'Nadie Sabe',
    title: 'Quien es el/ella',
    twitter: 'notiene',
    fakeImg: '/speakers/speaker-01.webp',
    country: '🇪🇸'
  },
  {
    name: 'Nadie Sabe',
    title: 'Quien es el/ella',
    twitter: 'notiene',
    fakeImg: '/speakers/speaker-02.webp',
    country: '🇪🇸'
  },
  {
    name: 'Nadie Sabe',
    title: 'Quien es el/ella',
    twitter: 'notiene',
    fakeImg: '/speakers/speaker-03.webp',
    country: '🇪🇸'
  }
]
