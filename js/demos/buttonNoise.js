import {generator, Scope} from './util.js'

export const buttonNoise = (audioCtx, element) => {

  const button = element.querySelector('button')

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

  const noise = sound(0.5, t => Math.random() * 0.2)

  button.addEventListener('click', noise)
}
