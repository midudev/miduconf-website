import { JSX, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface Sponsor {
  name?: string
  logo?: JSX.Element
  link?: string
  slogan?: string
}

export const Sponsor = ({ sponsor, level }: { sponsor: Sponsor; level: string }) => {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // funcion para crear el efecto hacker simulado dithering
  const bitmapScramble = (element: HTMLElement, finalText: string) => {
    const bitmapChars = ['█', '▓', '▒', '░', '▄', '▀']
    let progress = 0
    const totalSteps = 12

    const interval = setInterval(() => {
      const revealPoint = (progress / totalSteps) * finalText.length

      const scrambled = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '

          if (index < revealPoint) {
            return char
          } else {
            return bitmapChars[Math.floor(Math.random() * bitmapChars.length)]
          }
        })
        .join('')

      element.textContent = scrambled
      progress++

      if (progress > totalSteps) {
        element.textContent = finalText
        clearInterval(interval)
      }
    }, 45)
  }

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current
    const description = descriptionRef.current

    if (!container || !logo || !description) return

    const match = window.matchMedia('(max-width: 1024px)')

    let handleMouseEnter: (() => void) | null = null
    let handleMouseLeave: (() => void) | null = null

    const sponsorAnimation = (isEnter: boolean) => {
      if (!logo || !description) return

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'elastic.out(1, 0.75)' }
      })

      if (isEnter) {
        tl.to(logo, { y: -40 }).to(
          description,
          {
            autoAlpha: 1,
            y: 24,
            onStart: () => {
              if (sponsor.slogan) {
                bitmapScramble(description, sponsor.slogan)
              }
            }
          },
          '-=0.55'
        )
      } else {
        tl.to(description, { autoAlpha: 0, y: 64 }).to(logo, { y: 0 }, '-=0.55')
      }

      // Guardar la referencia del timeline actual
      timelineRef.current = tl
    }

    const setupDesktopAnimations = () => {
      // Remover listeners existentes si hay
      if (handleMouseEnter && handleMouseLeave) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }

      // Crear nuevos handlers
      handleMouseEnter = () => sponsorAnimation(true)
      handleMouseLeave = () => sponsorAnimation(false)

      // Agregar listeners
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }
    const teardownAnimations = () => {
      if (handleMouseEnter && handleMouseLeave && container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }

      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      // Limpiar propiedades CSS
      gsap.set([logo, description], { clearProps: 'all' })
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      teardownAnimations()
      // En desktop configurar animaciones
      if (!e.matches) setupDesktopAnimations()
      // En mobile o tablet no hacer nada porque ya se limpiaron las animaciones
    }
    // configuracion inicial
    if (!match.matches) {
      setupDesktopAnimations()
    }

    // Escuchar cambios en media query
    match.addEventListener('change', handleMediaChange)

    // limpiar funcion
    return () => {
      match.removeEventListener('change', handleMediaChange)
      teardownAnimations()
      handleMouseEnter = null
      handleMouseLeave = null
      timelineRef.current = null
    }
  }, [sponsor.slogan])

  if (!sponsor.link) return null

  return (
    <a
      ref={containerRef}
      href={sponsor.link}
      target='_blank'
      rel='noopener noreferrer'
      className='h-[clamp(194px,17vw,574px)] relative flex flex-col gap-spacing-24 items-center justify-center rounded-[5px] bg-palette-bg-foreground-primary border border-palette-border-foreground focus-visible:outline focus-visible:outline-palette-default focus-visible:bg-palette-border-foreground focus-visible:border-palette-ghost'
    >
      {sponsor.logo && (
        <span className='flex items-center justify-center' ref={logoRef}>
          {sponsor.logo}
        </span>
      )}
      {sponsor.slogan && (
        <p
          className={cn(
            'text-center text-palette-ghost w-[300px] lg:w-[400px] text-balance leading-tight text-body-code lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:translate-y-spacing-64 lg:opacity-0',
            level === 'pro' && 'scale-75 md:scale-95'
          )}
          ref={descriptionRef}
        >
          {sponsor.slogan}
        </p>
      )}
    </a>
  )
}
