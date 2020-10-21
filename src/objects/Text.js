import Phaser from 'phaser';

export default class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, color, fontSize) {
    super(scene, x, y, text, { color, fontSize });
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
    this.setDepth(1);
    this.setFontStyle('bold');
  }
}
