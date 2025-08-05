import { Highlight } from '@/components/Highlight'
import { Title } from '@/components/Title'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function WhatToExpect() {
  const refScrollTop = useRef<HTMLUListElement>(null)
  const refScrollBottom = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const scrollTop = refScrollTop.current
    const scrollBottom = refScrollBottom.current

    function cloneItems(container: HTMLUListElement | null) {
      if (!container) return
      const items = container.querySelectorAll('.highlight-item')
      items.forEach((item: Element) => {
        // clonar el elemento con todo su contenido
        const clone = item.cloneNode(true)
        container.appendChild(clone)
      })
    }
    cloneItems(scrollTop)
    cloneItems(scrollBottom)

    gsap.to('.star-highlight', {
      rotation: 180,
      duration: 0.8,
      stagger: { from: 'random', amount: 1.5 },
      repeat: -1,
      ease: 'elastic.out(1, 0.75)'
    })
  }, [])
  return (
    <section id='lo-que-puedes-esperar' className='overflow-hidden mt-spacing-180'>
      <Title>Que esperar</Title>
      <div className='flex flex-col pt-spacing-64 gap-spacing-40 container-infinite-scroll'>
        <Highlight
          position='infinite-scroll-top'
          refHighlight={refScrollTop}
          highlights={HIGHLIGHTS_1}
        />
        <Highlight
          position='infinite-scroll-bottom'
          refHighlight={refScrollBottom}
          direction='right'
          data-direction='right'
          highlights={HIGHLIGHTS_2}
        />
      </div>
    </section>
  )
}

const HIGHLIGHTS_1 = ['I.A.', 'ui/ux', 'animaciones', 'charlas']
const HIGHLIGHTS_2 = ['workshops', 'live coding', 'novedades', 'sorteos']
