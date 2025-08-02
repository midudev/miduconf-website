import { cn } from '@/lib/utils'
import { DiamondIcon } from './icons/diamond'
import { useEffect, type ForwardedRef } from 'react'
import { gsap } from 'gsap'

interface HighlightProps {
  highlights: string[]
  direction?: 'left' | 'right'
  refHighlight?: ForwardedRef<HTMLUListElement>
  position?: 'infinite-scroll-top' | 'infinite-scroll-bottom'
}

export const Highlight = ({
  highlights,
  direction = 'left',
  refHighlight,
  position = 'infinite-scroll-top'
}: HighlightProps) => {
  useEffect(() => {
    // Usamos un timeout pequeño para asegurar que el DOM esté listo y se animen los elementos que se clonaron
    const timer = setTimeout(() => {
      // Seleccionamos solo los elementos dentro de este componente específico
      let container: HTMLUListElement | null = null
      if (refHighlight && 'current' in refHighlight) {
        container = refHighlight.current
      }
      if (!container) return

      const highlightTexts = container.querySelectorAll('.highlight-text')
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 10,
        defaults: { duration: 0.6, ease: 'elastic.out(1, 0.75)' }
      })
      tl.to(highlightTexts, { yPercent: 100, stagger: { each: 0.03, from: 'random' } })
        .set(highlightTexts, { yPercent: -100 })
        .to(highlightTexts, { yPercent: 0, stagger: { each: 0.03, from: 'random' } })
    }, 100)

    return () => clearTimeout(timer)
  }, [refHighlight])

  return (
    <ul
      ref={refHighlight}
      data-direction={direction}
      className={cn(
        'scroll-container flex flex-row items-center gap-spacing-40 whitespace-nowrap m-0 w-max select-none',
        { position }
      )}
    >
      {highlights.map((highlight, key) => (
        <li
          className='highlight-item flex items-center gap-spacing-40 relative overflow-hidden'
          key={key}
        >
          <div>
            <span className='highlight-text uppercase font-semibold text-[100px] lg:text-[180px] block text-pallet-ghost/30 hover:text-pallet-primary transition-colors leading-none'>
              {highlight}
            </span>
          </div>
          <DiamondIcon className='size-spacing-32 text-pallet-primary lg:size-spacing-40 star-highlight' />
        </li>
      ))}
    </ul>
  )
}
