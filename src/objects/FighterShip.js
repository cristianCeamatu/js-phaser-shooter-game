import Phaser from 'phaser';

import Entity from './entity';
import EnemyLaser from './EnemyLaser';

export default class FighterShip extends Entity {
  constructor(scene, x, y, hp, { minVelocity, maxVelocity }) {
    super(scene, x, y, 'enemyFighter', 'FighterShip');
    this.body.velocity.y = Phaser.Math.Between(minVelocity, maxVelocity);
    this.setData('value', 100);
    this.hp = hp;
    this.startingX = x;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const laser = new EnemyLaser(this.scene, this.x, this.y, this.body.velocity.y + 40);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (!this.getData('isDead')) {
      if (this.body.x < this.startingX + 50) {
        this.body.velocity.x += 2;
      } else {
        this.body.velocity.x -= 8;
      }
    }
  }

  hitDead() {
    if (this.hp === 0) {
      this.explode(true);
      return true;
    }
    this.hp -= 1;
    return false;
  }
}
