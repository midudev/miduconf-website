import confetti from 'canvas-confetti'

export function throwConfetti() {
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    zIndex: 9999999
  })
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    zIndex: 9999999
  })
}
