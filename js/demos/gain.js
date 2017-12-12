import Demo from './Base.js'

export class gain extends Demo {

  start(audioCtx, element) {

    const media = element.querySelector('audio')
    const range = element.querySelector('input')

    const source = audioCtx.createMediaElementSource(media)
    const gain = audioCtx.createGain()

    // create the audio graph
    source.connect(gain)
    gain.connect(audioCtx.destination)


    // connect gain
    range.addEventListener('input', () =>
      gain.gain.value = parseFloat(range.value)
    )

    Object.assign(this, {media})

  }

  pause() {
    this.wasPaused = this.media.paused;
    this.media.pause()
  }

  resume() {
    if(!this.wasPaused) this.media.play()
  }

}
