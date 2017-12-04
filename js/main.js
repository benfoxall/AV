import basic from './lib/basic.js'
import analyser from './lib/analyser.js'
import maths from './lib/maths.js'
import imagedata from './lib/imagedata.js'
import video from './lib/video.js'
import videoDisplay from './lib/videoDisplay.js'

const demos = { basic, analyser, maths, imagedata, video, videoDisplay }

const audioCtx = new AudioContext()

// run scripts on each section
Array.from(document.querySelectorAll('.🔈')).forEach(section => {
  const name = section.dataset.demo

  const demo = demos[name]

  if(!demo) return console.error(`Demo not found: "${name}"`)

  demo(audioCtx, section)

})
