import Phaser from 'phaser';
import Entity from './entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyLaser');
    this.body.velocity.y = 200;
  }
}
