import {generator, Scope} from './util.js'
import Demo from './Base.js'

class ButtonDemo extends Demo {

  start() {
    const {element, audioCtx} = this

    const range = element.querySelector('input')
    const canvas = element.querySelector('canvas')

    const gain = audioCtx.createGain()
    const analyser = audioCtx.createAnalyser()


    gain.connect(analyser)
    analyser.connect(audioCtx.destination)


    // connect gain
    gain.gain.value = parseFloat(range.value)
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

    const sound = generator(audioCtx, gain)

    Object.assign(this, {
      range, gain, animate, sound
    })

    this.buttonHandler(element.querySelectorAll('button'), this.sound)
  }

  buttonHandler() {
    console.error('not implemented')
  }

  pause() {
    cancelAnimationFrame(this.raf)
  }

  resume() {
    this.animate()
    this.gain.gain.value = parseFloat(this.range.value)
  }

}


const ease = fn => (t, s) =>
  fn(t) * Math.sin((t / s) * Math.PI)


// Math.sin with period of 0..1
const sin = v => Math.sin(Math.PI * 2 * v)

const harmony = f => t =>
  sin(f * t) +
  (sin(f * t * 3) / 3) +
  (sin(f * t * 7) / 7)

const adsr = d3.scaleLinear()
    .domain([0, 0.2, 0.3, 0.4, 0.5])
    .range( [0, 1,   .3, .3,  0])


const _zag = d3.scaleLinear()
    .domain([0, 0.5,  1])
    .range([-1,  1, -1])

const zag = t => _zag(t % 1)

const harmonyz = f => t =>
  zag(f * t) +
  (zag(f * t * 3) / 3) +
  (zag(f * t * 7) / 7)


export class buttonNoise extends ButtonDemo {

  buttonHandler(buttons, sound) {

    const noise = sound(.75, t => Math.random() * 0.2)

    buttons[0].addEventListener('click', noise)

  }

}


export class buttonEase extends ButtonDemo {

  buttonHandler(buttons, sound) {

    const noise = sound(.75, ease(t => Math.random() * 0.2))

    buttons[0].addEventListener('click', noise)

  }

}


export class buttonHz extends ButtonDemo {

  buttonHandler(buttons, sound) {

    const _440hz = sound(.75, ease(t => sin(t * 440)))
    const _880hz = sound(.75, ease(t => sin(t * 880)))

    buttons[0].addEventListener('click', _440hz)
    buttons[1].addEventListener('click', _880hz)

  }

}


export class buttonHarmony extends ButtonDemo {

  buttonHandler(buttons, sound) {

    const _440hz = sound(.75, ease(harmony(440)))
    const _880hz = sound(.75, ease(harmony(880)))

    buttons[0].addEventListener('click', _440hz)
    buttons[1].addEventListener('click', _880hz)

  }

}

export class buttonADSR extends ButtonDemo {

  buttonHandler(buttons, sound) {

     const h440 = harmony(440)
     const h880 = harmony(880)

     const _440hz = sound(.75, t => adsr(t) * h440(t) )
     const _880hz = sound(.75, t => adsr(t) * h880(t) )

     buttons[0].addEventListener('click', _440hz)
     buttons[1].addEventListener('click', _880hz)

  }

}


export class buttonD3 extends ButtonDemo {

  buttonHandler(buttons, sound) {

     const h440 = ease(harmonyz(440))
     const h880 = ease(harmonyz(880))

     const _440hz = sound(.75, h440 )
     const _880hz = sound(.75, h880 )

     buttons[0].addEventListener('click', _440hz)
     buttons[1].addEventListener('click', _880hz)

  }

}
