import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Phaser from 'phaser';

import './assets/style.scss';

import BootScene from './scenes/bootScene';
import PreloadScene from './scenes/preloadScene';
import MainMenuScene from './scenes/mainMenuScene';
import MainScene from './scenes/mainScene';

import State from './state';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const state = new State();

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [BootScene, PreloadScene, MainMenuScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
  game.globals = { state };
});
