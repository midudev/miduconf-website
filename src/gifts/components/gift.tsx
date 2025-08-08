import { cn } from '@/lib/utils'

interface GiftItemProps {
  imgUrl?: string
  imgSmallUrl?: string
  title?: React.ReactNode
  className?: string
  level?: 1 | 2 | 3
  isDisabled?: boolean
}

export function GiftItem({
  imgUrl,
  title,
  imgSmallUrl,
  className,
  isDisabled = false
}: GiftItemProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center py-6 transition border bg-palette-bg-foreground-primary border-palette-border-foreground rounded-md group px-6 before:w-full before:h-full before:rounded-2xl before:backdrop-blur-md before:z-10 before:absolute before:inset-0  cursor-crosshair group hover:border-palette-ghost/80',
        className
      )}
    >
      {title && (
        <p
          className={cn(
            'absolute z-20 w-full text-base font-bold text-center text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-[26ch] uppercase text-balance',
            'transition-all duration-300 z-[60]',
            !isDisabled ? 'group-hover:translate-y-full' : 'opacity-20'
          )}
        >
          {title}
        </p>
      )}
      {imgUrl && (
        <div
          className={cn(
            'relative h-auto opacity-20 w-max rotate-6 z-50 blur-sm ',
            'transition-all duration-300',
            !isDisabled &&
              'group-hover:blur-none group-hover:-translate-y-1/3 group-hover:opacity-100'
          )}
        >
          <img src={imgUrl} className='w-auto h-32 drop-shadow-gift' alt='' />
          <img
            src={imgSmallUrl}
            className='h-16 w-auto drop-shadow-gift absolute -bottom-0.5 -right-2'
            alt=''
          />
        </div>
      )}
    </div>
  )
}
