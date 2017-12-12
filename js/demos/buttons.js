import {generator, Scope} from './util.js'
import Demo from './Base.js'


const __setup = (demo) => {

  const {element, audioCtx} = demo

  const range = element.querySelector('input')
  const canvas = element.querySelector('canvas')

  const gain = audioCtx.createGain()
  const analyser = audioCtx.createAnalyser()


  gain.connect(analyser)
  analyser.connect(audioCtx.destination)


  // connect gain
  range.addEventListener('input', () =>
    gain.gain.value = parseFloat(range.value)
  )

  // draw to canvas
  const scope = new Scope(analyser, canvas)
  const animate = () => {
    demo.raf = requestAnimationFrame(animate)
    scope.render()
  }

  animate()


  const sound = generator(audioCtx, gain)

  demo.pause = () => {
    cancelAnimationFrame(demo.raf)
  }
  demo.resume = () => {
    animate()
  }

  Object.assign(demo, { sound })

}


// Math.sin with period of 0..1
const sin = v => Math.sin(Math.PI * 2 * v)

const harmony = f => t =>
  sin(f * t) +
  (sin(f * t * 3) / 3) +
  (sin(f * t * 7) / 7)


export class buttonNoise extends Demo {

  start(audioCtx, element) {
    __setup(this)

    const sound = this.sound

    const buttons = element.querySelectorAll('button')

    const noise = sound(0.5, t => Math.random() * 0.2)

    buttons[0].addEventListener('click', noise)

  }
}



export class buttonHz extends Demo {

  start(audioCtx, element) {
    __setup(this)

    const sound = this.sound

    const buttons = element.querySelectorAll('button')

    const _440hz = sound(0.5, t => sin(t * 440))
    const _880hz = sound(0.5, t => sin(t * 880))

    buttons[0].addEventListener('click', _440hz)
    buttons[1].addEventListener('click', _880hz)

  }

}


export class buttonHarmony extends Demo {

  start(audioCtx, element) {
    __setup(this)

    const sound = this.sound

    const buttons = element.querySelectorAll('button')

    const _440hz = sound(0.5, harmony(440))
    const _880hz = sound(0.5, harmony(880))

    buttons[0].addEventListener('click', _440hz)
    buttons[1].addEventListener('click', _880hz)

  }

}

const adsr = d3.scaleLinear()
    .domain([0, 0.2, 0.3, 0.4, 0.5])
    .range( [0, 1,   .3, .3,  0])


export class buttonADSR extends Demo {

  start(audioCtx, element) {
    __setup(this)

    const sound = this.sound

     const buttons = element.querySelectorAll('button')

     const h440 = harmony(440)
     const h880 = harmony(880)

     const _440hz = sound(.5, t => adsr(t) * h440(t) )
     const _880hz = sound(.5, t => adsr(t) * h880(t) )

     buttons[0].addEventListener('click', _440hz)
     buttons[1].addEventListener('click', _880hz)

  }

}
