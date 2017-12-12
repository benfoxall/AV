import Demo from './Base.js'


// No Audio Graph here, just for pausing/playing
export class plain extends Demo {

  start(audioCtx, element) {

   const media = element.querySelector('audio')
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
