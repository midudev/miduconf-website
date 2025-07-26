import { useState, useRef, useEffect, ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
  isOpen: boolean
  onToggle: () => void
}

export const DraggablePanel = ({ children, title, isOpen, onToggle }: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setCurrentY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setCurrentY(e.touches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const deltaY = currentY - startY
    
    // If dragged up more than 50px, open
    if (deltaY < -50 && !isOpen) {
      onToggle()
    }
    // If dragged down more than 50px, close
    else if (deltaY > 50 && isOpen) {
      onToggle()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setCurrentY(e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    setCurrentY(e.clientY)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const deltaY = currentY - startY
    
    if (deltaY < -50 && !isOpen) {
      onToggle()
    } else if (deltaY > 50 && isOpen) {
      onToggle()
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, currentY, startY])

  return (
    <div 
      ref={panelRef}
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
      }`}
      style={{
        height: '50vh',
        transform: isDragging 
          ? `translateY(${Math.max(0, Math.min(currentY - startY, window.innerHeight * 0.5))}px)` 
          : undefined
      }}
    >
      {/* Handle */}
      <div
        className="bg-pallet-b-foreground-primary border-t border-pallet-border-foreground cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-12 h-1 bg-gray-400 rounded-full mb-3"></div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-pallet-b-foreground-primary border-t border-pallet-border-foreground flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}