import Entity from './entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, xVelocity = 0) {
    super(scene, x, y, 'bullet');
    this.body.velocity.y = -200;
    this.body.velocity.x = xVelocity;
  }
}
