import Scope from './Scope.js'

const analyser = (audioCtx, element) => {

  const media = element.querySelector('audio')
  const range = element.querySelector('input')
  const canvas = element.querySelector('canvas')


  const source = audioCtx.createMediaElementSource(media)
  const gain = audioCtx.createGain()
  const analyser = audioCtx.createAnalyser()

  // create the audio graph
  source.connect(gain)
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

}


export default analyser
