const getData = require('../../utils/getData');

const init = () => {
  const currentDir = __dirname.split('advent-of-code')[1];
  // const file = `.${currentDir}/data_test.txt`;
  const file = `.${currentDir}/data.txt`;
  const data = getData(file);
};

module.exports = init;
