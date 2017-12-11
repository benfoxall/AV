export const gain = (audioCtx, element) => {

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

}
