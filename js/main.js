import './css.js'
import './polyfills.js'

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

// run scripts on each section
Array.from(document.querySelectorAll('.🔈[data-demo]'))
  .forEach(section => {
    const name = section.dataset.demo

    const demo = demos[name]

    if(!demo) return console.warn(`Demo not found: "${name}"`)

    demo(audioCtx, section)

  })
