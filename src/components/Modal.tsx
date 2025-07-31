'use client'

import { Button } from './Button'
import { CrossIcon } from './icons/cross'

interface Props {
  isOpen?: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen = false, onClose, children }: Props) {
  if (!isOpen) return null

  return (
    <>
      <div className='absolute inset-0 w-dvw h-dvh backdrop-blur-sm bg-pallet-background/20 z-[9999999] animate-blurred-fade-in'></div>
      <dialog
        open={isOpen}
        className='max-w-[480px] w-full fixed inset-0 z-[9999999] animate-fade-in-up bg-pallet-b-foreground-primary border border-pallet-border-foreground'
      >
        <Button
          onClick={onClose}
          variant='ghost'
          title='Cerrar modal'
          aria-label='Cerrar modal'
          containerClassName='absolute transition-transform top-2 right-2 rounded-none'
          className='p-1 rounded-none aspect-square'
        >
          <CrossIcon className='w-auto h-4' />
        </Button>
        {children}
      </dialog>
    </>
  )
}
