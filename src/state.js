export default class State {
  constructor() {
    this.sound = true;
    this.navsWidths = 180;
    this.name = 'unnamed';
    this.mobile = false;
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

  set nickname(value) {
    this.name = value;
  }

  get nickname() {
    return this.name;
  }

  set isMobile(value) {
    this.mobile = value;
  }

  get isMobile() {
    return this.mobile;
  }
}
