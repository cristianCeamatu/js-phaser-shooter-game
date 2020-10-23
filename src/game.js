import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Phaser from 'phaser';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

import './assets/style.scss';

import Form from './components/form';
import BootScene from './scenes/bootScene';
import PreloadScene from './scenes/preloadScene';
import MainMenuScene from './scenes/mainMenuScene';
import MainScene from './scenes/mainScene';

import State from './state';
import listeners from './utils/listeners';

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 800;

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
  plugins: {
    global: [
      {
        key: 'rexVirtualJoystick',
        plugin: VirtualJoystickPlugin,
        start: true,
      },
      // ...
    ],
  },
};

window.addEventListener('load', () => {
  document.querySelector('#form-container').appendChild(Form());
  listeners.init();

  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
  if (isMobile) state.isMobile = true;

  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#form-container').innerHTML = '';

    const nickname = e.target.elements.nickname.value;
    const game = new Phaser.Game(config);
    state.nickname = nickname;
    game.globals = { state };
  });
});
