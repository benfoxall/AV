import {generator} from './util.js'
import {Scope} from './util.js'
import Demo from './Base.js'

export class keyboard extends Demo {

  start (audioCtx, element) {

    const canvas = element.querySelector('canvas')

    const analyser = audioCtx.createAnalyser()

    analyser.connect(audioCtx.destination)

    // draw to canvas
    const scope = new Scope(analyser, canvas)
    this.animate = () => {
      this.raf = requestAnimationFrame(this.animate)
      scope.render()
    }
    this.animate()

    const sound = generator(audioCtx, analyser)


    // Math.sin with period of 0..1
    const sin = v => Math.sin(Math.PI * 2 * v)

    const freq = note => 27.5 * Math.pow(2, (note - 21) / 12)

    const harmony = f => t =>
      (sin(f * t) +
      (sin(f * t * 3) / 3) +
      (sin(f * t * 7) / 7))
      * 0.2 * sin(t * 2)


    Array.from(element.querySelectorAll('svg rect'))
      .sort((a, b) =>
        parseFloat(a.getAttribute('x')) - parseFloat(b.getAttribute('x'))
      )
      .forEach((key, i) => {
        const s = sound(0.25, harmony(freq(i + 48)))

        const handler = e => {
          e.preventDefault()
          s()
        }

        key.addEventListener('pointerenter', handler)
        key.addEventListener('touchstart', handler)
      })

  }



    pause() {
      cancelAnimationFrame(this.raf)
    }

    resume() {
      this.raf = requestAnimationFrame(this.animate)
    }


}
