/* eslint-disable max-len */
import Phaser from 'phaser';
import Entity from './entity';
import Item from './Item';

export default class CarrierShip extends Entity {
  constructor(scene, x, y, hp, { minVelocity, maxVelocity }) {
    super(scene, x, y, 'enemyBlue', 'CarrierShip');
    this.body.velocity.y = Phaser.Math.Between(minVelocity, maxVelocity);
    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_DOWN;
    this.setScale(0.25);
    this.setData('value', 50);
    this.hp = hp;
    this.items = ['shield', 'gun', 'player'];
  }

  update() {
    if (
      !this.getData('isDead') &&
      this.scene.player &&
      !this.scene.player.getData('isDead') &&
      !this.scene.player.getData('shield')
    ) {
      if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 320) {
        this.state = this.states.CHASE;
      }

      if (this.state === this.states.CHASE) {
        const dx = this.scene.player.x - this.x;
        const dy = this.scene.player.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        if (this.x < this.scene.player.x) {
          this.angle -= 5;
        } else {
          this.angle += 5;
        }
      }
    }
  }

  hitDead() {
    if (this.hp === 0) {
      this.explode(true);
      this.dropItem();
      return true;
    }
    this.hp -= 1;
    return false;
  }

  dropItem() {
    const itemType =
      this.scene.player.lifes >= 5 ? this.items[Phaser.Math.Between(0, 1)] : this.items[Phaser.Math.Between(0, 2)];
    const item = new Item(this.scene, this.x, this.y, itemType);
    this.scene.items.add(item);
    this.scene.sfx.playerJoinedSound.play();
  }
}
