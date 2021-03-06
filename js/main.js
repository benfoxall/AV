import './css.js'
import './polyfills.js'

import BaseDemo from './demos/Base.js'

import { analyser } from './demos/analyser.js'
import { emoji } from './demos/emoji.js'
import { gain } from './demos/gain.js'
import { basic } from './demos/basic.js'
import { plain } from './demos/plain.js'

import { buttonNoise } from './demos/buttons.js'
import { buttonEase } from './demos/buttons.js'
import { buttonHz } from './demos/buttons.js'
import { buttonHarmony } from './demos/buttons.js'
import { buttonADSR } from './demos/buttons.js'
import { buttonD3 } from './demos/buttons.js'


import { keyboard } from './demos/keyboard.js'

const demos = {
  analyser,
  gain,
  basic,
  plain,
  emoji,

  buttonNoise,
  buttonEase,
  buttonHz,
  buttonHarmony,
  buttonADSR,
  buttonD3,

  keyboard
}


const audioCtx = new (window.AudioContext || window.webkitAudioContext)()


// run scripts on each section
Array.from(document.querySelectorAll('.🔈[data-demo]'))
  .forEach(section => {
    const name = section.dataset.demo

    const demo = demos[name]

    if(demo)
      new demo(audioCtx, section)

    else
      console.warn(`Demo not found: "${name}"`)


  })


Array.from(document.querySelectorAll('.🔈 audio'))
  .forEach((audio, i, all) =>
    audio.addEventListener('pause', () =>
      all
        .filter(other => other !== audio)
        .forEach(other => other.currentTime = audio.currentTime)
    )
  )


Array.from(document.querySelectorAll('.🔈 input[type=range]'))
  .forEach((range, i, all) =>
    range.addEventListener('change', () =>
      all
        .filter(other => other !== range)
        .forEach(other => other.value = range.value)
    )
  )
