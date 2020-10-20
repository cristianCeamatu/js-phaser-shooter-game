export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    console.log('main menu scene');

    this.add.image(this.cameras.main.width - 40, 40, 'logo');
    this.logoText = this.add.text(this.cameras.main.width - 70, 40, 'Microverse Fights', {
      fontSize: '24px',
      fill: '#FFFFFF',
    });
    this.logoText.setOrigin(1, 0.5);

    this.sfx = {
      btnPress: this.sound.add('buttonPressSound'),
      backgroundMusic: this.sound.add('music'),
    };

    this.sfx.backgroundMusic.loop = true;
    if (this.sys.game.globals.state.soundOn) this.sfx.backgroundMusic.play();

    this.playButton = this.add.sprite(100, 200, 'button').setInteractive();
    this.playButton.scaleX = 2;
    this.centerButton(this.playButton, 1);

    this.playButtonText = this.add.text(0, 0, 'Enter the battlefield', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.playButtonText, this.playButton);

    this.playButton.on(
      'pointerdown',
      (pointer) => {
        this.sfx.btnPress.play();
        this.scene.start('Main');
      },
    );

    this.soundButton = this.add.image(40, 40, 'soundOff').setInteractive();

    this.soundButton.on(
      'pointerdown',
      () => {
        this.sfx.btnPress.play();
        this.sys.game.globals.state.soundOn = !this.sys.game.globals.state.soundOn;
        this.updateAudio();
      },
    );

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

  updateAudio() {
    if (this.sys.game.globals.state.soundOn) {
      this.soundButton.setTexture('soundOff');
      this.game.sound.mute = false;
    } else {
      this.soundButton.setTexture('soundOn');
      this.game.sound.mute = true;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - offset * 100,
        this.cameras.main.width,
        this.cameras.main.height,
      ),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
