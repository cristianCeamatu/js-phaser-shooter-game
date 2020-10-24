import Phaser from 'phaser';

import starfield from '../assets/img/starfield.png';
import player from '../assets/img/player.png';
import enemyBlue from '../assets/img/enemy-blue.png';
import enemyGreen from '../assets/img/enemy-green.png';
import enemyRed from '../assets/img/enemy-red.png';
import enemyAir from '../assets/img/enemy-air.png';
import enemyFighter from '../assets/img/enemyFighter.png';
import boss from '../assets/img/boss.png';
import enemyLaser from '../assets/img/rocketPlayer.png';
import shield from '../assets/img/shield.png';
import bullet from '../assets/img/bullet.png';
import explosion from '../assets/img/explosion.png';
import gun from '../assets/img/gun.png';

import button from '../assets/img/button.png';
import buttonPressed from '../assets/img/buttonPressed.png';
import buttonHover from '../assets/img/buttonHover.png';
import soundOff from '../assets/img/soundOff.png';
import soundOn from '../assets/img/soundOn.png';

import collectStarSound from '../assets/audio/collectStar.wav';
import metalHit1 from '../assets/audio/metalHit1.wav';
import explosionSound from '../assets/audio/explosion.wav';
import drop from '../assets/audio/coin_drop.wav';
import laserM4a from '../assets/audio/laser.m4a';
import laserOgg from '../assets/audio/laser.ogg';
import musicWav from '../assets/audio/music.wav';
import musicMp3 from '../assets/audio/music.mp3';
import musicOgg from '../assets/audio/music.ogg';
import playerJoinedSound from '../assets/audio/playerJoined.wav';
import buttonPressSound from '../assets/audio/buttonPressSound.wav';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    const { width, height } = this.cameras.main;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, 224, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, 234, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('button', button);
    this.load.image('buttonPressed', buttonPressed);
    this.load.image('buttonHover', buttonHover);
    this.load.image('soundOff', soundOff);
    this.load.image('soundOn', soundOn);

    this.load.image('starfield', starfield);
    this.load.image('player', player);
    this.load.image('bullet', bullet);
    this.load.image('enemyGreen', enemyGreen);
    this.load.image('enemyBlue', enemyBlue);
    this.load.image('enemyRed', enemyRed);
    this.load.image('enemyLaser', enemyLaser);
    this.load.image('enemyAir', enemyAir);
    this.load.image('enemyFighter', enemyFighter);
    this.load.image('boss', boss);
    this.load.image('shield', shield);
    this.load.image('gun', gun);
    this.load.spritesheet('explosion', explosion, { frameWidth: 128, frameHeight: 128 });

    this.load.audio('collectStarSound', collectStarSound);
    this.load.audio('explosionSound', explosionSound);
    this.load.audio('laser', [laserM4a, laserOgg]);
    this.load.audio('music', [musicMp3, musicOgg, musicWav]);
    this.load.audio('playerJoinedSound', playerJoinedSound);
    this.load.audio('buttonPressSound', buttonPressSound);
    this.load.audio('metalHit1', metalHit1);
    this.load.audio('drop', drop);
  }

  create() {
    this.add.image(this.cameras.main.width - 40, 40, 'logo');
    this.logoText = this.add.text(this.cameras.main.width - 70, 40, 'Microverse Fights', {
      fontSize: '24px',
      fill: '#FFFFFF',
    });
    this.logoText.setOrigin(1, 0.5);
    // this.scene.start('MainMenu');
    this.scene.start('Main');
  }
}
