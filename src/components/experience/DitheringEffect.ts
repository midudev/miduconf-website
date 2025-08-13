import { Effect } from 'postprocessing'
import * as THREE from 'three'

const ditheringShader = `
uniform vec2 u_resolution;
uniform float u_gridSize;
uniform float u_luminanceMethod;
uniform float u_invertColor;
uniform float u_pixelSizeRatio;
uniform float u_grayscaleOnly;

// FUNCIÓN GETVALUE - CRÉDITO: Klems (Shadertoy)
// https://www.shadertoy.com/view/ltSSzW
bool getValue(float brightness, vec2 pos) {
  // Casos extremos
  if (brightness > 16.0/17.0) return false;
  if (brightness < 1.0/17.0) return true;
  
  // Calcular posición en la matriz 4x4
  vec2 pixel = floor(mod(pos.xy / u_gridSize, 4.0));
  int x = int(pixel.x);
  int y = int(pixel.y);
  
  // Matriz de Bayer 4x4 - más eficiente
  if (x == 0) {
    if (y == 0) return brightness < 16.0/17.0;
    if (y == 1) return brightness < 5.0/17.0;
    if (y == 2) return brightness < 13.0/17.0;
    return brightness < 1.0/17.0; // y == 3
  } 
  else if (x == 1) {
    if (y == 0) return brightness < 8.0/17.0;
    if (y == 1) return brightness < 12.0/17.0;
    if (y == 2) return brightness < 4.0/17.0;
    return brightness < 9.0/17.0; // y == 3
  }
  else if (x == 2) {
    if (y == 0) return brightness < 14.0/17.0;
    if (y == 1) return brightness < 2.0/17.0;
    if (y == 2) return brightness < 15.0/17.0;
    return brightness < 3.0/17.0; // y == 3
  }
  else { // x == 3
    if (y == 0) return brightness < 6.0/17.0;
    if (y == 1) return brightness < 10.0/17.0;
    if (y == 2) return brightness < 7.0/17.0;
    return brightness < 11.0/17.0; // y == 3
  }
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 fragCoord = uv * u_resolution;
  vec3 baseColor;

  // Aplicar pixelación
  float pixelSize = u_gridSize * u_pixelSizeRatio;
  vec2 pixelatedUV = floor(fragCoord / pixelSize) * pixelSize / u_resolution;
  baseColor = texture2D(inputBuffer, pixelatedUV).rgb;
  
  // Calcular luminancia
  float luminance = dot(baseColor, vec3(1.0, 1.0, 1.0));
  
  // Aplicar escala de grises si está habilitado
  if (u_grayscaleOnly > 0.0) {
    baseColor = vec3(luminance);
  }
      
  // Aplicar patrón de dithering
  bool dithered = getValue(luminance, fragCoord);
  
  // Crear versión con dithering del píxel
  vec3 ditherColor = dithered ? vec3(0.0) : baseColor;
  
  // Aplicar dithering solo al píxel específico
  vec2 currentPixel = floor(fragCoord / pixelSize);
  vec2 originalPixel = floor(uv * u_resolution / pixelSize);
  
  baseColor = (currentPixel == originalPixel) ? ditherColor : baseColor;

  // Invertir color
  if (u_invertColor > 0.0) {
    baseColor = 1.0 - baseColor;
  }

    // Función para aumentar saturación
    float saturation = 1.2; // Ajusta este valor para más/menos saturación
    float luma = dot(baseColor, vec3(0.299, 0.587, 0.114));
    baseColor = mix(vec3(luma), baseColor, saturation);
    // Salida final preservando el canal alfa
    outputColor = vec4(baseColor, inputColor.a);
}
`

export class DitheringEffect extends Effect {
  constructor({
    time = 0, // tiempo
    resolution = new THREE.Vector2(1, 1), // resolucion
    gridSize = 4.0, // Tamaño del patrón
    luminanceMethod = 0, // Método de luminancia
    invertColor = false, // Invertir colores
    pixelSizeRatio = 1, // Multiplicador de pixelación
    grayscaleOnly = false // Solo escala de grises
  } = {}) {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ['u_time', new THREE.Uniform(time)],
      ['u_resolution', new THREE.Uniform(resolution)],
      ['u_gridSize', new THREE.Uniform(gridSize)],
      ['u_luminanceMethod', new THREE.Uniform(luminanceMethod)],
      ['u_invertColor', new THREE.Uniform(invertColor ? 1 : 0)], // Bool → Float
      ['u_ditheringEnabled', new THREE.Uniform(1)], // Siempre habilitado
      ['u_pixelSizeRatio', new THREE.Uniform(pixelSizeRatio)],
      ['u_grayscaleOnly', new THREE.Uniform(grayscaleOnly ? 1 : 0)]
    ])

    super('DitheringEffect', ditheringShader, { uniforms })
  }

  update(renderer, inputBuffer, deltaTime) {
    // ::::::: ACTUALIZAR TIEMPO :::::::
    const timeUniform = this.uniforms.get('u_time')
    if (timeUniform !== undefined && typeof timeUniform.value === 'number') {
      timeUniform.value += deltaTime // Tiempo acumulativo
    }

    // :::::: ACTUALIZAR RESOLUCIÓN ::::::
    // Importante: debe coincidir con el render target actual
    const resolutionUniform = this.uniforms.get('u_resolution')
    if (resolutionUniform !== undefined && resolutionUniform.value instanceof THREE.Vector2) {
      resolutionUniform.value.set(
        inputBuffer.width, // Ancho del buffer
        inputBuffer.height // Alto del buffer
      )
    }
  }

  // Cambiar tamaño del patrón en tiempo real
  setGridSize(size: number) {
    const gridSizeUniform = this.uniforms.get('u_gridSize')
    if (gridSizeUniform !== undefined) {
      gridSizeUniform.value = size // Actualiza uniform en GPU
    }
  }

  // Cambiar intensidad de pixelación
  setPixelSizeRatio(ratio: number) {
    const pixelSizeRatioUniform = this.uniforms.get('u_pixelSizeRatio')
    if (pixelSizeRatioUniform !== undefined) {
      pixelSizeRatioUniform.value = ratio
    }
  }

  // Activar/desactivar escala de grises
  setGrayscaleOnly(grayscaleOnly: boolean) {
    const grayscaleOnlyUniform = this.uniforms.get('u_grayscaleOnly')
    if (grayscaleOnlyUniform !== undefined) {
      grayscaleOnlyUniform.value = grayscaleOnly ? 1 : 0 // Bool → Float
    }
  }

  // Activar/desactivar inversión
  setInvertColor(invert: boolean) {
    const invertColorUniform = this.uniforms.get('u_invertColor')
    if (invertColorUniform !== undefined) {
      invertColorUniform.value = invert ? 1 : 0
    }
  }
}
