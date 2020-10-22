import Phaser from 'phaser';
import Entity from './entity';

export default class ChaserShip extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, 'enemyRed', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.setScale(0.2);
    this.setData('value', 100);
    this.hp = hp;
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
