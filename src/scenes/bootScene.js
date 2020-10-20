import logo from '../assets/img/favicon-32x32.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image('logo', logo);
  }

  create() {
    this.scene.start('Preload');
  }
}
