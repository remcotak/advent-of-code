const fs = require('fs');

const getFileContents = async (path) => {
  const rawData = await fs.readFileSync(path, 'utf8');
  return rawData;
};

const parseData = (rawData) =>
  rawData.split('\n\n').map((x) =>
    x
      .trim()
      .replace(/[\n ,]+/g, ',')
      .split(',')
      .map((y) => parseInt(y))
  );

/* Parse text file to readable data */
const getData = async (filePath) => {
  const rawData = await getFileContents(filePath);
  const data = parseData(rawData);

  return data;
};

module.exports = getData;
