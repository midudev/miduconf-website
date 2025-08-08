import { RefObject, useState } from 'react'
import { ShareTicketPanel } from './share-ticket-panel'
import { TicketCard } from './ticket-card'
import { DraggablePanel } from '@/components/DraggablePanel'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectStructurePanel } from './select-structure-panel'
import { SelectColorPanel } from './select-color-panel'
import { SelectAnimationPanel } from './select-animation-panel'
import { AccountConnectionPanel } from './account-connection-panel'
import { TicketDesign } from '../types/ticket-design'
import { HologramOption } from '../types/hologram-option'
import { StickerOption } from '../types/sticker-option'
import { ColorOption } from '../types/color-option'
import { StructureOpcion } from '../types/structure-option'
import { AnimationOption } from '../types/animation-option'
import { AnimationType, StructureType } from '../animations'

interface Props {
  twitchTier: '1' | '2' | '3' | null
  midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
  ticketDOMContnet: RefObject<HTMLElement | null>
  ticketOGImageElement: HTMLElement | null
  username: string
  fullname: string
  ticketNumber: number
  ticketDesign: TicketDesign
  midudevTokentId: string
  handleChangeHologram: (hologram: HologramOption) => void
  handleChangeSticker: (sticker: StickerOption) => void
  handleChangeColor?: (color: ColorOption) => void
  handleChangeStructure?: (structure: StructureOpcion) => void
  handleChangeAnimation?: (animation: AnimationOption) => void
  hasUnsavedChanges?: boolean
  isSaving?: boolean
  onSave?: () => void
}

// Map between the two type systems (same as desktop)

const mapOpcionToStructure = (opcion: StructureOpcion): StructureType => {
  const mapping: Record<StructureOpcion, StructureType> = {
    box: 'box',
    circle: 'circle',
    piramide: 'piramide',
    prism: 'prism',
    background: 'background',
    heart: 'heart'
  }
  return mapping[opcion] || 'box'
}

const mapAnimationToOption = (animationType: AnimationType): AnimationOption => {
  const mapping: Record<AnimationType, AnimationOption> = {
    default: 'default' as AnimationOption,
    pyramid: 'piramide' as AnimationOption,
    friction: 'friccion' as AnimationOption
  }
  return mapping[animationType] || ('default' as AnimationOption)
}

const mapOptionToAnimation = (option: AnimationOption): AnimationType => {
  const mapping: Record<string, AnimationType> = {
    default: 'default',
    piramide: 'pyramid',
    friccion: 'friction'
  }
  return mapping[option] || 'default'
}

export const ViewTicketMobile = ({
  twitchTier,
  ticketDOMContnet,
  username,
  fullname,
  ticketNumber,
  ticketDesign,
  ticketOGImageElement,
  midudevTokentId,
  midudevTypeSub,
  handleChangeHologram,
  handleChangeSticker,
  handleChangeColor,
  handleChangeStructure,
  handleChangeAnimation,
  hasUnsavedChanges = false,
  isSaving = false,
  onSave
}: Props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  
  // Debug: Log ticketDesign changes


  const handleAnimationChange = (animation: AnimationType) => {
    const animationOption = mapAnimationToOption(animation)
    handleChangeAnimation?.(animationOption)
  }

  const handleStructureChange = (opcion: StructureOpcion) => {
    handleChangeStructure?.(opcion)
  }


  return (
    <div className='relative w-full min-h-screen lg:hidden'>

      {/* Share Panel and Save/Cancel Buttons */}
      {!isPanelOpen && (
        <>
          <div className='absolute z-40 left-1/2 -translate-x-1/2 top-[85px] sm:left-4 sm:top-[40%] sm:translate-x-0'>
            <ShareTicketPanel
              ticketDesign={ticketDesign}
              ticketDOMContnet={ticketDOMContnet}
              username={username}
              structure={mapOpcionToStructure(ticketDesign.structure)}
              animation={mapOptionToAnimation(ticketDesign.animation)}
              className='flex-row sm:flex-col'
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
              onSave={onSave}
              onCancel={() => {/* Add cancel logic if needed */}}
            />
          </div>
        </>
      )}

      {/* Ticket Display */}
      <div
        className={`flex items-center justify-center p-4 md:p-8 ${
          isPanelOpen ? 'h-[calc(100vh-55vh)] pt-20' : 'min-h-screen pb-20 pt-32'
        }`}
      >
        <div
          className={`transition-transform duration-300 ${
            isPanelOpen ? 'scale-[0.55] sm:scale-[0.6] md:scale-[0.65]' : 'scale-100'
          }`}
        >
          <TicketCard
            fullname={fullname}
            ticketNumber={ticketNumber}
            username={username}
            hologram={ticketDesign.hologram}
            color={ticketDesign.color}
            structure={mapOpcionToStructure(ticketDesign.structure)}
            animation={mapOptionToAnimation(ticketDesign.animation)}
          />
        </div>
      </div>

      {/* Customization Panel */}
      <DraggablePanel
        title='Personaliza tu ticket'
        isOpen={isPanelOpen}
        onToggle={() => setIsPanelOpen(!isPanelOpen)}
      >
        <div className='flex flex-col h-full'>
          <h1 className='mb-6 text-2xl font-bold text-white normal-case'>Personaliza tu ticket</h1>
          
          {/* Account Connection */}
          <AccountConnectionPanel
            twitchTier={twitchTier}
            midudevTypeSub={midudevTypeSub}
            midudevTokentId={midudevTokentId}
            username={username}
          />

          {/* Responsive Grid Container */}
          <div className='flex-1 overflow-y-auto'>
            <div className='space-y-4 pb-20'>
              {/* Animation Panel - Full width */}
              <SelectAnimationPanel
                selectedAnimation={mapOptionToAnimation(ticketDesign.animation)}
                handleChangeAnimation={handleAnimationChange}
              />

              {/* Grid for Structure, Colors, and Hologram */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {/* Structure Panel */}
                <div className='col-span-1'>
                  <SelectStructurePanel
                    ticketDesign={ticketDesign}
                    handleChangeStructure={handleStructureChange}
                    twitchTier={twitchTier}
                    midudevTypeSub={midudevTypeSub}
                  />
                </div>

                {/* Colors Panel */}
                <div className='col-span-1'>
                  <SelectColorPanel
                    ticketDesign={ticketDesign}
                    handleChangeColor={handleChangeColor || (() => {})}
                    twitchTier={twitchTier}
                    midudevTypeSub={midudevTypeSub}
                  />
                </div>

                {/* Holographic Panel - Third position in 2x2 mobile, third column in iPad */}
                <div className='col-span-2 md:col-span-1'>
                  <SelectHologramPanel
                    ticketDesign={ticketDesign}
                    twitchTier={twitchTier}
                    midudevTypeSub={midudevTypeSub}
                    username={username}
                    ticketNumber={ticketNumber}
                    midudevTokentId={midudevTokentId}
                    ticketOGImageElement={ticketOGImageElement}
                    handleChangeHologram={handleChangeHologram}
                    handleChangeSticker={handleChangeSticker}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </DraggablePanel>
    </div>
  )
}
