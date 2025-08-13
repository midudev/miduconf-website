'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectPass, RenderPass, EffectComposer } from 'postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DitheringEffect } from './DitheringEffect'
import { lights } from './lights'
import GUI from 'lil-gui'
import gsap from 'gsap'

export function MiduLogo3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene?: THREE.Scene
    camera?: THREE.OrthographicCamera
    renderer?: THREE.WebGLRenderer
    composer?: EffectComposer
    controls?: OrbitControls
    model?: THREE.Group
    animationId?: number
    cleanup?: () => void
    raycaster?: THREE.Raycaster
    pointer?: THREE.Vector2
    isPressed?: boolean
    isRotating?: boolean
    isHovered?: boolean
    shakeAnimation?: gsap.core.Tween
  }>({})

  function shortestAngleDiff(target: number, current: number): number {
    // Normalizar ambos ángulos al rango [0, 2π]
    target = ((target % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    current = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

    // Calcular la diferencia
    let delta = target - current

    // Ajustar para obtener el camino más corto
    if (delta > Math.PI) {
      delta -= 2 * Math.PI
    } else if (delta < -Math.PI) {
      delta += 2 * Math.PI
    }

    return delta
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // GUI setup
    let folderLights: GUI | null = null
    let cameraFolder: GUI | null = null
    let ditheringFolder: GUI | null = null
    let gui: GUI | null = null

    if (window.location.hash === '#controls') {
      gui = new GUI()
      folderLights = gui.addFolder('Ajustes de Luz')
      folderLights.open()

      cameraFolder = gui.addFolder('Ajustes de Camera')
      cameraFolder.open()

      ditheringFolder = gui.addFolder('Ajustes de Dithering')
      ditheringFolder.open()
    }

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current.scene = scene

    // Lighting setup using external lights configuration
    lights(scene, folderLights || undefined)

    // Raycaster setup
    const pointer = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    let isPressed = false
    let isRotating = false
    let isHovered = false
    let shakeAnimation: gsap.core.Tween | null = null

    sceneRef.current.raycaster = raycaster
    sceneRef.current.pointer = pointer
    sceneRef.current.isPressed = isPressed
    sceneRef.current.isRotating = isRotating
    sceneRef.current.isHovered = isHovered
    sceneRef.current.shakeAnimation = shakeAnimation || undefined

    // Camera setup
    const ARCamera = sizes.width / sizes.height
    let zoom = 0

    function getZoom(width: number) {
      if (width < 768) return 12.5 // mobile
      if (width < 1024) return 9 // tablet
      return 6.5 // desktop
    }

    zoom = getZoom(sizes.width)

    const camera = new THREE.OrthographicCamera(
      -ARCamera * zoom + 0.6,
      ARCamera * zoom - 1,
      zoom,
      -zoom + 0.6,
      -10,
      40
    )
    camera.position.set(-11.77, 7, 18.75)
    scene.add(camera)
    sceneRef.current.camera = camera

    // Camera GUI controls
    if (window.location.hash === '#controls' && cameraFolder && gui) {
      cameraFolder.add(camera.position, 'x', -20, 20, 0.01).name('Camera Position X')
      cameraFolder.add(camera.position, 'y', -20, 20, 0.01).name('Camera Position Y')
      cameraFolder.add(camera.position, 'z', -20, 20, 0.01).name('Camera Position Z')
      cameraFolder.add(camera, 'left', -40, 0).onChange(() => camera.updateProjectionMatrix())
      cameraFolder.add(camera, 'right', 0, 40).onChange(() => camera.updateProjectionMatrix())
      cameraFolder.add(camera, 'top', 0, 40).onChange(() => camera.updateProjectionMatrix())
      cameraFolder.add(camera, 'bottom', -40, 0).onChange(() => camera.updateProjectionMatrix())
      cameraFolder.add(camera, 'near', -10, 10).onChange(() => camera.updateProjectionMatrix())
      cameraFolder.add(camera, 'far', 0, 30).onChange(() => camera.updateProjectionMatrix())
    }

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: 'high-performance',
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true
    sceneRef.current.renderer = renderer

    // Postprocessing setup
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    let pixelSizeRatio: number, gridSize: number

    if (sizes.width < 768) {
      pixelSizeRatio = 2.0 // mobile
      gridSize = 2.0
    } else if (sizes.width < 1024) {
      pixelSizeRatio = 2.0 // tablet
      gridSize = 2.9
    } else {
      pixelSizeRatio = 2.0 // laptop & desktop
      gridSize = 3.0
    }

    const ditheringEffect = new DitheringEffect({
      pixelSizeRatio,
      gridSize,
      grayscaleOnly: false
    })

    const ditherinPass = new EffectPass(camera, ditheringEffect)
    composer.addPass(ditherinPass)
    sceneRef.current.composer = composer

    // Dithering controls
    if (window.location.hash === '#controls') {
      ditheringFolder
        ?.add({ pixelSizeRatio: 2 }, 'pixelSizeRatio', 1, 10, 0.1)
        .name('Pixelation Strength')
        .onChange((value: number) => {
          ditheringEffect.setPixelSizeRatio(value)
        })

      ditheringFolder
        ?.add({ gridSize: 3.0 }, 'gridSize', 1, 20, 0.1)
        .name('Effect Resolution')
        .onChange((value: number) => {
          ditheringEffect.setGridSize(value)
        })
    }

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false
    controls.enableDamping = false
    sceneRef.current.controls = controls

    // Mouse interaction functions
    function onMouseMoveRaycaster(event: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      pointer.x = (x / sizes.width) * 2 - 1
      pointer.y = -(y / sizes.height) * 2 + 1
    }

    function onEnter() {
      if (!sceneRef.current.model) return
      gsap.to(sceneRef.current.model.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.55)'
      })
    }

    function onLeave() {
      if (!sceneRef.current.model) return
      gsap.to(sceneRef.current.model.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.55)'
      })
    }

    function moveRaycast(event: MouseEvent) {
      if (!sceneRef.current.model) return

      // siempre actualiza pointer
      onMouseMoveRaycaster(event)

      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(sceneRef.current.model.children, true)

      const hovering = intersects.length > 0

      if (sceneRef.current.isPressed) {
        // comportamiento durante el press
        if (hovering) {
          // mantener estado hovered mientras presionas dentro
          if (!sceneRef.current.isHovered) {
            sceneRef.current.isHovered = true
            if (typeof document !== 'undefined') {
              document.body.style.cursor = 'pointer'
            }
            onEnter()
          }
        }
        // Si se sale mientras presionas, no cambia el estado para evitar el parpadeo
      } else {
        if (hovering && !sceneRef.current.isHovered) {
          sceneRef.current.isHovered = true
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer'
          }
          onEnter()
        } else if (!hovering && sceneRef.current.isHovered) {
          sceneRef.current.isHovered = false
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'default'
          }
          onLeave()
        }
      }
    }

    function onPress(event: MouseEvent) {
      if (!sceneRef.current.model) return

      onMouseMoveRaycaster(event)
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(sceneRef.current.model.children)

      if (intersects.length) {
        sceneRef.current.isPressed = true

        gsap.to(sceneRef.current.model.scale, {
          x: 0.8,
          y: 0.8,
          z: 0.8,
          duration: 0.6,
          ease: 'elastic.out(1, 0.75)'
        })

        sceneRef.current.shakeAnimation = gsap.to(sceneRef.current.model.position, {
          x: '+=0.04',
          y: '+=0.04',
          z: '+=0.04',
          yoyo: true,
          repeat: -1,
          duration: 0.05,
          ease: 'steps(10)'
        })
      }
    }

    function onRelease() {
      if (!sceneRef.current.model || !sceneRef.current.isPressed) return

      sceneRef.current.isPressed = false
      sceneRef.current.isRotating = true

      if (sceneRef.current.shakeAnimation) {
        sceneRef.current.shakeAnimation.kill()
      }

      gsap.to(sceneRef.current.model.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.55)',
        onComplete: () => {
          // después de que termine el rescale, recalculamos hover
          if (!sceneRef.current.model) return
          raycaster.setFromCamera(pointer, camera)
          const intersects = raycaster.intersectObjects(sceneRef.current.model.children, true)
          if (intersects.length) {
            if (!sceneRef.current.isHovered) {
              sceneRef.current.isHovered = true
              if (typeof document !== 'undefined') {
                document.body.style.cursor = 'pointer'
              }
              onEnter()
            }
          } else {
            if (sceneRef.current.isHovered) {
              sceneRef.current.isHovered = false
              if (typeof document !== 'undefined') {
                document.body.style.cursor = 'default'
              }
              onLeave()
            }
          }
        }
      })

      gsap.to(sceneRef.current.model.rotation, {
        z: sceneRef.current.model.rotation.z + Math.PI * 2,
        duration: 1,
        ease: 'elastic.out(1, 0.55)',
        onComplete: () => {
          // normalizar la rotacion
          if (!sceneRef.current.model) return
          sceneRef.current.model.rotation.z =
            ((sceneRef.current.model.rotation.z % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
          sceneRef.current.isRotating = false
        }
      })

      gsap.to(sceneRef.current.model.position, {
        x: 0,
        y: 0,
        z: 0
      })
    }

    // Event listeners for mouse interactions
    window.addEventListener('mousemove', moveRaycast)
    window.addEventListener('mousedown', onPress)
    window.addEventListener('mouseup', onRelease)

    // Model loading
    const loader = new GLTFLoader()

    loader.load('./logo.glb', (gltf) => {
      const model = gltf.scene
      sceneRef.current.model = model

      model.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })

      // Animations
      const initZPositions = [3.430607, 5.8232, 3.129749, 1.349015]

      gltf.scene.children.forEach((child, idx) => {
        const finalZ = child.position.z
        child.position.z = initZPositions[idx]

        gsap.fromTo(child.scale, { x: 0, y: 0, z: 0 }, { x: 178, y: 178, z: 178 })

        const offsetZ = sizes.width < 768 ? 3.5 : sizes.width < 1024 ? 2 : 0.3
        gsap.to(child.position, {
          z: finalZ - offsetZ,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: idx * 0.1
        })
      })

      scene.add(gltf.scene)
    })

    // Mouse tracking
    const mouse = {
      mouseX: 0,
      mouseY: 0,
      targetX: 0,
      targetY: 0,
      windowHalfX: sizes.width / 2,
      windowHalfY: sizes.height / 2
    }

    function onMouseMove(event: MouseEvent) {
      mouse.mouseX = event.clientX - mouse.windowHalfX
      mouse.mouseY = event.clientY - mouse.windowHalfY
    }

    document.addEventListener('mousemove', onMouseMove)

    // Animation variables
    let currentRotationX = Math.PI / 2
    let currentRotationY = 0
    const clock = new THREE.Clock()

    // Animation loop
    function animation() {
      const elapsedTime = clock.getElapsedTime()

      if (sceneRef.current.model) {
        mouse.targetX = mouse.mouseX * 0.0003
        mouse.targetY = mouse.mouseY * 0.0003

        currentRotationY += (mouse.targetX - currentRotationY) * 0.06
        currentRotationX += (mouse.targetY - currentRotationX) * 0.06

        if (sceneRef.current.model) {
          sceneRef.current.model.position.set(0, 0, 0)
        }

        sceneRef.current.model.rotation.x = currentRotationX + Math.PI / 2
        if (!sceneRef.current.isRotating) {
          const angleDiff = shortestAngleDiff(currentRotationY, sceneRef.current.model.rotation.z)
          sceneRef.current.model.rotation.z += angleDiff * 0.06
        }

        // Floating animation
        sceneRef.current.model.position.y = Math.sin(elapsedTime * 3) * 0.15
      }

      controls.update()

      composer.render()
      sceneRef.current.animationId = requestAnimationFrame(animation)
    }

    // Resize handler
    function handleResize() {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      mouse.windowHalfX = sizes.width / 2
      mouse.windowHalfY = sizes.height / 2

      const ARCamera = sizes.width / sizes.height
      let zoom: number

      zoom = getZoom(sizes.width)

      camera.left = -ARCamera * zoom + 0.6
      camera.right = ARCamera * zoom - 1
      camera.top = zoom
      camera.bottom = -zoom + 0.6
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      composer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // Start animation
    animation()

    // Cleanup function
    sceneRef.current.cleanup = () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', moveRaycast)
      window.removeEventListener('mousedown', onPress)
      window.removeEventListener('mouseup', onRelease)
      document.removeEventListener('mousemove', onMouseMove)
      if (gui) {
        gui.destroy()
      }
      if (sceneRef.current.composer) {
        sceneRef.current.composer.dispose()
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
    }

    return () => {
      if (sceneRef.current.cleanup) {
        sceneRef.current.cleanup()
      }
    }
  }, [canvasRef.current])

  return (
    <div className='w-full h-screen experience overflow-hidden relative'>
      <canvas ref={canvasRef} id='midu3d' className='absolute -z-[1]' />
      <div className='bg-image'></div>
      <div className='balls'></div>
    </div>
  )
}
