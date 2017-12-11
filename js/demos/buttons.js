import {generator, Scope} from './util.js'


const setup = (audioCtx, element) => {

  const range = element.querySelector('input')
  const canvas = element.querySelector('canvas')

  const gain = audioCtx.createGain()
  const analyser = audioCtx.createAnalyser()


  gain.connect(analyser)
  analyser.connect(audioCtx.destination)


  // connect gain
  range.addEventListener('input', () =>
    gain.gain.value = parseFloat(range.value)
  )

  // draw to canvas
  const scope = new Scope(analyser, canvas)
  const animate = () => {
    requestAnimationFrame(animate)
    scope.render()
  }

  animate()


  return generator(audioCtx, gain)

}


// Math.sin with period of 0..1
const sin = v => Math.sin(Math.PI * 2 * v)

const harmony = f => t =>
  sin(f * t) +
  (sin(f * t * 3) / 3) +
  (sin(f * t * 7) / 7)


export const buttonNoise = (audioCtx, element) => {

  const sound = setup(audioCtx, element)

  const buttons = element.querySelectorAll('button')

  const noise = sound(0.5, t => Math.random() * 0.2)

  buttons[0].addEventListener('click', noise)
}



export const buttonHz = (audioCtx, element) => {

  const sound = setup(audioCtx, element)

  const buttons = element.querySelectorAll('button')

  const _440hz = sound(0.5, t => sin(t * 440))
  const _880hz = sound(0.5, t => sin(t * 880))

  buttons[0].addEventListener('click', _440hz)
  buttons[1].addEventListener('click', _880hz)


}


export const buttonHarmony = (audioCtx, element) => {

  const sound = setup(audioCtx, element)

  const buttons = element.querySelectorAll('button')

  const _440hz = sound(0.5, harmony(440))
  const _880hz = sound(0.5, harmony(880))

  buttons[0].addEventListener('click', _440hz)
  buttons[1].addEventListener('click', _880hz)

}
