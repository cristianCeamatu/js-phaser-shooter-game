/* eslint-disable prefer-promise-reject-errors, no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';

import axios from 'axios';
import api from '../src/utils/api';

jest.mock('axios');

describe('getScores', () => {
  axios.get.mockResolvedValue({
    data: {
      result: [
        {
          user: 'Cris2',
          score: 36,
        },
        {
          user: 'Cris',
          score: 26,
        },
      ],
    },
  });

  it('return an array of scores sorted', async () => {
    const result = await api.getScores('https://www.google.com');
    expect(result).toStrictEqual([
      {
        user: 'Cris2',
        score: 36,
      },
      {
        user: 'Cris',
        score: 26,
      },
    ]);
  });

  it('negative test for sorted', async () => {
    const result = await api.getScores('https://www.google.com');
    expect(result).toStrictEqual([
      {
        user: 'Cris2',
        score: 36,
      },
      {
        user: 'Cris',
        score: 26,
      },
    ]);
  });

  it('the result has a maximum length of 15', async () => {
    const result = await api.getScores('https://www.google.com');
    expect(result.length).toBeLessThanOrEqual(15);
  });
});

describe('submitScore', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ data: 'Score succesffully submitted' }),
  }));
  const user = 'Cris';
  const score = 20;
  const uri = 'http://www.google.com';

  it('should return a success message when the request is correct', async () => {
    const result = await api.submitScore(uri, score, user);
    expect(result).toStrictEqual({
      data: 'Score succesffully submitted',
    });
  });

  it('returns an error when is a problem with the request', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Server error'));
    const result = await api.submitScore(uri, score, user);
    expect(result).toStrictEqual('Server error');
  });
});
