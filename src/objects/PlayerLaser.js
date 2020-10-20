import Entity from './entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laserEnemy');
    this.body.velocity.y = -200;
    this.scale = 2;
  }
}
