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

  function clockAnimation(item, rotate) {
    gsap.to(item, {
      rotate,
      y: -1,
      delay: 1.0,
      duration: 1.0,
      transformOrigin: 'center 100%',
      ease: 'elastic.out(1, 0.5)'
    })
  }
  useEffect(() => {
    const clock = clockRef.current
    if (!clock) return

    let currentRotation = 90

    const rect = clock.querySelectorAll('rect')
    if (!rect[6]) return

    clockAnimation(rect[6], currentRotation)

    const interval = setInterval(() => {
      currentRotation += 90
      clockAnimation(rect[6], currentRotation)
    }, 1000)
    return () => clearInterval(interval)
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
          'flex items-center gap-3 text-xl-code bg-pallet-b-foreground-primary border border-pallet-border-foreground px-spacing-16 py-spacing-8',
          className
        )}
      >
        <Clock ref={clockRef} className='clock size-[18px]' />
        <span className='uppercase text-pallet-ghost'>Empezamos en:</span>
        <div className='flex items-center gap-1'>
          {[days, null, hours, null, minutes, null, seconds].map((value, index) => {
            return (
              <div key={index}>
                <div className='flex items-center justify-center text-center'>
                  <span className='tabular-nums'>{showValue(value)}</span>
                  <span className=''>{value === null ? ' ' : LITERALS[index]}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <ScrollCountdown />
    </>
  )
}
