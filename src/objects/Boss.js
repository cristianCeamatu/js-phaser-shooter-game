import Entity from './entity';
import EnemyLaser from './EnemyLaser';

export default class Boss extends Entity {
  constructor(scene, x, y, hp) {
    super(scene, x, y, 'boss', 'Boss');
    this.setData('value', 100);
    this.hp = hp;
    this.startingX = x;
    this.bossText = scene.add
      .text(scene.cameras.main.width / 2, 20, `Boss hp left ${this.hp}`, {
        fontSize: '20px',
        fill: '#FFFFFF',
      })
      .setOrigin(0.5);

    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x - 5, this.y, 200, 50).setAngle(-4));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x - 5, this.y, 200, 80).setAngle(-8));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x, this.y));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x + 5, this.y, 200, -50).setAngle(4));
        this.scene.enemyLasers.add(new EnemyLaser(this.scene, this.x + 5, this.y, 200, -80).setAngle(8));
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

  update() {
    if (!this.getData('isDead')) {
      if (this.body.x < this.startingX + 20) {
        this.body.velocity.x += 1;
      } else {
        this.body.velocity.x -= 80;
      }

      if (this.body.y < this.startingX + 20) {
        this.body.velocity.y += 1;
      } else {
        this.body.velocity.y -= 80;
      }
    }
  }

  hitDead() {
    if (this.hp === 0) {
      this.explode(true);
      this.bossText.setText('');
      return true;
    }
    this.hp -= 1;
    this.bossText.setText(`Boss hp left ${this.hp}`);
    return false;
  }
}
