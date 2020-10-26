import Entity from './entity';

export default class Item extends Entity {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    this.body.velocity.y = 50;
    this.setData('type', type);
  }
}
