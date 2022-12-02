const getData = require('../../utils/getData');

const parseData = (rawData) =>
  rawData
    .split('\n')
    .filter((n) => n)
    .map((x) => x.split(' '));

const init = async () => {
  const rawData = await getData(__dirname);
  const data = parseData(rawData);

  const scores = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3, // Scissors
  };
  const drawScore = 3;
  const winScore = 6;

  const draws = {
    A: 'X',
    B: 'Y',
    C: 'Z',
  };
  const wins = {
    A: 'Y',
    B: 'Z',
    C: 'X',
  };
  const loses = {
    A: 'Z',
    B: 'X',
    C: 'Y',
  };

  const calcRoundScore = (round) => {
    const handScore = scores[round[1]];
    let roundScore = 0;

    if (draws[round[0]] === round[1]) {
      roundScore = drawScore;
    }

    if (wins[round[0]] === round[1]) {
      roundScore = winScore;
    }

    return roundScore + handScore;
  };

  const totalScoreAnswerOne = data.reduce(
    (acc, round) => acc + calcRoundScore(round),
    0
  );
  console.log('Answer 1:', totalScoreAnswerOne);

  const totalScoreAnswerTwo = data.reduce((acc, round) => {
    let newRound = [];
    // Should lose
    if (round[1] === 'X') {
      newRound = [round[0], loses[round[0]]];
    }
    // Should draw
    if (round[1] === 'Y') {
      newRound = [round[0], draws[round[0]]];
    }
    // Should win
    if (round[1] === 'Z') {
      newRound = [round[0], wins[round[0]]];
    }
    return acc + calcRoundScore(newRound);
  }, 0);
  console.log('Answer 2:', totalScoreAnswerTwo);
};

module.exports = init;
