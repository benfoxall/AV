export const generator = (audioCtx, target) => (seconds, fn) => {
  const { sampleRate } = audioCtx

  const buffer = audioCtx.createBuffer(
      1, sampleRate * seconds, sampleRate
  )
  const data = buffer.getChannelData(0)

  for (var i = 0; i < data.length; i++) {
    data[i] = fn(i / sampleRate, seconds)
  }

  return () => {
    const source = audioCtx.createBufferSource()
    source.buffer = buffer

    console.log('connect', target)
    source.connect(target || audioCtx.destination)
    source.start()
  }
}



export class Scope {

  constructor(analyser, canvas) {

    const ctx = canvas.getContext('2d')
    const frequencies = new Uint8Array(analyser.frequencyBinCount)
    const waveform = new Uint8Array(analyser.fftSize)

    Object.assign(this, {analyser, canvas, ctx, frequencies, waveform})

  }

  render() {

    const {analyser, canvas, ctx, frequencies, waveform} = this

    analyser.getByteFrequencyData(frequencies)
    analyser.getByteTimeDomainData(waveform)

    const {width, height} = canvas

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = '#ff0043'
    ctx.beginPath()
    frequencies.forEach((value, i) => {
      ctx.lineTo((i / frequencies.length) * width, (1-(value / 255)) * height * 0.95)
    })
    ctx.stroke()

    ctx.strokeStyle = '#3f023f'
    ctx.beginPath()
    waveform.forEach((value, i) => {
      ctx.lineTo((i / waveform.length) * width, (value / 255) * height)
    })
    ctx.stroke()


  }

}
