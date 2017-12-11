import './css.js'

import { analyser } from './demos/analyser.js'
import { buttons } from './demos/buttons.js'

const demos = { analyser, buttons }

const audioCtx = new AudioContext()

// run scripts on each section
Array.from(document.querySelectorAll('.🔈[data-demo]'))
  .forEach(section => {
    const name = section.dataset.demo

    const demo = demos[name]

    if(!demo) return console.warn(`Demo not found: "${name}"`)

    demo(audioCtx, section)

  })
