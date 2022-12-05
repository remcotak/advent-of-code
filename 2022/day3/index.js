const getData = require('../../utils/getData');

const parseData = (rawData) => rawData.split('\n').filter((n) => n);

const getItemPriority = (character) => {
  const upperCased = character.toUpperCase();
  const characterIndex = upperCased.charCodeAt() - 64;
  // Check if character is uppercased
  if (character === upperCased) {
    return 26 + characterIndex;
  }
  return characterIndex;
};

const init = async () => {
  const rawData = await getData(__dirname);
  const data = parseData(rawData);

  const sumOfDoubleItems = data.reduce((acc, rugsack) => {
    const { length } = rugsack;
    const half = length / 2;
    // Divide the rugsack in two halves
    const compartments = [
      rugsack.substring(0, half),
      rugsack.substring(half, length),
    ];
    // Get the first item that appears twice
    const doubleItems = compartments[0]
      .split('')
      .find((character) => compartments[1].includes(character));
    return acc + getItemPriority(doubleItems);
  }, 0);

  console.log('Answer 1: ', sumOfDoubleItems);

  const groups = [];
  for (let i = 0; i < data.length / 3; i += 1) {
    const start = i * 3;
    groups.push([data[start], data[start + 1], data[start + 2]]);
  }

  const sumOfGroups = groups.reduce((acc, group) => {
    // Get a list of all double items in first 2 groups
    const doubleItems = group[0]
      .split('')
      .filter((character) => group[1].includes(character));
    // Get the first item that appears twice for group 3
    const tripleItems = doubleItems.find((character) =>
      group[2].includes(character)
    );
    return acc + getItemPriority(tripleItems);
  }, 0);

  console.log('Answer 2: ', sumOfGroups);
};

module.exports = init;
