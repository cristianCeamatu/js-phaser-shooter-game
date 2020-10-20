export default class State {
  constructor() {
    this._soundOn = true;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }
}
