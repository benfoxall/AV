import {Scope} from './util.js'
import Demo from './Base.js'

export class analyser extends Demo {
  start () {
    const {element, audioCtx} = this

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
      this.raf = requestAnimationFrame(animate)
      scope.render()
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
