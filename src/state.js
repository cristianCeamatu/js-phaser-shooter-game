export default class State {
  constructor() {
    this.sound = true;
  }

  set soundOn(value) {
    this.sound = value;
  }

  get soundOn() {
    return this.sound;
  }
}
