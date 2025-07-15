import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type Props<C extends React.ElementType> = {
  as?: C
  children: React.ReactNode
  className?: string
  containerClassName?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<C>

export const Button = <C extends React.ElementType = 'button'>({
  as,
  children,
  disabled,
  className,
  containerClassName,
  ...restOfProps
}: Props<C>) => {
  const As = as ?? 'button'

  return (
    <As
      {...restOfProps}
      disabled={disabled}
      className={cn(
        'inline-flex flex-col items-center gap-x-2 text-xl text-white bg-pallet-primary uppercase rounded-md disabled:cursor-not-allowed md:flex-row md:w-max relative group overflow-hidden disabled:opacity-60',
        containerClassName
      )}
    >
      <div
        className={cn(
          'inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white bg-pallet-primary uppercase rounded-md group-disabled:cursor-not-allowed md:flex-row md:w-max relative translate-y-0 group-hover:translate-y-full transition ease-[cubic-bezier(0.746,_-0.622,_0.362,_1.546)] duration-300 w-full h-full group-focus-visible:translate-y-full',
          className
        )}
      >
        {children}
      </div>
      <div
        aria-disabled
        className={cn(
          'inline-flex flex-col items-center gap-x-2 py-2.5 px-4 text-xl text-white bg-pallet-primary uppercase rounded-md group-disabled:cursor-not-allowed md:flex-row md:w-max absolute inset-0 -translate-y-full group-hover:translate-y-0 transition ease-[cubic-bezier(0.746,_-0.622,_0.362,_1.546)] duration-300 group-focus-visible:translate-y-0',
          className
        )}
      >
        {children}
      </div>
    </As>
  )
}
