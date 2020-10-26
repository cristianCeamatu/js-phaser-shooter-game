import Entity from './entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, velocity = 200, xVelocity = 0) {
    super(scene, x, y, 'enemyLaser', 'Enemy Laser');
    this.body.velocity.y = velocity;
    this.body.velocity.x = xVelocity;
    this.setData('value', 5);
  }
}
