import Entity from './entity';

export default class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyRed', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.setScale(0.2);
    this.setData('value', 100);
  }
}
