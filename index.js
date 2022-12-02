const now = new Date();
const year = now.getFullYear();
const date = now.getDate();

async function init() {
  try {
    console.log(`./${year}/day${date}/index.js`);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const puzzle = require(`./${year}/day${date}/index.js`);
    puzzle();
  } catch (error) {
    if (error) {
      console.error(error);
    } else {
      console.error(
        'No puzzle found for this year and date, use "node [path to js file]" to run puzzle'
      );
    }
  }
}

init();
