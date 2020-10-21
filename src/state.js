export default class State {
  constructor() {
    this.sound = true;
    this.navsWidths = 150;
  }

  set soundOn(value) {
    this.sound = value;
  }

  get soundOn() {
    return this.sound;
  }

  set navWidth(value) {
    this.navsWidths = value;
  }

  get navWidth() {
    return this.navsWidths;
  }
}
