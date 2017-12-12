import Demo from './Base.js'

export class basic extends Demo {

  start(audioCtx, element) {

   const media = element.querySelector('audio')
   const source = audioCtx.createMediaElementSource(media)

   // create the audio graph
   source.connect(audioCtx.destination)


   Object.assign(this, {media})

 }

 pause() {
   this.wasPaused = this.media.paused
   this.media.pause()
 }

 resume() {
   if(!this.wasPaused) this.media.play()
 }

}
