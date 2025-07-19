'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectPass, RenderPass, EffectComposer } from 'postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DitheringEffect } from './DitheringEffect'
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
  }>({})

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

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const lights = [
      {
        color: 0x9793b4,
        intensity: 9.45,
        distance: 12.85,
        angle: 1.57079,
        positionX: -12.04,
        positionY: 12.34,
        positionZ: -0.46,
        positionRotationX: 10.37,
        positionRotationY: -16.33,
        positionRotationZ: -0.23,
        penumbra: 0.32,
        decay: 0.19,
        isCastShadow: true,
        mapSizeWidth: 1024,
        mapSizeHeight: 1024,
        cameraFov: 44.89,
        cameraNear: 3.35,
        cameraFar: 14.47,
        shadowBias: 0.1,
        shadowRadius: 3.9
      },
      {
        color: 0x9793b4,
        intensity: 8.52,
        distance: 27.25,
        angle: 0.687,
        positionX: -2.29,
        positionY: 22.2,
        positionZ: 5.45,
        positionRotationX: 4.87,
        positionRotationY: -16.33,
        positionRotationZ: -0.23,
        penumbra: 0,
        decay: 0.4,
        isCastShadow: true,
        mapSizeWidth: 1024,
        mapSizeHeight: 1024,
        cameraFov: 33.18,
        cameraNear: 25.13,
        cameraFar: 45.03,
        shadowBias: 0.1,
        shadowRadius: 3.9
      },
      {
        color: 0x5a8cf6,
        intensity: 2.68,
        distance: 24.11,
        angle: 1.57079,
        positionX: -7.52,
        positionY: 1.26,
        positionZ: 7.54,
        positionRotationX: -7.21,
        positionRotationY: 1.73,
        positionRotationZ: 0.16,
        penumbra: 0.31,
        decay: 0.95,
        isCastShadow: true,
        mapSizeWidth: 1032,
        mapSizeHeight: 1032,
        cameraFov: 27.64,
        cameraNear: 5.74,
        cameraFar: 17.55,
        shadowBias: 0.0136,
        shadowRadius: 11.3
      },
      {
        color: 0x5a8cf6,
        intensity: 4.58,
        distance: 24.46,
        angle: 1.201,
        positionX: 3.59,
        positionY: 0.85999,
        positionZ: 7.86,
        positionRotationX: -8.7,
        positionRotationY: 0.46999,
        positionRotationZ: -7.42,
        penumbra: 0.4,
        decay: 0.9,
        isCastShadow: true,
        mapSizeWidth: 1035,
        mapSizeHeight: 1035,
        cameraFov: 27.64,
        cameraNear: 5.74,
        cameraFar: 24.44,
        shadowBias: 0.0121,
        shadowRadius: 11.3
      }
    ]

    lights.forEach(
      (
        {
          color,
          intensity,
          distance,
          angle,
          positionX,
          positionY,
          positionZ,
          positionRotationX,
          positionRotationY,
          positionRotationZ,
          penumbra,
          decay,
          isCastShadow,
          mapSizeWidth,
          mapSizeHeight,
          cameraFov,
          cameraFar,
          cameraNear,
          shadowBias,
          shadowRadius
        },
        idx
      ) => {
        const spotLight = new THREE.SpotLight(color, intensity, distance, angle)
        spotLight.distance = distance
        spotLight.position.set(positionX, positionY, positionZ)
        spotLight.target.position.set(positionRotationX, positionRotationY, positionRotationZ)
        spotLight.penumbra = penumbra
        spotLight.decay = decay

        spotLight.castShadow = isCastShadow
        spotLight.shadow.mapSize.width = mapSizeWidth
        spotLight.shadow.mapSize.height = mapSizeHeight
        spotLight.shadow.camera.fov = cameraFov
        spotLight.shadow.camera.near = cameraNear
        spotLight.shadow.camera.far = cameraFar
        spotLight.shadow.bias = shadowBias
        spotLight.shadow.radius = shadowRadius

        scene.add(spotLight)
        scene.add(spotLight.target)

        const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
        spotLightCameraHelper.visible = false
        scene.add(spotLightCameraHelper)

        // GUI controls
        if (window.location.hash === '#controls' && folderLights && gui) {
          const lightFolder = folderLights.addFolder(`Light ${idx + 1}`)
          lightFolder.close()

          lightFolder.add(spotLight, 'visible').name('Light Visible/Hidden')
          lightFolder.add(spotLightCameraHelper, 'visible').name('Light Helper Visible/Hidden')
          lightFolder.add(spotLight.position, 'x', -40, 40, 0.01).name('Light Position X')
          lightFolder.add(spotLight.position, 'y', -40, 40, 0.01).name('Light Position Y')
          lightFolder.add(spotLight.position, 'z', -40, 40, 0.01).name('Light Position Z')
          lightFolder.add(spotLight.target.position, 'x', -30, 30, 0.01).name('Light Rotation X')
          lightFolder.add(spotLight.target.position, 'y', -30, 30, 0.01).name('Light Rotation Y')
          lightFolder.add(spotLight.target.position, 'z', -30, 30, 0.01).name('Light Rotation Z')
          lightFolder.add(spotLight, 'intensity', 0, 15, 0.01).name('Light Intensity')
          lightFolder.add(spotLight, 'distance', 0, 30, 0.01).name('Light Distance')
          lightFolder
            .add(spotLight.shadow.camera, 'far', 0, 100, 0.01)
            .name('Light Far')
            .onChange(() => {
              spotLight.shadow.camera.updateProjectionMatrix()
              spotLightCameraHelper.update()
            })
          lightFolder
            .add(spotLight.shadow.camera, 'near', 0, 50, 0.01)
            .name('Light Near')
            .onChange(() => {
              spotLight.shadow.camera.updateProjectionMatrix()
              spotLightCameraHelper.update()
            })
          lightFolder
            .add(spotLight.shadow.camera, 'fov', 1, 180, 0.01)
            .name('Shadow Camera FOV')
            .onChange(() => {
              spotLight.shadow.camera.updateProjectionMatrix()
              spotLightCameraHelper.update()
            })
          lightFolder.add(spotLight, 'angle', 0, Math.PI / 2, 0.001).name('Light Angle')
          lightFolder.add(spotLight, 'penumbra', 0, 1, 0.01).name('Light Penumbra')
          lightFolder.add(spotLight, 'decay', 0, 2, 0.01).name('Light Decay')
          lightFolder
            .addColor({ color: spotLight.color.getHex() }, 'color')
            .name('Light Color')
            .onChange((c: number) => spotLight.color.setHex(c))
          lightFolder.add(spotLight, 'castShadow').name('Cast Shadows')
          lightFolder.add(spotLight.shadow, 'bias', -0.1, 0.1, 0.0001).name('Shadow Bias')
          lightFolder
            .add(spotLight.shadow.mapSize, 'width', 128, 2048, 1)
            .name('Shadow Map Width')
            .onChange(() => {
              spotLight.shadow.mapSize.height = spotLight.shadow.mapSize.width
            })
          lightFolder.add(spotLight.shadow, 'radius', 1, 20, 0.1).name('Shadow Radius')
        }
      }
    )

    // Camera setup
    const ARCamera = sizes.width / sizes.height
    let zoom = 0
    if (sizes.width < 768) {
      zoom = 12.5 // mobile
    } else if (sizes.width < 1024) {
      zoom = 9 // tablet
    } else {
      zoom = 6.5 // laptop & desktop
    }

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

    // Environment setup
    const hdr = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/je_gray_park_1k.hdr'

    new RGBELoader().load(hdr, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      scene.environmentIntensity = 0.02
    })

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

        gsap.to(child.position, {
          z: finalZ,
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
        mouse.targetX = mouse.mouseX * 0.0002
        mouse.targetY = mouse.mouseY * 0.0002

        currentRotationY += (mouse.targetX - currentRotationY) * 0.06
        currentRotationX += (mouse.targetY - currentRotationX) * 0.06

        sceneRef.current.model.rotation.x = currentRotationX + Math.PI / 2
        sceneRef.current.model.rotation.z = currentRotationY

        sceneRef.current.model.position.y = Math.sin(elapsedTime * 0.14)
      }

      controls.update()
      camera.lookAt(new THREE.Vector3(0, 0, 0))

      composer.render()
      sceneRef.current.animationId = requestAnimationFrame(animation)
    }

    // Resize handler
    function handleResize() {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      const ARCamera = sizes.width / sizes.height
      let zoom: number

      if (sizes.width < 768) {
        zoom = 14 // mobile
      } else if (sizes.width < 1024) {
        zoom = 9 // tablet
      } else {
        zoom = 7 // laptop & desktop
      }

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
    <div className='w-full h-screen'>
      <div className='absolute w-full h-screen bg-gradient-radial from-transparent from-40% to-black to-70%' />
      <canvas ref={canvasRef} className='absolute h-48 -z-[1]' />
      <div
        className='block balls absolute w-full h-screen -z-[2] bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: 'url("/img/balls.png")' }}
      />
    </div>
  )
}
