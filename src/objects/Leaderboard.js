import axios from 'axios';
import Phaser from 'phaser';

export default class Leaderboard extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, { color: 'white', fontSize: '18px' });
    scene.add.existing(this);
  }

  async getScores() {
    console.log(process.env.LEADERBORD_SCORES_URI);
    try {
      this.results = await axios(process.env.LEADERBORD_SCORES_URI);
      this.scores = this.results.data.result;
      let display = 'Leaderboard\n';

      this.scores = [...this.scores].sort((a, b) => b.score - a.score).slice(0, 15);
      this.scores.forEach((score, i) => {
        display += `\n${i + 1}.${score.user} ${score.score}`;
      });
      this.setText(display);
    } catch (error) {
      console.log(error);
      this.results = false;
    }
  }

  async submitScore(score, user = 'unnamed') {
    const data = { user, score };
    try {
      this.result = await fetch(`https://cors-anywhere.herokuapp.com/${process.env.LEADERBORD_SCORES_URI}`, {
        method: 'post',
        cord: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      this.result = await this.result.json();
    } catch (error) {
      this.results = false;
    }
  }
}
