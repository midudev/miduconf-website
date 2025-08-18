'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectPass, RenderPass, EffectComposer } from 'postprocessing'
import { DitheringEffect } from './experience/DitheringEffect'

const vertexShader = `
	void main() {
		gl_Position = vec4(position, 1.0);
	}
`

const fragmentShader = `
	precision lowp float;

	// Uniforms
	uniform vec2 uResolution;
	uniform float uTime;

	// Salida
	out vec4 fragColor;

	float hash31(vec3 p) {
		p = fract(p * vec3(443.8975, 397.2973, 491.1871));
		p += dot(p, p.yzx + 19.19);
		return fract((p.x + p.y) * p.z);
	}

	// Value noise 3D
	float valueNoise3(vec3 p) {
		vec3 i = floor(p);
		vec3 f = fract(p);
		
		// Interpolación suave
		vec3 u = f * f * (3.0 - 2.0 * f);
		
		// 8 esquinas del cubo
		float n000 = hash31(i + vec3(0,0,0));
		float n100 = hash31(i + vec3(1,0,0));
		float n010 = hash31(i + vec3(0,1,0));
		float n110 = hash31(i + vec3(1,1,0));
		float n001 = hash31(i + vec3(0,0,1));
		float n101 = hash31(i + vec3(1,0,1));
		float n011 = hash31(i + vec3(0,1,1));
		float n111 = hash31(i + vec3(1,1,1));
		
		// Interpolación trilineal
		return mix(
			mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
			mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y),
			u.z
		);
	}

	// fBm con parámetros optimizados
	float fbm3(vec3 p) {
		float value = 0.2;
		float amplitude = 0.48;
		float frequency = 1.0;
		
		// Matriz de rotación suave
		mat2 R = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
		
		for (int i = 0; i < 3; i++) {
			value += valueNoise3(p * frequency) * amplitude;
			
			// Rotación suave en XY
			p.xy = R * p.xy;
			// Desplazamiento temporal suave en Z
			p.z += amplitude * 1.0;
			
			frequency *= 1.9;
			amplitude *= 0.8;
		}
		
		return value;
	}

	float soft(float x, float a, float b){ return smoothstep(a, b, x); }

	void main() {
		// coords centradas manteniendo relación de aspecto
		vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
		float t = uTime * 0.1;

		// ruido base: baja frecuencia -> manchas grandes
		float n = fbm3(vec3(p * 3.0, t));

		// === CONTROL DE COBERTURA ===
		// Aumentar el TH_CORE para MÁS negro (menos manchas)
		const float TH_CORE  = 0.88; // 0.70–0.85
		const float FEATHER  = 0.30; // 0.05–0.20 suavidad borde

		// núcleo de la mancha y halo difuso
		float core = soft(n, TH_CORE, TH_CORE + FEATHER);
		float halo = soft(n, TH_CORE - 0.10, TH_CORE + FEATHER * 0.5) - core;

		// colores
		vec3 bg   = vec3(0.0, 0.0, 0.0); // casi negro (#09090e aprox)
		vec3 blue = vec3(0.208,0.114,0.408); // #5A8CF6

		// composición: fondo negro, halo suave y centro azul
		vec3 col = bg;
		col += blue * 0.25 * halo; // "blur" alrededor
		col  = mix(col, blue, core); // centro saturado

		float alpha = core + halo * 0.25;
		fragColor = vec4(col, alpha);  // opaco para garantizar fondo negro
	}
`

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene?: THREE.Scene
    camera?: THREE.OrthographicCamera
    renderer?: THREE.WebGLRenderer
    composer?: EffectComposer
    material?: THREE.ShaderMaterial
    animationId?: number
    cleanup?: () => void
    isVisible?: boolean
  }>({})

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current.scene = scene

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    scene.add(camera)
    sceneRef.current.camera = camera

    // Shader material setup
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2() },
        uTime: { value: 0 }
      },
      glslVersion: THREE.GLSL3
    })
    sceneRef.current.material = material

    // Plane mesh setup
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(plane)

    // Renderer setup with WebGL2 context
    const gl = canvas.getContext('webgl2')
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl as WebGLRenderingContext,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'lowp',
      antialias: false
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    sceneRef.current.renderer = renderer

    // Initial render
    renderer.render(scene, camera)

    // Custom dithering configuration
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
      gridSize = 3.2
    } else {
      pixelSizeRatio = 2.0 // desktop
      gridSize = 4.0
    }

    const ditheringEffect = new DitheringEffect({
      pixelSizeRatio,
      gridSize,
      grayscaleOnly: false
    })

    const ditheringPass = new EffectPass(camera, ditheringEffect)
    composer.addPass(ditheringPass)
    sceneRef.current.composer = composer

    let resizeTimeout: NodeJS.Timeout

    // Resize handler
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        renderer.setSize(sizes.width, sizes.height)
        material.uniforms.uResolution.value.set(sizes.width, sizes.height)

        if (composer && composer.setSize) {
          composer.setSize(sizes.width, sizes.height)
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }, 100)
    }

    // Initial resize call
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    sceneRef.current.isVisible = true

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sceneRef.current.isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    // Animation setup
    const clock = new THREE.Clock()

    // limitar a 30 FPS sino se dispara el consumo de CPU/GPU
    const targetFPS = 30
    const frameTime = 1000 / targetFPS
    let lastTime = 0

    function animate(currentTime: number) {
      if (currentTime - lastTime < frameTime) {
        sceneRef.current.animationId = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      if (!sceneRef.current.isVisible) {
        sceneRef.current.animationId = requestAnimationFrame(animate)
        return
      }

      const elapsedTime = clock.getElapsedTime()

      if (sceneRef.current.material) {
        sceneRef.current.material.uniforms.uTime.value = elapsedTime
      }

      if (sceneRef.current.composer) {
        sceneRef.current.composer.render()
      }

      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate(0)

    // Cleanup function
    sceneRef.current.cleanup = () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }

      clearTimeout(resizeTimeout)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })

      if (sceneRef.current.composer) {
        sceneRef.current.composer.dispose()
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose()
      }
      if (sceneRef.current.material) {
        sceneRef.current.material.dispose()
      }
    }
  }, []) // Empty dependency array - only run once on mount

  return (
    <canvas
      ref={canvasRef}
      id='bg3d'
      className='absolute inset-0 w-full h-screen -z-[2] bg-transparent'
    />
  )
}
