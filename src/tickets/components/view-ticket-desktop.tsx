import { ShareTicketPanel } from './share-ticket-panel'
import { Container3D } from '@/components/Container3D'
import { TicketCard } from './ticket-card'
import { SelectStructurePanel } from './select-structure-panel'
import { SelectColorPanel } from './select-color-panel'
import { SelectHologramPanel } from './select-hologram-panel'
import { SelectAnimationPanel } from './select-animation-panel'
import { HologramOption } from '../types/hologram-option'
import { TicketDesign } from '../types/ticket-design'
import { PencilIcon } from '../icons/structure-ticket/pencil'
import { Button } from '@/components/Button'
import { RefObject, useState } from 'react'
import { StickerOption } from '../types/sticker-option'
import { ColorOption } from '../types/color-option'
import { AnimationType, StructureType } from '../animations'
import { StructureOpcion } from '../types/structure-option'
import { AnimationOption } from '../types/animation-option'
import { AtroposSyncProvider } from '../context/AtroposSync'
import { WhiteMidudevLogo } from '../icons/white-midudev-logo'
import { getTwitchAuthorizeUrl } from '@/twitch/utils/get-twitch-authorize-url'
import { EnterArrow } from '@/components/icons/enter-arrow'
import { SelectStickerPanel } from './select-sticker-panel'

interface Props {
  ticketDOMContnet: RefObject<HTMLElement | null>
  ticketOGImageElement: HTMLElement | null
  username: string
  midudevTypeSub: 'monthly' | 'quarterly' | 'annual' | 'lifetime' | null
  twitchTier: '1' | '2' | '3' | null
  fullname: string
  ticketNumber: number
  ticketDesign: TicketDesign
  midudevTokentId: string
  handleChangeHologram: (hologram: HologramOption) => void
  handleAddSticker: (sticker: StickerOption) => void
  handleChangeColor?: (color: ColorOption) => void
  handleChangeStructure?: (structure: StructureOpcion) => void
  handleChangeAnimation?: (animation: AnimationOption) => void
  handleRemoveSticker: (sticker: StickerOption) => void
  hasUnsavedChanges?: boolean
  isSaving?: boolean
  onSave?: () => void
}

// Map between the two type systems
const mapStructureToOpcion = (structure: StructureType): StructureOpcion => {
  const mapping: Record<StructureType, StructureOpcion> = {
    box: 'box',
    circle: 'circle',
    piramide: 'piramide',
    prism: 'prism',
    background: 'background',
    heart: 'heart'
  }
  return mapping[structure] || 'box'
}

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

// Map between AnimationType and AnimationOption
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

const ViewTicketDesktopInner = ({
  ticketDOMContnet,
  ticketOGImageElement,
  username,
  fullname,
  ticketNumber,
  ticketDesign,
  twitchTier,
  midudevTokentId,
  midudevTypeSub,
  handleChangeHologram,
  handleAddSticker,
  handleChangeColor,
  handleChangeStructure,
  handleChangeAnimation,
  handleRemoveSticker,
  hasUnsavedChanges = false,
  isSaving = false,
  onSave
}: Props) => {
  const [isPanelMinimized, setIsPanelMinimized] = useState(false)

  // Get current structure and animation from ticketDesign
  const selectedStructure = mapOpcionToStructure(ticketDesign.structure)
  const selectedAnimation = mapOptionToAnimation(ticketDesign.animation)

  const handleAnimationChange = (animation: AnimationType) => {
    const animationOption = mapAnimationToOption(animation)
    handleChangeAnimation?.(animationOption)
  }

  const handleStructureChange = (opcion: StructureOpcion) => {
    handleChangeStructure?.(opcion)
  }

  // Create ticketDesign object for SelectStructurePanel
  const extendedTicketDesign = {
    ...ticketDesign,
    structure: mapStructureToOpcion(selectedStructure),
    animation: mapAnimationToOption(selectedAnimation)
  }
  return (
    <AtroposSyncProvider>
      <div
        className={`hidden lg:flex lg:items-center lg:justify-center lg:min-h-screen lg:w-full mx-auto py-8 pt-20 relative transition-all duration-500 ease-in-out ${
          isPanelMinimized ? 'px-8' : 'pl-8 pr-96'
        }`}
      >
        {/* Share Panel - Absolute Left */}
        <div className='absolute left-4 top-24'>
          <ShareTicketPanel
            ticketDesign={ticketDesign}
            ticketDOMContnet={ticketDOMContnet}
            username={username}
            structure={selectedStructure}
            animation={selectedAnimation}
          />
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-4 transition-all duration-700 ease-out ${
            hasUnsavedChanges
              ? 'transform translate-x-0 opacity-100'
              : 'transform -translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <Button
            variant='default'
            onClick={onSave}
            disabled={isSaving}
            className={`flex items-center justify-center w-full gap-2 py-2 text-lg uppercase transition-all duration-300 ${
              isSaving ? 'bg-green-600 hover:bg-green-600' : ''
            }`}
          >
            {isSaving ? (
              <>
                <div className='w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin' />
                Guardando...
              </>
            ) : (
              <>
                <EnterArrow className='w-4 h-4' />
                Guardar
              </>
            )}
          </Button>
          <Button
            variant='secondary'
            className='w-full py-2 text-lg uppercase transition-all duration-300'
            onClick={() => setIsPanelMinimized(true)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
        </div>

        {/* Ticket - Always Centered */}
        <div className='flex items-center justify-center'>
          <Container3D>
            <TicketCard
              fullname={fullname}
              stickers={ticketDesign.sticker ?? [null, null, null]}
              ticketNumber={ticketNumber}
              username={username}
              hologram={ticketDesign.hologram}
              color={ticketDesign.color}
              structure={selectedStructure}
              animation={selectedAnimation}
              handleRemoveSticker={handleRemoveSticker}
            />
          </Container3D>
        </div>

        {/* Customization Panel - Animated Slide */}
        <div
          className={`absolute right-4 top-[5.5rem] w-[25rem] h-[calc(100vh-7rem)] transition-all duration-500 ease-in-out flex flex-col ${
            isPanelMinimized
              ? 'transform translate-x-full opacity-0 pointer-events-none mr-8'
              : 'transform translate-x-0 opacity-100 mr-0'
          }`}
        >
          <div className='flex flex-col flex-1 p-4 overflow-auto border rounded-md border-palette-border-foreground bg-palette-bg-foreground-primary custom-scroll'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-medium text-white normal-case'>Personaliza tu ticket</h2>
              <Button
                variant='icon'
                size='small'
                onClick={() => setIsPanelMinimized(true)}
                containerClassName='bg-palette-primary hover:bg-palette-primary/80'
                aria-label='Minimizar panel'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L6 18M6 6l12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Button>
            </div>

            {/* Connection Status Buttons */}
            <div className='flex flex-col gap-4 mb-6'>
              <h4 className='text-sm font-medium tracking-wide uppercase text-palette-ghost'>
                Vincula tu cuenta
              </h4>
              {/* Academia Connection Button */}
              <div className='flex gap-3'>
                {midudevTypeSub ? (
                  <Button
                    variant='default'
                    size='small'
                    className='px-4 py-3 text-sm font-medium tracking-wide text-white uppercase bg-palette-primary hover:bg-palette-primary/80'
                    disabled={true}
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <WhiteMidudevLogo className='size-5' />
                      ACADEMIA
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant='default'
                    size='small'
                    href={`https://midu.dev/miduconf/ticket/${midudevTokentId}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    as='a'
                  >
                    <div className='flex items-center justify-center gap-2 text-sm uppercase'>
                      <WhiteMidudevLogo className='size-5' />
                      Academia
                    </div>
                  </Button>
                )}

                {/* Twitch Connection Button */}
                {twitchTier ? (
                  <Button
                    variant='ghost'
                    size='small'
                    className='px-4 py-3 text-sm font-medium tracking-wide text-white uppercase bg-purple-600 border border-purple-600 hover:bg-purple-700'
                    disabled={true}
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='text-white'
                      >
                        <path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' />
                      </svg>
                      TWITCH TIER {twitchTier}
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='small'
                    className='px-4 py-3 text-sm font-medium tracking-wide text-white uppercase bg-purple-600 border border-purple-600 hover:bg-purple-700'
                    href={getTwitchAuthorizeUrl({ requiredTier: '1', currentTier: twitchTier })}
                    target='_blank'
                    rel='noopener noreferrer'
                    as='a'
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='text-white'
                      >
                        <path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' />
                      </svg>
                      TWITCH
                    </div>
                  </Button>
                )}
              </div>
            </div>
            <div className='relative flex-1 space-y-6'>
              {/* ANIMACIÓN Section */}
              <SelectAnimationPanel
                selectedAnimation={selectedAnimation}
                handleChangeAnimation={handleAnimationChange}
              />

              {/* ESTRUCTURA Section */}
              <SelectStructurePanel
                ticketDesign={extendedTicketDesign}
                handleChangeStructure={handleStructureChange}
              />

              {/* COLORES Section */}
              <SelectColorPanel
                ticketDesign={ticketDesign}
                handleChangeColor={handleChangeColor || (() => {})}
              />

              {/* HOLOGRÁFICO Section */}
              <SelectHologramPanel
                ticketDesign={ticketDesign}
                twitchTier={twitchTier}
                midudevTypeSub={midudevTypeSub}
                username={username}
                ticketNumber={ticketNumber}
                midudevTokentId={midudevTokentId}
                ticketOGImageElement={ticketOGImageElement}
                handleChangeHologram={handleChangeHologram}
                handleAddSticker={handleAddSticker}
              />

              {/* STICKETS Section */}
              <SelectStickerPanel
                ticketDesign={extendedTicketDesign}
                handleAddSticker={handleAddSticker}
                handleRemoveSticker={handleRemoveSticker}
              />
            </div>
          </div>
        </div>

        {/* Floating Pencil Button */}
        {isPanelMinimized && (
          <div className='absolute z-50 top-24 right-8 animate-in fade-in slide-in-from-right-5'>
            <Button
              variant='icon'
              onClick={() => setIsPanelMinimized(false)}
              containerClassName='bg-palette-bg-foreground-secondary hover:bg-palette-bg-foreground-secondary/80 border border-palette-border-foreground shadow-lg hover:shadow-xl transition-all duration-300'
              aria-label='Mostrar panel de personalización'
            >
              <PencilIcon className='w-5 h-5 text-palette-text-primary' />
            </Button>
          </div>
        )}
      </div>
    </AtroposSyncProvider>
  )
}

export const ViewTicketDesktop = (props: Props) => {
  return <ViewTicketDesktopInner {...props} />
}
