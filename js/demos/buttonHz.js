import {generator, Scope} from './util.js'

export const buttonHz = (audioCtx, element) => {

  const buttons = element.querySelectorAll('button')

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


  const sound = generator(audioCtx, gain)

  // Math.sin with period of 0..1
  const sin = v => Math.sin(Math.PI * 2 * v)

  const _440hz = sound(0.5, t => sin(t * 440))
  const _880hz = sound(0.5, t => sin(t * 880))

  buttons[0].addEventListener('click', _440hz)
  buttons[1].addEventListener('click', _880hz)


}
