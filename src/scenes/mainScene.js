import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  create() {
    this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
    this.starfield.setScale(2);
    this.player = this.physics.add.sprite(400, 500, 'ship').setSize(0.5, 0.5);

    //  And some controls to play the game with
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // this.starfield.tilePositionY += 1;
    this.player.body.velocity.setTo(0, 0);
    // this.player.body.setAcceleration(0, 0);

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -350;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 350;
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -350;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 350;
    }

    if (this.player.x > this.game.config.width - 50) {
      this.player.x = this.game.config.width - 50;
      this.player.body.velocity.x = 0;
    }
    if (this.player.x < 50) {
      this.player.x = 50;
      this.player.body.velocity.x = 0;
    }

    if (this.player.y > this.game.config.height - 50) {
      this.player.y = this.game.config.height - 50;
      this.player.body.velocity.y = 0;
    }
    if (this.player.y < 50) {
      this.player.y = 50;
      this.player.body.velocity.y = 0;
    }

    const bank = this.player.body.velocity.x / 350;
    this.player.scaleX = 1 - Math.abs(bank) / 2;
    this.player.angle = bank * 10;
  }
}
