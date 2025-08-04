import Matter from 'matter-js'

export interface PhysicsConfig {
  gravity: number
  restitution: number
  friction: number
}

export interface AnimationConfig {
  width: number
  height: number
  structure: string
  physics: PhysicsConfig
  isMobile?: boolean
}

export interface AnimationContext {
  engine: Matter.Engine
  world: Matter.World
  render: Matter.Render
  runner: Matter.Runner
  config: AnimationConfig
}

export interface AnimationModule {
  name: string
  setup: (context: AnimationContext) => void
  cleanup?: () => void
}

export type StructureType = 'box' | 'circle' | 'piramide' | 'prism' | 'background' | 'heart'
export type AnimationType = 'default' | 'pyramid' | 'friction'