const getData = require('../../utils/getData');

const parseData = (rawData) => rawData.split('\n').filter((n) => n);

const init = async () => {
  const rawData = await getData(__dirname);
  const data = parseData(rawData);
  console.log(data);
};

module.exports = init;
