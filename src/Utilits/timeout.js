export class Timeout {
  constructor() {
    this._id = -1
  }
  start(callback, ms) {
    this.stop()
    this._id = setTimeout(callback, ms)
  }
  stop() {
    clearTimeout(this._id)
  }
}
export const userTimeout = new Timeout()

//timeout.start()
//timeout.stop()
