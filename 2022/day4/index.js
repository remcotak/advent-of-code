const getData = require('../../utils/getData');

const parseData = (rawData) =>
  rawData
    .split('\n')
    .filter((n) => n)
    .map((x) => x.replaceAll('-', ',').split(','));

const init = async () => {
  const rawData = await getData(__dirname);
  const data = parseData(rawData);

  const sumOfpairsThatFullyOverlap = data.reduce((acc, pairs) => {
    const elfOneStart = parseInt(pairs[0]);
    const elfOneEnd = parseInt(pairs[1]);
    const elfTwoStart = parseInt(pairs[2]);
    const elfTwoEnd = parseInt(pairs[3]);
    // Fully equal
    if (elfOneStart === elfTwoStart && elfOneEnd === elfTwoEnd) {
      return acc + 1;
    }
    // Either way fully inside
    if (
      (elfOneStart < elfTwoStart && elfOneEnd > elfTwoEnd) ||
      (elfTwoStart < elfOneStart && elfTwoEnd > elfOneEnd)
    ) {
      return acc + 1;
    }
    // 4-4,4-8
    // 4-4,2-4
    // 4-4,2-8
    if (
      elfOneStart === elfOneEnd &&
      (elfOneStart === elfTwoStart ||
        elfOneStart === elfTwoEnd ||
        (elfOneStart > elfTwoStart && elfOneStart < elfTwoEnd))
    ) {
      return acc + 1;
    }
    // 4-8,4-4
    // 2-4,4-4
    // 2-8,4-4
    if (
      elfTwoStart === elfTwoEnd &&
      (elfTwoStart === elfOneStart ||
        elfTwoStart === elfOneEnd ||
        (elfTwoStart > elfOneStart && elfTwoStart < elfOneEnd))
    ) {
      return acc + 1;
    }
    // 2-8,2-7
    if (elfOneStart === elfTwoStart && elfOneEnd > elfTwoEnd) {
      return acc + 1;
    }
    // 2-7,2-8
    if (elfOneStart === elfTwoStart && elfOneEnd < elfTwoEnd) {
      return acc + 1;
    }
    // 2-8,3-8
    if (elfOneEnd === elfTwoEnd && elfOneStart < elfTwoStart) {
      return acc + 1;
    }
    // 3-8,2-8
    if (elfOneEnd === elfTwoEnd && elfOneStart > elfTwoStart) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log('Answer 1:', sumOfpairsThatFullyOverlap);

  const sumOfPairsThatOverlap = data.reduce((acc, pairs) => {
    const elfOneStart = parseInt(pairs[0]);
    const elfOneEnd = parseInt(pairs[1]);
    const elfTwoStart = parseInt(pairs[2]);
    const elfTwoEnd = parseInt(pairs[3]);
    // One of the numbers is the same
    if (
      elfOneStart === elfTwoStart ||
      elfOneEnd === elfTwoEnd ||
      elfOneStart === elfTwoEnd ||
      elfOneEnd === elfTwoStart
    ) {
      return acc + 1;
    }
    // Either way fully inside
    if (
      (elfOneStart < elfTwoStart && elfOneEnd > elfTwoEnd) ||
      (elfTwoStart < elfOneStart && elfTwoEnd > elfOneEnd)
    ) {
      return acc + 1;
    }
    // The elf one start falls in between
    if (elfOneStart > elfTwoStart && elfOneStart < elfTwoEnd) {
      return acc + 1;
    }
    // The elf two start falls in between
    if (elfTwoStart > elfOneStart && elfTwoStart < elfOneEnd) {
      return acc + 1;
    }
    // The elf one end falls in between
    if (elfOneEnd > elfTwoStart && elfOneEnd < elfTwoEnd) {
      return acc + 1;
    }
    // The elf two end falls in between
    if (elfTwoEnd > elfOneStart && elfTwoEnd < elfOneEnd) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log('Answer 2:', sumOfPairsThatOverlap);

  // Better code from reddit:
  // const numbers = rawData
  //   .split('\n')
  //   .map((line) => line.replace(',', '-').split('-').map(Number));

  // console.log(
  //   numbers.filter((nums) => (nums[0] - nums[2]) * (nums[1] - nums[3]) <= 0)
  //     .length
  // );
  // console.log(
  //   numbers.filter((nums) => (nums[0] - nums[2]) * (nums[1] - nums[3]) >= 0)
  //     .length
  // );
};

module.exports = init;
