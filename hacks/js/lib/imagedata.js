import Scope from './Scope.js'

import {
  imageDataToGrayscale
} from './pixelUtil.js'

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
    canvas.width = canvas.height = 420

    const ctx = canvas.getContext('2d')

    // const buff = canvasToBuffer(ctx)

    // 88200 = 210 × 420
    // 88200 x 2 = 420 x 420

    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 420, 420)
    const id = ctx.getImageData(0,0,420,420)

    console.log(id)

    const grayscale = imageDataToGrayscale(id.data)

    console.log(grayscale)



    const audioBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 2, audioCtx.sampleRate)

    let data = audioBuffer.getChannelData(0)
    for (var i = 0; i < data.length; i++) {
      data[i] = grayscale[i] / 255
    }

    data = audioBuffer.getChannelData(1)
    for (var i = 0; i < data.length; i++) {
      data[i] = grayscale[i + data.length] / 255
    }



    const buffer = audioCtx.createBufferSource()
    buffer.buffer = audioBuffer

    buffer.connect(gain)
    buffer.start()



  })


}


export default maths
