
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

  // Salida final preservando el canal alfa
  outputColor = vec4(baseColor * 2.0, inputColor.a);
}
