import axios from 'axios';

const getScores = async (uri) => {
  try {
    const results = await axios.get(`https://cors-anywhere.herokuapp.com/${uri}`);
    let scores = results.data.result;

    scores = [...scores].sort((a, b) => b.score - a.score).slice(0, 15);
    return scores;
  } catch (error) {
    return error;
  }
};

const submitScore = async (uri, score, user = 'unnamed') => {
  const data = { user, score };
  try {
    let result = await fetch(`https://cors-anywhere.herokuapp.com/${uri}`, {
      method: 'post',
      cors: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    result = await result.json();

    return result;
  } catch (error) {
    return error;
  }
};

export default { getScores, submitScore };
