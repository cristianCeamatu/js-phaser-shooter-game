import Entity from './entity';

export default class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'star', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}
