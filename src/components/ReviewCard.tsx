import { JSX } from 'react'
import { DiamondIcon } from './icons/diamond'
import { cn } from '@/lib/utils'
import { Sponsor } from './Sponsor'

interface ReviewCardProps {
  level: string
  sponsors: Sponsor[]
}

interface Sponsor {
  name?: string
  logo?: JSX.Element
  link?: string
  slogan?: string
}

export const ReviewCard = ({ level, sponsors }: ReviewCardProps) => {
  if (sponsors.length === 0) return null

  return (
    <div>
      <div className='flex items-center justify-center gap-2 mb-spacing-32 lg:justify-start'>
        <DiamondIcon
          className={cn(
            'size-4 lg:size-5',
            level === 'diamond'
              ? 'text-[#b8d8e7]'
              : level === 'premium'
              ? 'text-yellow-200'
              : 'text-orange-500'
          )}
        />
        <h3 className='text-2xl-semibold font-bold !capitalize text-pallet-default lg:justify-start'>
          {level}
        </h3>
        <DiamondIcon
          className={cn(
            'size-4 lg:size-5',
            level === 'diamond'
              ? 'text-[#b8d8e7]'
              : level === 'premium'
              ? 'text-yellow-200'
              : 'text-orange-500'
          )}
        />
      </div>
      <div
        className={cn(
          'space-y-[20px] md:space-y-0 md:grid md:grid-cols-2 md:gap-[20px]',
          level === 'pro' && 'xl:grid-cols-3'
        )}
      >
        {sponsors.map((sponsor, idx) => (
          <Sponsor key={idx} sponsor={sponsor} level={level} />
        ))}
      </div>
    </div>
  )
}
