const getData = require('../../utils/getData');

const parseData = (rawData) =>
  rawData
    .split('\n')
    .filter((n) => n)
    .map((x) => x.split(' '));

const init = async () => {
  const data = await getData(__dirname);
  console.log(data);
};

module.exports = init;
