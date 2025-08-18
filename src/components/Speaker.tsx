'use client'

import React, { useEffect, useRef } from 'react'
import { DiamondIcon } from './icons/diamond'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SpeakerProps {
  name: string
  img: string
  title: string
  isPlaceholder?: boolean
}

export const Speaker: React.FC<SpeakerProps> = ({ name, img, title, isPlaceholder = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isPlaceholder) return
    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current!
    let resizeTimeout: NodeJS.Timeout

    const initializeCanvas = (canvas: HTMLCanvasElement) => {
      const image = new Image()
      image.src = `/speakers/${img}.webp`
      image.crossOrigin = 'anonymous'

      const intensities = [0.07, 0.2, 0.5, 1] // tus pasos de pixelado
      let step = 0

      const bayer4 = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
      ]

      const createDithering = (buffer: HTMLCanvasElement) => {
        const bctx = buffer.getContext('2d')
        if (!bctx) return
        const pw = buffer.width
        const ph = buffer.height
        if (pw <= 0 || ph <= 0) return

        const imgData = bctx.getImageData(0, 0, pw, ph)
        const data = imgData.data
        for (let y = 0; y < ph; y++) {
          for (let x = 0; x < pw; x++) {
            const idx = (y * pw + x) * 4
            const r = data[idx],
              g = data[idx + 1],
              b = data[idx + 2]
            const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255
            const threshold = (bayer4[y % 4][x % 4] + 0.5) / 16
            if (luma <= threshold) {
              const color = 0.4
              data[idx] = data[idx] * color // R
              data[idx + 1] = data[idx + 1] * color // G
              data[idx + 2] = data[idx + 2] * color // B
            }
          }
        }
        bctx.putImageData(imgData, 0, 0)
      }

      const applyDitheringPixel = (intensity: number) => {
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const rect = canvas.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return

        const pixelRatio = Math.min(devicePixelRatio, 2)
        const w = Math.round(rect.width * pixelRatio)
        const h = Math.round(rect.height * pixelRatio)
        canvas.width = w
        canvas.height = h

        const pixelW = Math.max(4, Math.min(Math.floor(w * intensity), w))
        const pixelH = Math.max(4, Math.min(Math.floor(h * intensity), h))

        const buffer = document.createElement('canvas')
        buffer.width = pixelW
        buffer.height = pixelH
        const bctx = buffer.getContext('2d')
        if (!bctx) return

        bctx.imageSmoothingEnabled = false
        bctx.drawImage(image, 0, 0, pixelW, pixelH)
        createDithering(buffer)

        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(buffer, 0, 0, w, h)
      }

      image.onload = () => {
        // paso 0 inmediato
        applyDitheringPixel(intensities[0])

        const speakerEl = containerRef.current!
        let alreadyAnimated = false
        ScrollTrigger.create({
          trigger: speakerEl,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            if (alreadyAnimated) return
            alreadyAnimated = true
            // animación paso a paso
            step = 0
            const loading = setInterval(() => {
              step++
              if (step >= intensities.length) {
                clearInterval(loading)
                return
              }
              applyDitheringPixel(intensities[step])
            }, 300)
          }
        })
      }

      image.onerror = () => console.error('Error cargando img:', image.src)
    }

    // inicializa al montar
    initializeCanvas(canvas)

    // re-inicializa al redimensionar
    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => initializeCanvas(canvas), 250)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
      clearTimeout(resizeTimeout)
    }
  }, [img, isPlaceholder])

  if (isPlaceholder) {
    return (
      <li className='speaker w-full md:min-w-[336px] md:max-w-[436px] lg:max-w-[536px] mx-auto'>
        <div className='relative aspect-[712/912] overflow-hidden w-full rounded-[5px] bg-palette-border-foreground'>
          <p className='text-2xl-semibold uppercase text-wrap text-center text-white mx-auto px-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold flex items-center md:gap-2 z-10'>
            <DiamondIcon className='w-5 h-auto md:w-10' />
            ¡Muy pronto revelaremos más speakers!
            <DiamondIcon className='w-5 h-auto md:w-10' />
          </p>
        </div>
      </li>
    )
  }

  return (
    <li ref={containerRef} className='speaker w-full md:min-w-[336px] md:max-w-[356px] 2xl:max-w-[536px]  mx-auto'>
      <div className='relative overflow-hidden w-full'>
        <canvas
          ref={canvasRef}
          className='pixel-canvas w-full object-cover aspect-[534/684] block rounded-[5px] speaker-image'
          aria-label={`Retrato de ${name}`}
          role='img'
          style={{ imageRendering: 'pixelated' }}
        />
        <noscript>
          <img
            src={`/speakers/${img}.webp`}
            className='w-full object-cover block rounded-[5px] speaker-image'
            alt={`Retrato de ${name}`}
            style={{ imageRendering: 'pixelated' }}
          />
        </noscript>
        <p className='absolute inline-flex items-center gap-2 py-[4px] px-[8px] text-body-code border rounded-[5px] bg-palette-bg-foreground-primary border-palette-border-foreground bottom-spacing-16 left-spacing-16'>
          <DiamondIcon className='w-3 h-auto md:w-4 text-palette-primary' />
          <span className='speaker-monospace'>{name}</span>
        </p>
      </div>
      <p className='speaker-monospace text-body-code mt-spacing-24 text-palette-ghost'>{title}</p>
    </li>
  )
}
