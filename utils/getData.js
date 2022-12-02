const fs = require('fs');

const getFileContents = async (path) => {
  const rawData = await fs.readFileSync(path, 'utf8');
  return rawData;
};

/* Parse text file to readable data */
const getData = async (puzzleDir) => {
  const currentDir = puzzleDir.split('advent-of-code')[1];
  const useTestData = process.argv.slice(2)[0] === '--test';
  const filePath = `.${currentDir}/data${useTestData ? '_test' : ''}.txt`;
  const rawData = await getFileContents(filePath);

  return rawData;
};

module.exports = getData;
