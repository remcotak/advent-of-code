const getData = require('../../utils/getData');

const init = async () => {
  const data = await getData(__dirname);
  console.log(data);
};

module.exports = init;
