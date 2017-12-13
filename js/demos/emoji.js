import {Scope} from './util.js'
import Demo from './Base.js'

export class emoji extends Demo {
  start () {
    const {element, audioCtx} = this

    const media = element.querySelector('audio')
    const range = element.querySelector('input')
    const emoji = element.querySelectorAll('.emoji span')


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


    window.a = analyser

    const frequencies = new Uint8Array(analyser.frequencyBinCount)
    const waveform = new Uint8Array(analyser.fftSize)


    const animate = () => {
      this.raf = requestAnimationFrame(animate)

      analyser.getByteFrequencyData(frequencies)
      analyser.getByteTimeDomainData(waveform)


      emoji.forEach(
        (s, i) => s.style.transform = `scale(${1 + (frequencies[i]/100)}) `
      )


    }
    animate()


    Object.assign(this, {media, animate})
  }

  pause() {
    this.wasPaused = this.media.paused;
    this.media.pause()
    cancelAnimationFrame(this.raf)
  }

  resume() {
    if(!this.wasPaused) this.media.play()
    this.raf = requestAnimationFrame(this.animate)
  }

}
