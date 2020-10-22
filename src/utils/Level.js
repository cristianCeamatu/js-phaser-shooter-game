import Phaser from 'phaser';

import GunShip from '../objects/GunShip';
import CarrierShip from '../objects/CarrierShip';
import ChaserShip from '../objects/ChaserShip';
import AirShip from '../objects/AirShip';
import FighterShip from '../objects/FighterShip';
import Boss from '../objects/Boss';

export default class Level {
  constructor(scene, score = 0, { navWidth, width }) {
    this.currentLevel = false;
    this.level = false;
    this.scene = scene;
    this.navWidth = navWidth;
    this.width = width;
    this.score = score;
    this.scene = scene;
    this.levelTexts = [
      'Warm up',
      'Bigger Health Enemies',
      'Same health! More enemies!',
      'Speed increase!',
      'Falling Airplanes',
      'AI ships',
      'The Boss is Here!',
    ];
  }

  level0() {
    this.currentLevel = 0;
    return this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            2,
            { minVelocity: 50, maxVelocity: 100 }
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              5,
              { minVelocity: 50, maxVelocity: 100 }
            );
          }
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            3,
            { minVelocity: 50, maxVelocity: 100 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  level1() {
    this.currentLevel = 1;
    return this.scene.time.addEvent({
      delay: 1500,
      paused: true,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            7,
            { minVelocity: 50, maxVelocity: 100 }
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              15,
              { minVelocity: 50, maxVelocity: 100 }
            );
          }
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            10,
            { minVelocity: 50, maxVelocity: 100 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  level2() {
    this.currentLevel = 2;
    return this.scene.time.addEvent({
      delay: 1000,
      paused: true,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            5,
            { minVelocity: 50, maxVelocity: 100 }
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              10,
              { minVelocity: 50, maxVelocity: 100 }
            );
          }
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            7,
            { minVelocity: 50, maxVelocity: 100 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  level3() {
    this.currentLevel = 3;
    return this.scene.time.addEvent({
      delay: 900,
      paused: true,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            15,
            { minVelocity: 100, maxVelocity: 250 }
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              30,
              { minVelocity: 100, maxVelocity: 250 }
            );
          }
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            21,
            { minVelocity: 100, maxVelocity: 250 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  level4() {
    this.currentLevel = 4;
    return this.scene.time.addEvent({
      delay: 900,
      paused: true,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          if (this.getEnemiesByType('AirShip').length < 7) {
            enemy = new AirShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              5,
              { minVelocity: 200, maxVelocity: 400 }
            );
          }
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              30,
              { minVelocity: 100, maxVelocity: 250 }
            );
          }
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            21,
            { minVelocity: 100, maxVelocity: 250 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  level5() {
    this.currentLevel = 5;
    return this.scene.time.addEvent({
      delay: 600,
      paused: true,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          if (this.getEnemiesByType('FighterShip').length < 7) {
            enemy = new FighterShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              40,
              { minVelocity: 100, maxVelocity: 250 }
            );
          }
        } else if (Phaser.Math.Between(0, 10) >= 3) {
          if (this.getEnemiesByType('AirShip').length < 5) {
            enemy = new AirShip(
              this.scene,
              Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
              0,
              5,
              { minVelocity: 200, maxVelocity: 400 }
            );
          }
        } else if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            15,
            { minVelocity: 100, maxVelocity: 250 }
          );
        } else {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            21,
            { minVelocity: 100, maxVelocity: 250 }
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(4, 8) * 0.1);
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  boss() {
    this.currentLevel = 6;
    return this.scene.time.addEvent({
      delay: 1500,
      paused: true,
      callback: () => {
        let enemy = null;

        if (this.getEnemiesByType('Boss').length === 0) {
          enemy = new Boss(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            100,
            1000,
            {
              minVelocity: 50,
              maxVelocity: 100,
            }
          );
        } else if (Phaser.Math.Between(0, 10) >= 4) {
          enemy = new FighterShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            30,
            { minVelocity: 50, maxVelocity: 100 }
          ).setScale(0.5);
        } else if (Phaser.Math.Between(0, 10) >= 4) {
          enemy = new CarrierShip(
            this.scene,
            Phaser.Math.Between(this.navWidth + 20, this.width - this.navWidth - 20),
            0,
            3,
            { minVelocity: 50, maxVelocity: 100 }
          ).setScale(1.2);
        }

        if (enemy !== null) {
          this.scene.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.scene.enemies.getChildren().length; i += 1) {
      const enemy = this.scene.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  changeLevelText(title, subtitle, level) {
    this.scene.levelText.setText(`Level ${level}`);
    this.scene.levelChangeTitle.setText(title);
    this.scene.levelChangeSubtitle.setText(subtitle);
    setTimeout(() => {
      this.scene.levelChangeTitle.setText('');
      this.scene.levelChangeSubtitle.setText('');
    }, 4000);
  }

  update(score) {
    if (this.currentLevel === false) {
      this.level = this.level0();
      setTimeout(() => {
        this.scene.levelChangeTitle.setText('');
        this.scene.levelChangeSubtitle.setText('');
      }, 4000);
    } else if (score > 3000 && this.currentLevel !== 6) {
      if (this.currentLevel === 5) {
        this.level.remove();
        this.level = this.boss();
        this.changeLevelText('Boss mode', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    } else if (score > 2500 && this.currentLevel !== 5) {
      if (this.currentLevel === 4) {
        this.level.remove();
        this.level = this.level5();
        this.changeLevelText('Game lvl 5', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    } else if (score > 2000 && this.currentLevel !== 4) {
      if (this.currentLevel === 3) {
        this.level.remove();
        this.level = this.level4();
        this.changeLevelText('Game lvl 4', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    } else if (score > 1500 && this.currentLevel !== 3) {
      if (this.currentLevel === 2) {
        this.level.remove();
        this.level = this.level3();
        this.changeLevelText('Game lvl 3', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    } else if (score > 1000 && this.currentLevel !== 2) {
      if (this.currentLevel === 1) {
        this.level.remove();
        this.level = this.level2();
        this.changeLevelText('Game lvl 2', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    } else if (score > 500 && this.currentLevel !== 1) {
      if (this.currentLevel === 0) {
        this.level.remove();
        this.level = this.level1();
        this.changeLevelText('Game lvl 1', this.levelTexts[this.currentLevel], this.currentLevel);
        setTimeout(() => {
          this.level.paused = false;
        }, 5000);
      }
    }
  }
}
