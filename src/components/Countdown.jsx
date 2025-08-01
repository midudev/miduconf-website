import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useRemainingTime } from '../hooks/useRemainingTime'
import { DiamondIcon } from './icons/diamond'

const LITERALS = ['d', null, 'h', null, 'm', null, 's']
// const EVENT_DATE = 1757512800000 // 10 de septiembre de 2025 - 16:00h CEST

export function Countdown({ className }) {
  const { seconds, minutes, hours, days } = useRemainingTime(new Date(1757512800000), {
    fillingZeros: true
  })
  const [show, setShow] = useState(false)

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
    <div
      className={cn(
        'text-base md:text-xl flex items-center gap-3 text-white font-geist bg-palette-bg-foreground-primary border border-palette-border-foreground px-4 py-2 w-max',
        className
      )}
    >
      <DiamondIcon className='text-palette-primary' />
      <span className='uppercase text-palette-ghost'>Empezamos en:</span>
      <div className='flex items-center gap-1 text-white'>
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
  )
}
