import Phaser from 'phaser';
import Player from '../objects/Player';
import GunShip from '../objects/GunShip';
import CarrierShip from '../objects/CarrierShip';
import ChaserShip from '../objects/ChaserShip';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  create() {
    const { navWidth } = this.sys.game.globals.state;
    const { height, width } = this.game.config;

    this.starfield = this.add.tileSprite(width / 2, height / 2, width - navWidth * 2, height, 'starfield');

    this.scoreText = this.add.text(width - navWidth + 16, 16, 'Score: 0', {
      fontSize: '14px',
      fill: '#FFFFFF',
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 26,
      repeat: 0,
    });

    this.sfx = {
      explosion: this.sound.add('explosionSound'),
      laser: this.sound.add('laser'),
    };

    this.player = new Player(this, width * 0.5, height - 100, 'player');
    this.lifes = this.add.group();
    for (let i = 0; i < this.player.lifes; i += 1) {
      this.lifes.add(this.add.image(30 * i + 20, 30, 'player'));
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.spawn = this.time.addEvent({
      delay: 1500,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(this, Phaser.Math.Between(navWidth + 20, width - navWidth - 20), 0);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(this, Phaser.Math.Between(navWidth + 20, width - navWidth - 20), 0);
          }
        } else {
          enemy = new CarrierShip(this, Phaser.Math.Between(navWidth + 20, width - navWidth - 20), 0);
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        if (!enemy.getData('isDead')) {
          this.player.updateScore(enemy.getData('value'), this.scoreText);
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.hit(this.lifes);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.playerLasers, this.enemyLasers, (playerLaser, enemyLaser) => {
      if (!playerLaser.getData('isDead') && !enemyLaser.getData('isDead')) {
        this.player.updateScore(enemyLaser.getData('value'), this.scoreText);
        playerLaser.destroy();
        enemyLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.hit(this.lifes);
        laser.destroy();
      }
    });
  }

  update() {
    this.starfield.tilePositionY += 0.4;

    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }

      if (this.cursors.left.isDown) {
        if (this.player.x > this.sys.game.globals.state.navWidth + 10) this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        if (this.player.x < this.game.config.width - this.sys.game.globals.state.navWidth) this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    const bank = this.player.body.velocity.x / 350;
    this.player.scaleX = 1 - Math.abs(bank) / 2;
    this.player.angle = bank * 10;
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}
