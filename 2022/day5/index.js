const getData = require('../../utils/getData');

// Get the crates ordened per stack
const getStacks = (rawData) => {
  const sortedStacks = {};
  rawData
    .split('\n\n')[0]
    .split('\n')
    .slice(0, -1)
    .forEach((row) => {
      // Get split the row per 4 characters, this defines 1 cell
      row.match(/.{1,4}/g).forEach((cell, index) => {
        // remove redundand characters
        const letter = cell.replace('[', '').replace(']', '').replace(' ', '');
        // Return if the string consists only of whitespace
        if (!letter.replace(/\s/g, '').length) return;
        // Start the index from 1, easier for checking with the data
        const indexOne = index + 1;
        // Add the letter to the stack based on index
        sortedStacks[indexOne] = [letter, ...(sortedStacks[indexOne] || [])];
      });
    });
  return sortedStacks;
};
// Get the steps we need to move
const getMoves = (rawData) => rawData.split('\n').filter((n) => n);
// Get the top crate of each stack
const topOfEachStack = (stacks) =>
  Object.values(stacks)
    .map((stack) => stack.at(-1))
    .join('');

const moveCrates = (moves, callback) => {
  moves.forEach((move) => {
    // Only return the digits from the move
    const actions = move.match(/\d{1,2}/g, '');

    callback({
      amount: actions[0],
      fromIndex: actions[1],
      toIndex: actions[2],
    });
  });
};

const init = async () => {
  const rawData = await getData(__dirname);
  const splitData = rawData.split('\n\n');
  const moves = getMoves(splitData[1]);

  const stacksAssignmentOne = getStacks(splitData[0]);
  moveCrates(moves, ({ amount, fromIndex, toIndex }) => {
    for (let i = 0; i < amount; i += 1) {
      const crate = stacksAssignmentOne[fromIndex].splice(-1);
      stacksAssignmentOne[toIndex].push(...crate);
    }
  });
  console.log('Answer 1: ', topOfEachStack(stacksAssignmentOne));

  const stacksAssignmentTwo = getStacks(splitData[0]);
  moveCrates(moves, ({ amount, fromIndex, toIndex }) => {
    const crates = stacksAssignmentTwo[fromIndex].splice(-1 * amount);
    stacksAssignmentTwo[toIndex].push(...crates);
  });
  console.log('Answer 2: ', topOfEachStack(stacksAssignmentTwo));
};

module.exports = init;
