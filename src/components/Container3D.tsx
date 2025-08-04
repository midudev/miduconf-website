import Atropos from 'atropos/react'
import { useEffect, useState } from 'react'
import 'atropos/css'

interface Props {
  children: React.ReactNode
}

export const Container3D = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <div className='relative z-[1000] w-full h-auto mx-auto'>
      <div className='opacity-100 h-max isolate'>
        <div className='flex items-center justify-center h-max'>
          {isMobile ? (
            <>{children}</>
          ) : (
            <Atropos
              highlight={true}
              innerClassName='backdrop-blur-xl rounded-xl'
              className='block w-max h-auto mx-auto shadow-2xl [box-sizing:border-box]'
            >
              {children}
            </Atropos>
          )}
        </div>
      </div>
    </div>
  )
}
