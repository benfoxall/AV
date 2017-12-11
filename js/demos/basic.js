export const basic = (audioCtx, element) => {

  const media = element.querySelector('audio')
  const source = audioCtx.createMediaElementSource(media)

  // create the audio graph
  source.connect(audioCtx.destination)

}
