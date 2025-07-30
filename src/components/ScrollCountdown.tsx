'use client'
import { useRemainingTime } from '@/hooks/useRemainingTime'
import { Clock } from './icons/clock'
import { Plus } from './icons/plus'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
gsap.registerPlugin(ScrollTrigger)

export const ScrollCountdown = () => {
  const [mounted, setMounted] = useState(false)
  const { seconds, minutes, hours, days } = useRemainingTime(new Date(1757512800000), {
    fillingZeros: true
  })
  const [isCounterClosed, setIsCounterClosed] = useState(false)
  const scrollTriggerInstance = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    setMounted(true)

    if (isCounterClosed) return

    // Crear el ScrollTrigger
    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: '.counter-scroll',
      start: 'top -100%',
      onEnter: () => {
        gsap.to('.counter-scroll', {
          x: 20,
          ease: 'elastic.out(1.2, 0.7)',
          duration: 1.0
        })
      },
      onLeaveBack: () => {
        gsap.to('.counter-scroll', {
          x: -300,
          ease: 'elastic.out(1.2, 0.7)',
          duration: 1.0
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
        rotation: 45, // Rotación del ícono Plus para simular una X
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.7)'
      })
      gsap.to(button, {
        scale: 0.9,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.7)'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button.querySelector('svg'), {
        scale: 1.0,
        rotation: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.7)'
      })
      gsap.to(button, {
        scale: 1.0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.7)'
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
    <div className='counter-scroll hidden lg:block text-ghost p-spacing-8 bg-pallet-b-foreground-primary -translate-x-full border border-pallet-border-foreground rounded-[5px] text-xl-code space-y-spacing-16 fixed z-10 left-0 top-spacing-96 w-full max-w-[290px]'>
      <header className='flex justify-between counter-scroll-header'>
        <span className='flex items-center gap-spacing-8'>
          <Clock className='clock size-[18px]' />
          <span className='text-body-code'>Empezamos en:</span>
        </span>
        <button className='counter-scroll-button bg-fg-secondary size-5 flex justify-center items-center rounded-[3px] hover:cursor-pointer'>
          <Plus className='size-3' />
        </button>
      </header>

      <footer className='flex justify-between items-center counter-scroll-footer'>
        <div className='flex flex-col text-body-code items-center'>
          <span className='counter-days'>{mounted ? days : '00'}</span>
          <span className='counter-date-scroll'>days</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-hours'>{mounted ? hours : '00'}</span>
          <span className='counter-date-scroll'>hrs</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-minutes'>{mounted ? minutes : '00'}</span>
          <span className='counter-date-scroll'>min</span>
        </div>
        <span>:</span>
        <div className='flex flex-col items-center text-body-code'>
          <span className='counter-seconds'>{mounted ? seconds : '00'}</span>
          <span className='counter-date-scroll'>sec</span>
        </div>
      </footer>
    </div>
  )
}
