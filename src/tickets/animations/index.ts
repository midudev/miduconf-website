import { AnimationModule, AnimationType } from './types'
import { ballPoolAnimation } from './ball-pool'
import { frictionAnimation } from './friction'
import { pyramidAnimation } from './pyramid'

export const animationRegistry: Record<AnimationType, AnimationModule> = {
  default: ballPoolAnimation,
  pyramid: pyramidAnimation,
  friction: frictionAnimation
}

export const getAnimation = (type: AnimationType): AnimationModule => {
  return animationRegistry[type] || ballPoolAnimation
}

export * from './types'
export * from './utils'