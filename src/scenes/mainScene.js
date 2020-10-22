/* eslint-disable max-len */
import Phaser from 'phaser';
import Level from '../utils/Level';
import Player from '../objects/Player';
import GunShip from '../objects/GunShip';
import CarrierShip from '../objects/CarrierShip';
import ChaserShip from '../objects/ChaserShip';
import Leaderboard from '../objects/Leaderboard';
import Text from '../objects/Text';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  create() {
    const { navWidth, nickname } = this.sys.game.globals.state;
    const { height, width } = this.cameras.main;
    this.centerButton = this.scene.get('MainMenu').centerButton;
    this.centerButtonText = this.scene.get('MainMenu').centerButtonText;
    this.updateAudio = this.scene.get('MainMenu').updateAudio;

    this.starfield = this.add.tileSprite(width / 2, height / 2, width - navWidth * 2, height, 'starfield');

    this.scoreText = this.add.text(width - navWidth + 5, 40, 'Score: 0', {
      fontSize: '20px',
      fill: '#FFFFFF',
    });

    this.levelText = this.add.text(12, 60, 'Game lvl 0', {
      fontSize: '20px',
      fill: '#FFFFFF',
    });

    this.levelChangeTitle = new Text(this, width / 2, height / 2 - 100, 'Level 0', 'red', '76px');
    this.levelChangeSubtitle = new Text(this, width / 2, height / 2 + 100, 'Warm up', 'red', '40px');

    this.weaponText = this.add.text(12, 85, 'Laser lvl 0', {
      fontSize: '20px',
      fill: '#FFFFFF',
    });

    this.nicknameText = this.add.text(width - navWidth + 5, 16, nickname, {
      fontSize: '20px',
      fill: '#FFFFFF',
    });

    this.leaderboard = new Leaderboard(this, width - navWidth + 5, 120, 'Leaderboard\n\nLoading...');
    this.leaderboard.getScores();

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 26,
      repeat: 0,
    });

    this.sfx = {
      explosion: this.sound.add('explosionSound'),
      laser: this.sound.add('laser'),
      btnPress: this.sound.add('buttonPressSound'),
      metalHit1: this.sound.add('metalHit1'),
      playerJoinedSound: this.sound.add('playerJoinedSound'),
      collectStarSound: this.sound.add('collectStarSound'),
    };

    const soundImage = this.sys.game.globals.state.soundOn ? 'soundOff' : 'soundOn';
    this.soundButton = this.add.image(width - navWidth - 30, 30, soundImage).setInteractive();

    this.soundButton.on('pointerdown', () => {
      this.sfx.btnPress.play();
      this.sys.game.globals.state.soundOn = !this.sys.game.globals.state.soundOn;
      this.updateAudio();
    });

    this.player = new Player(this, width * 0.5, height - 100, 'player');
    this.lifes = this.add.group();
    this.items = this.add.group();
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    for (let i = 0; i < this.player.lifes; i += 1) {
      this.lifes.add(this.add.image(30 * i + 30, 30, 'player'));
    }

    this.shield = this.add.image(this.player.x, this.player.y, 'shield').setVisible(false);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.level = new Level(this, this.player.score, { navWidth, width });

    this.physics.add.overlap(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        if (!this.sfx.metalHit1.isPlaying) {
          this.sfx.metalHit1.play();
        }
        if (!enemy.getData('isDead') && enemy.hitDead()) {
          this.player.updateScore(enemy.getData('value'), this.scoreText);
        }
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        if (player.hit(this.lifes, this.leaderboard, nickname) === 'dead') {
          this.gameOver = new Text(this, width / 2, height / 2 - 100, 'GAME OVER!', 'red', '76px');
          this.gameOverText = new Text(
            this,
            width / 2,
            height / 2 + 100,
            `Killed by ${enemy.getData('type')}`,
            'red',
            '40px'
          );

          this.restartButton = this.add.sprite(100, 200, 'button').setInteractive();
          this.restartButton.scaleX = 1;
          this.restartButton.setDepth(1);
          this.centerButton(this.restartButton, 0);

          this.restartButtonText = this.add.text(0, 0, 'Restart', { fontSize: '32px', fill: '#fff' });
          this.restartButtonText.setDepth(1);
          this.centerButtonText(this.restartButtonText, this.restartButton);
          enemy.explode(true);

          this.restartButton.on('pointerdown', () => {
            this.sfx.btnPress.play();
            this.scene.restart();
          });
        }
      }
    });

    this.physics.add.overlap(this.playerLasers, this.enemyLasers, (playerLaser, enemyLaser) => {
      if (!playerLaser.getData('isDead') && !enemyLaser.getData('isDead')) {
        this.player.updateScore(enemyLaser.getData('value'), this.scoreText);
        playerLaser.destroy();
        enemyLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.items, (player, item) => {
      if (!player.getData('isDead') && !item.getData('isDead')) {
        player.collect(item.getData('type'));
        item.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        if (player.hit(this.lifes, this.leaderboard, nickname) === 'dead') {
          this.gameOver = new Text(this, width / 2, height / 2 - 100, 'GAME OVER!', 'red', '76px');
          this.gameOverText = new Text(
            this,
            width / 2,
            height / 2 + 100,
            `Killed by ${laser.getData('type')}`,
            'red',
            '40px'
          );

          this.restartButton = this.add.sprite(100, 200, 'button').setInteractive();
          this.restartButton.scaleX = 1;
          this.restartButton.setDepth(1);
          this.centerButton(this.restartButton, 0);

          this.restartButtonText = this.add.text(0, 0, 'Restart', { fontSize: '32px', fill: '#fff' });
          this.restartButtonText.setDepth(1);
          this.centerButtonText(this.restartButtonText, this.restartButton);

          this.restartButton.on('pointerdown', () => {
            this.sfx.btnPress.play();
            this.scene.restart();
          });
        }

        laser.destroy();
      }
    });

    this.input.on('pointerover', (event, gameObjects) => {
      if (gameObjects[0].type === 'Sprite') {
        gameObjects[0].setTexture('buttonHover');
      }
    });

    this.input.on('pointerout', (event, gameObjects) => {
      if (gameObjects[0].type === 'Sprite') {
        gameObjects[0].setTexture('button');
      }
    });
  }

  update() {
    this.level.update(this.player.getData('score'));
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

    if (this.player) {
      if (this.player.getData('shield') && !this.player.getData('isDead')) {
        this.shield.setVisible(true);
        this.shield.setPosition(this.player.x, this.player.y);
      } else {
        this.shield.setVisible(false);
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

    for (let i = 0; i < this.items.getChildren().length; i += 1) {
      const item = this.items.getChildren()[i];
      item.update();

      if (
        item.x < -item.displayWidth ||
        item.x > this.game.config.width + item.displayWidth ||
        item.y < -item.displayHeight * 4 ||
        item.y > this.game.config.height + item.displayHeight
      ) {
        if (item) {
          item.destroy();
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
}
