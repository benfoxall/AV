import Scope from './Scope.js'

const maths = (audioCtx, element) => {

  const image = element.querySelector('img')
  const play = element.querySelector('button')

  const range = element.querySelector('input')
  const canvas = element.querySelector('canvas')

  const gain = audioCtx.createGain()
  const analyser = audioCtx.createAnalyser()

  // create the audio graph
  // source.connect(gain)
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

  play.addEventListener('click', () => {

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0, 0)
    const id = ctx.getImageData(0,0,50,50)

    console.log(id)





  })


}


export default maths
