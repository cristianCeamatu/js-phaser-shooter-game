/* eslint-disable max-len */
import Phaser from 'phaser';

import Entity from './entity';
import PlayerLaser from './PlayerLaser';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.setData('isDead', false);
    this.setData('shield', false);
    this.setData('score', 0);
    this.lifes = 2;
    this.weaponLevel = 0;
    this.setScale(1.25);

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    console.log('player move up');
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
    if (!this.getData('shield')) {
      if (this.lifes === 0) {
        this.explode(false);
        if (this.getData('score') > 0) {
          leaderboard.submitScore(this.getData('score'), user).then(() => leaderboard.getScores());
        }
        return 'dead';
      }

      this.lifes -= 1;
      if (this.weaponLevel >= 1) this.weaponLevel -= 1;
      this.scene.weaponText.setText(`Laser lvl ${this.weaponLevel}`);
      this.respawn();
      lifesDom.getChildren()[lifesDom.getChildren().length - 1].destroy();
    }
    return true;
  }

  respawn() {
    if (!this.getData('isDead')) {
      this.setTexture('explosion');
      this.play('explosion');

      this.setData('shield', true);

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
        () => {
          this.setTexture('player');
        },
        this
      );

      setTimeout(() => this.setData('shield', false), 3000);
    }
  }

  collect(item) {
    switch (item) {
      case 'gun':
        if (this.weaponLevel < 6) {
          this.weaponLevel += 1;
          if (this.weaponLevel === 6) {
            this.scene.weaponText.setText('Laser lvl max');
          } else {
            this.scene.weaponText.setText(`Laser lvl ${this.weaponLevel}`);
          }
        }

        break;
      case 'player':
        if (this.lifes < 5) {
          this.lifes += 1;
          this.scene.lifes.add(this.scene.add.image(30 * this.lifes - 1, 30, 'player'));
        }
        break;
      case 'shield':
        this.setData('shield', true);
        window.setTimeout(() => this.setData('shield', false), 4000);
        break;
      default:
        break;
    }
  }

  laser(level) {
    switch (level) {
      case 1:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.5));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y));
        break;
      case 2:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 8, this.y));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.5));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 8, this.y));
        break;
      case 3:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -30).setAngle(-4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.5));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 30).setAngle(4));
        break;
      case 4:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 11, this.y, -38).setAngle(-8));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -30).setAngle(-4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.5));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 30).setAngle(4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 11, this.y, 38).setAngle(8));
        break;
      case 5:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -15).setRotation(-45));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y).setRotation(-30));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -30).setAngle(-4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.2, 1.6));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 30).setAngle(4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y).setRotation(30));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 15).setRotation(45));
        break;
      case 6:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 20, this.y, -50).setAngle(-12));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -15).setRotation(-45));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y).setRotation(-30));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x - 5, this.y, -30).setAngle(-4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y).setScale(1.2, 1.6));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 30).setAngle(4));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y).setRotation(30));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 5, this.y, 15).setRotation(45));
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x + 20, this.y, +50).setAngle(12));
        break;
      default:
        this.scene.playerLasers.add(new PlayerLaser(this.scene, this.x, this.y));
        break;
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
        this.laser(this.weaponLevel);
        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    }
  }
}
