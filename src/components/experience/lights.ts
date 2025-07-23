import * as THREE from 'three'
import GUI from 'lil-gui'

interface LightConfig {
  color: number
  intensity: number
  distance: number
  angle: number
  positionX: number
  positionY: number
  positionZ: number
  positionRotationX: number
  positionRotationY: number
  positionRotationZ: number
  penumbra: number
  decay: number
  isCastShadow: boolean
  mapSizeWidth: number
  mapSizeHeight: number
  cameraFov: number
  cameraNear: number
  cameraFar: number
  shadowBias: number
  shadowRadius: number
}

export const lights = (scene: THREE.Scene, folderLights?: GUI) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(ambientLight)

  const lightsConfig: LightConfig[] = [
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

  lightsConfig.forEach(
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
      
      // spotLight settings
      spotLight.distance = distance
      spotLight.position.set(positionX, positionY, positionZ)
      spotLight.target.position.set(
        positionRotationX,
        positionRotationY,
        positionRotationZ
      )
      spotLight.penumbra = penumbra
      spotLight.decay = decay

      // shadows
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

      const spotLightCameraHelper = new THREE.CameraHelper(
        spotLight.shadow.camera
      )
      spotLightCameraHelper.visible = false
      scene.add(spotLightCameraHelper)

      if (typeof window !== 'undefined' && window.location.hash === '#controls' && folderLights) {
        const lightFolder = folderLights.addFolder(`Light ${idx + 1}`)
        lightFolder.close()

        lightFolder.add(spotLight, 'visible').name('Light Visible/Hidden')
        lightFolder
          .add(spotLightCameraHelper, 'visible')
          .name('Light Helper Visible/Hidden')
        lightFolder
          .add(spotLight.position, 'x', -40, 40, 0.01)
          .name('Light Position X')
        lightFolder
          .add(spotLight.position, 'y', -40, 40, 0.01)
          .name('Light Position Y')
        lightFolder
          .add(spotLight.position, 'z', -40, 40, 0.01)
          .name('Light Position Z')
        lightFolder
          .add(spotLight.target.position, 'x', -30, 30, 0.01)
          .name('Light Rotation X')
        lightFolder
          .add(spotLight.target.position, 'y', -30, 30, 0.01)
          .name('Light Rotation Y')
        lightFolder
          .add(spotLight.target.position, 'z', -30, 30, 0.01)
          .name('Light Rotation Z')
        lightFolder
          .add(spotLight, 'intensity', 0, 15, 0.01)
          .name('Light Intensity')
        lightFolder
          .add(spotLight, 'distance', 0, 30, 0.01)
          .name('Light Distance')
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
        lightFolder
          .add(spotLight, 'angle', 0, Math.PI / 2, 0.001)
          .name('Light Angle')
        lightFolder
          .add(spotLight, 'penumbra', 0, 1, 0.01)
          .name('Light Penumbra')
        lightFolder.add(spotLight, 'decay', 0, 2, 0.01).name('Light Decay')
        lightFolder
          .addColor({ color: spotLight.color.getHex() }, 'color')
          .name('Light Color')
          .onChange((c: number) => spotLight.color.setHex(c))
        lightFolder.add(spotLight, 'castShadow').name('Cast Shadows')
        lightFolder
          .add(spotLight.shadow, 'bias', -0.1, 0.1, 0.0001)
          .name('Shadow Bias')
        lightFolder
          .add(spotLight.shadow.mapSize, 'width', 128, 2048, 1)
          .name('Shadow Map Width')
          .onChange(
            () =>
              (spotLight.shadow.mapSize.height =
                spotLight.shadow.mapSize.width)
          )
        lightFolder
          .add(spotLight.shadow, 'radius', 1, 20, 0.1)
          .name('Shadow Radius')
      }
    }
  )
}