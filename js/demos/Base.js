const OFF = 0,
      STARTED = 1,
      PAUSED = 2



// This is a helper to start/stop scripts as they scroll into view
export default class Base {

  constructor(audioCtx, element) {
    Object.assign(this, {audioCtx, element})
    this.state = OFF
  }


  // reimplemented

  start() {

  }

  pause() {

  }

  resume() {

  }


  handleObservation(event) {

    if(event.isIntersecting) {
      switch (this.state) {
        case OFF:
          this.start(this.audioCtx, this.element)
          this.state = STARTED
          break;

        case PAUSED:
          this.resume()
          this.state = STARTED
          break;

        default:
          console.error("bad state transition")

      }
    } else {
      switch (this.state) {
        case OFF:
          break;

        case STARTED:
          this.pause()
          this.state = PAUSED
          break;

        default:
          console.error("bad state transition", event)
      }
    }
  }




}
