import Phaser from 'phaser';

import Entity from './entity';
import EnemyLaser from './EnemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y, hp, { minVelocity, maxVelocity }) {
    super(scene, x, y, 'enemyGreen', 'GunShip');
    this.body.velocity.y = Phaser.Math.Between(minVelocity, maxVelocity);
    this.setScale(0.25);
    this.setData('value', 10);
    this.hp = hp;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const laser = new EnemyLaser(this.scene, this.x, this.y);
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

  hitDead() {
    if (this.hp === 0) {
      this.explode(true);
      return true;
    }
    this.hp -= 1;
    return false;
  }
}
