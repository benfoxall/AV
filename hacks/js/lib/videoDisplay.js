import Scope from './Scope.js'

import {
  imageDataToGrayscale,
  grayscaleToImageData,
  interleaveMap
} from './pixelUtil.js'

const video = (audioCtx, element) => {

  const record = element.querySelector('button')

  const range = element.querySelector('input')
  const canvas = element.querySelector('canvas')

  const gain0 = audioCtx.createGain()
  const analyser = audioCtx.createAnalyser()
  gain0.gain.value = 0

  // create the audio graph
  // source.connect(gain)
  gain0.connect(analyser)
  analyser.connect(audioCtx.destination)

  // connect gain
  // range.addEventListener('input', () =>
  //   gain.gain.value = parseFloat(range.value)
  // )


  // draw to canvas
  // const scope = new Scope(analyser, canvas)

  canvas.width = canvas.height = 420
  const ctx = canvas.getContext('2d')
  const im_d = ctx.getImageData(0,0,420,420)

  // const frequencies = new Uint8Array(analyser.frequencyBinCount)
  const waveform = new Uint8Array(analyser.fftSize)

  const gray = new Array

  window.wav = waveform

  // let at = 0
  //
  // const animate = () => {
  //   requestAnimationFrame(animate)
  //
  //   // analyser.getByteFrequencyData(frequencies)
  //   analyser.getByteTimeDomainData(waveform)
  //   // id.data.set(waveform, at)
  //
  //   grayscaleToImageData(waveform, id.data, at)
  //   ctx.putImageData(id, 0,0)
  //   // document.body.appendChild(canvas)
  //
  //   at += 440
  //
  //   at = at % (440 * 400)
  //
  //
  //   ctx.putImageData(id, 0, 0)
  //
  //   // scope.render()
  // }
  //
  // animate()

  console.log(ctx)

  record.addEventListener('click', async () => {


    const stream = await navigator.mediaDevices.getUserMedia({audio: true})


    const source = audioCtx.createMediaStreamSource(stream)


    const node = audioCtx.createScriptProcessor(8192,2,2)
    // node.onaudioprocess = evt => {
    //   // ctx.drawImage(video, 0, 0)
    //   // const imData = ctx.getImageData(0,0,90,64)
    //
    //   const outputBuffer = evt.outputBuffer
    //   const auData = outputBuffer.getChannelData(0)
    //   const auData1 = outputBuffer.getChannelData(1)
    //
    //   // auData.fill(150)
    //
    //   // const l = 90*32
    //   // for (var i = 0; i < l; i++) {
    //   //
    //   //   auData[i * 3    ] = imData.data[i * 4    ]
    //   //   auData[i * 3 + 1] = imData.data[i * 4 + 1]
    //   //   auData[i * 3 + 2] = imData.data[i * 4 + 2]
    //   //
    //   //   auData1[i * 3    ] = imData.data[(i + l) * 4    ]
    //   //   auData1[i * 3 + 1] = imData.data[(i + l) * 4 + 1]
    //   //   auData1[i * 3 + 2] = imData.data[(i + l) * 4 + 2]
    //   // }
    //
    //   // id.data.set(auData, 0)
    //   // id.data.set(auData2, auData.length)
    //
    //   grayscaleToImageData(auData, im_d.data)
    //   // grayscaleToImageData(id.data, auData2, auData.length)
    //
    //   // id.data.fill(0)
    //
    //   ctx.putImageData(im_d, 0, 0)
    //
    //   // requestAnimationFrame(draw.bind(null, auData, auData1))
    //
    // }

    let off = 0

    const grey = new Uint8ClampedArray(420 * 420)

    node.onaudioprocess = evt => {


      const inputBuffer = evt.inputBuffer
      const inData = inputBuffer.getChannelData(0)
      const inData1 = inputBuffer.getChannelData(1)

      const gray = inData.map(i => i * 2000)
      const gray1 = inData1.map(i => i * 2000)

      // gray.fill(255)
      // gray1.fill(255)

      for (var i = 0; i < gray.length; i++) {
        grey[(i*2) + off] = gray[i]
        grey[(i*2) + off + 1] = gray1[i]
      }

      // grey.set(gray, off)
      // grey.set(gray1, gray.length + off)

      off += gray.length * 2
      off = off % ((420 * 420) - (gray.length * 2))

      // grayscaleToImageData(gray, im_d.data + off)
      // grayscaleToImageData(gray1, im_d.data, gray.length + off)

      grayscaleToImageData(grey, im_d.data)

      // off += 10

      // off = off % 10000

      window.xx = inData

      ctx.putImageData(im_d, 0, 0)

      // for (let i = 0; i < inData.length; i++) {
        // auData[i] = Math.random()
        // auData1[i] = Math.random()
        // auData1[i] = imData.data[i + auData.length]
      // }



      const outputBuffer = evt.outputBuffer
      const auData = outputBuffer.getChannelData(0)
      const auData1 = outputBuffer.getChannelData(1)

      for (let i = 0; i < auData.length; i++) {
        // auData[i] = Math.random()
        // auData1[i] = Math.random()
        // auData1[i] = imData.data[i + auData.length]
      }
    }



    source.connect(node)
    node.connect(analyser)




  })


}


export default video
