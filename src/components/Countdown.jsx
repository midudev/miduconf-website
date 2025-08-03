import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { useRemainingTime } from '../hooks/useRemainingTime'
import { Clock } from './icons/clock'
import { gsap } from 'gsap'
import { ScrollCountdown } from './ScrollCountdown'

const LITERALS = ['d', null, 'h', null, 'm', null, 's']
// const EVENT_DATE = 1757512800000 // 10 de septiembre de 2025 - 16:00h CEST

export function Countdown({ className }) {
  const { seconds, minutes, hours, days } = useRemainingTime(new Date(1757512800000), {
    fillingZeros: true
  })
  const [show, setShow] = useState(false)
  const clockRef = useRef(null)
  const scrollClockRef = useRef(null)

  useEffect(() => {
    const animateClock = (ref) => {
      const clock = ref.current
      if (!clock) return

      let currentRotation = 90
      const rect = clock.querySelectorAll('rect')
      if (!rect[6]) return

      const interval = setInterval(() => {
        gsap.to(rect[6], {
          rotate: currentRotation,
          y: -1,
          duration: 1.0,
          transformOrigin: 'center 100%',
          ease: 'elastic.out(1, 0.5)'
        })
        currentRotation += 90
      }, 1000)
      return interval
    }

    const interval1 = animateClock(clockRef)
    const interval2 = animateClock(scrollClockRef)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])
  useEffect(() => {
    // solo en client side para evitar problemas de hidratacion
    setShow(true)
  }, [])

  const showValue = (value) => {
    if (value === null) return

    if (show) return value
    return '00'
  }

  return (
    <>
      <div
        className={cn(
          'flex items-center gap-3 text-xl-code bg-palette-bg-foreground-primary border border-palette-border-foreground p-spacing-8 md:px-3 rounded-[5px]',
          className
        )}
      >
        <Clock ref={clockRef} className='clock size-[18px]' />
        <span className='text-palette-ghost text-xl-code'>Empezamos en:</span>
        <div className='flex items-center gap-1'>
          {[days, null, hours, null, minutes, null, seconds].map((value, index) => {
            return (
              <div key={index}>
                <div className='flex items-center justify-center text-center'>
                  <span className='tabular-nums text-xl-code'>{showValue(value)}</span>
                  <span className='text-xl-code'>{value === null ? ' ' : LITERALS[index]}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <ScrollCountdown scrollClockRef={scrollClockRef} />
    </>
  )
}
