import Scope from './Scope.js'

const maths = (audioCtx, element) => {

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



  Array.from(element.querySelectorAll('.scripts button'))
  .forEach(script => {

    const fn = new Function('i', 'return ' +  script.innerText)
    let audioBuffer

    script.addEventListener('click', () => {

      if(!audioBuffer) {

        audioBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate)
        const data = audioBuffer.getChannelData(0)

        for (var i = 0; i < data.length; i++) {
          data[i] = fn(i)
        }
        console.log(data.length)
      }


      const buffer = audioCtx.createBufferSource()
      buffer.buffer = audioBuffer

      buffer.connect(gain)
      buffer.start()

    })

  })



}


export default maths
