import { useRemainingTime } from '@/hooks/useRemainingTime'
import { Clock } from './icons/clock'
import { Plus } from './icons/plus'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
gsap.registerPlugin(ScrollTrigger)

export const ScrollCountdown = ({ scrollClockRef }) => {
  const [mounted, setMounted] = useState(false)
  const { seconds, minutes, hours, days } = useRemainingTime(new Date(1757512800000), {
    fillingZeros: true
  })
  const [isCounterClosed, setIsCounterClosed] = useState(false)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    if (isCounterClosed) return

    let tl = gsap.timeline({ defaults: { ease: 'elastic.out(1.2, 0.7)', duration: 0.7 } })

    // Crear el ScrollTrigger
    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: '#lo-que-puedes-esperar',
      start: '100vh top',
      end: 'top bottom',
      // markers: true,
      onEnter: () => {
        tl.to('.counter-scroll', {
          x: 20
        })
      },
      onLeaveBack: () => {
        tl.to('.counter-scroll', {
          x: '-110%'
        })
      }
    })

    // Cleanup al desmontar el componente
    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill()
      }
    }
  }, [isCounterClosed])

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseEnter = () => {
      gsap.to(button.querySelector('svg'), {
        scale: 0.9,
        rotation: -45,
        duration: 0.5,
        ease: 'elastic.out(1.0, 0.7)'
      })
      gsap.to(button, {
        scale: 0.9,
        duration: 0.6,
        ease: 'elastic.out(1.0, 0.7)'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button.querySelector('svg'), {
        scale: 1.0,
        rotation: 45,
        duration: 0.5,
        ease: 'elastic.out(1.0, 0.7)'
      })
      gsap.to(button, {
        scale: 1.0,
        duration: 0.5,
        ease: 'elastic.out(1.0, 0.7)'
      })
    }

    const handleClick = () => {
      setIsCounterClosed(true)
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill()
        scrollTriggerInstance.current = null
      }
      gsap.to('.counter-scroll', {
        x: -300,
        ease: 'elastic.out(1.2, 0.7)',
        duration: 1.0
      })
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className='counter-scroll hidden lg:block p-spacing-8 bg-palette-bg-foreground-primary border border-palette-border-foreground rounded-[5px] text-xl-code space-y-spacing-16 fixed -translate-x-full z-10 left-0 top-spacing-96 w-full max-w-[290px]'>
      <header className='flex justify-between counter-scroll-header'>
        <span className='flex items-center gap-spacing-8'>
          <Clock ref={scrollClockRef} className='clock size-[18px]' />
          <span className='text-body-code'>Empezamos en:</span>
        </span>
        <button
          ref={buttonRef}
          className='counter-scroll-button bg-palette-bg-foreground-secondary size-5 flex justify-center items-center rounded-[3px] hover:cursor-pointer'
        >
          <Plus className='rotate-45 size-4' />
        </button>
      </header>

      <footer className='flex items-center justify-between counter-scroll-footer'>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-days'>{mounted ? days : '00'}</span>
          <span className='counter-date-scroll text-palette-ghost'>days</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-hours'>{mounted ? hours : '00'}</span>
          <span className='counter-date-scroll text-palette-ghost'>hrs</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-minutes'>{mounted ? minutes : '00'}</span>
          <span className='counter-date-scroll text-palette-ghost'>min</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-seconds'>{mounted ? seconds : '00'}</span>
          <span className='counter-date-scroll text-palette-ghost'>sec</span>
        </div>
      </footer>
    </div>
  )
}
