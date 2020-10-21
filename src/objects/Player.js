import Phaser from 'phaser';

import Entity from './entity';
import PlayerLaser from './PlayerLaser';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.setData('isDead', false);
    this.setData('respawnProtected', false);
    this.setData('score', 0);
    this.lifes = 4;

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  updateScore(value, scoreText) {
    this.setData('score', this.getData('score') + value);
    scoreText.setText(`Score: ${this.getData('score')}`);
  }

  hit(lifesDom, leaderboard, user) {
    if (!this.getData('respawnProtected')) {
      if (this.lifes === 0) {
        this.explode(false);
        if (this.getData('score') > 0) {
          leaderboard.submitScore(this.getData('score'), user).then(() => leaderboard.getScores());
        }
        return 'dead';
      }

      this.lifes -= 1;
      this.respawn();
      lifesDom.getChildren()[lifesDom.getChildren().length - 1].destroy();
    }
    return true;
  }

  respawn() {
    if (!this.getData('isDead')) {
      this.setData('respawnProtected', true);
      this.setTexture('explosion');
      this.play('explosion');

      this.scene.sfx.explosion.play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on(
        'animationcomplete',
        async () => {
          await this.setTexture('player');
          this.setPosition(this.scene.game.config.width * 0.5, this.scene.game.config.height - 100);
        },
        this
      );

      setTimeout(() => this.setData('respawnProtected', false), 3000);
    }
  }

  update() {
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    }
  }
}
