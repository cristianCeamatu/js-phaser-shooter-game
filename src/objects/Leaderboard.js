import axios from 'axios';
import Phaser from 'phaser';

export default class Leaderboard extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, { color: 'white', fontSize: '18px' });
    scene.add.existing(this);
    this.uri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mKHmBxpV0Vks3xMiBZdr/scores';
  }

  async getScores() {
    try {
      this.results = await axios(this.uri);
      this.scores = this.results.data.result;
      let display = 'Leaderboard\n';

      this.scores = [...this.scores].sort((a, b) => b.score - a.score).slice(0, 15);
      this.scores.forEach((score, i) => {
        display += `\n${i + 1}.${score.user} ${score.score}`;
      });
      this.setText(display);
    } catch (error) {
      this.results = false;
    }
  }

  async submitScore(score, user = 'unnamed') {
    const data = { user, score };
    try {
      this.result = await fetch(`https://cors-anywhere.herokuapp.com/${this.uri}`, {
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
