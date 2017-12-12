import './css.js'
import './polyfills.js'

import BaseDemo from './demos/Base.js'

import { analyser } from './demos/analyser.js'
import { gain } from './demos/gain.js'
import { basic } from './demos/basic.js'

import { buttonNoise } from './demos/buttons.js'
import { buttonHz } from './demos/buttons.js'
import { buttonHarmony } from './demos/buttons.js'
import { buttonADSR } from './demos/buttons.js'

import { keyboard } from './demos/keyboard.js'

const demos = {
  analyser,
  gain,
  basic,

  buttonNoise,
  buttonHz,
  buttonHarmony,
  buttonADSR,

  keyboard
}


const audioCtx = new (window.AudioContext || window.webkitAudioContext)()


const targets = new Map()

var observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(targets.has(entry.target))
      targets.get(entry.target)(entry)
  })
})

// run scripts on each section
Array.from(document.querySelectorAll('.🔈[data-demo]'))
  .forEach(section => {
    const name = section.dataset.demo

    const demo = demos[name]

    if(!demo) return console.warn(`Demo not found: "${name}"`)

    if(demo.prototype instanceof BaseDemo) {
      const _demo = new demo(audioCtx, section)

      // set up targets
      targets.set(section, (e) => {
        _demo.handleObservation(e)
        console.log(name, e.isIntersecting)
      })

      observer.observe(section)
    } else {
      demo(audioCtx, section)
    }

  })
