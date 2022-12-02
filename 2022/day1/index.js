const getData = require('../../utils/getData');

const parseData = (rawData) =>
  rawData.split('\n\n').map((x) =>
    x
      .trim()
      .replace(/[\n ,]+/g, ',')
      .split(',')
      .map((y) => parseInt(y))
  );

const countTotalNumberOfCalories = (meals) =>
  meals.reduce((accumulator, currentValue) => accumulator + currentValue);

const init = async () => {
  const rawData = await getData(__dirname);
  const data = parseData(rawData);

  const caloriesPerElf = data.map((elfMeals) =>
    countTotalNumberOfCalories(elfMeals)
  );

  const mostAmountOfCalories = Math.max(...caloriesPerElf);
  console.log('Answer 1: ', mostAmountOfCalories);

  const caloriesPerElfSorted = caloriesPerElf.sort((a, b) => b - a);

  const numberOfTopElfs = 3;
  const topElfsCalories = [];
  for (let i = 0; i < numberOfTopElfs; i += 1) {
    topElfsCalories.push(caloriesPerElfSorted[i]);
  }

  const totalNumberOfCalories = countTotalNumberOfCalories(topElfsCalories);
  console.log('Answer 2: ', totalNumberOfCalories);
};

module.exports = init;
