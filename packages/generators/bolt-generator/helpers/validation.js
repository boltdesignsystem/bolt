const chalk = require('chalk');

const validateAnswers = (input, generatorType) => {
  if (input.includes('_')) {
    console.log(
      chalk.red(` Don't include underscores in your ${generatorType} name!`),
    );
    return false;
  } else if (input.includes(' ')) {
    console.log(
      chalk.red(` Don't include any spaces in your ${generatorType} name!`),
    );
    return false;
  } else if (input.toLowerCase().includes('bolt')) {
    console.log(
      chalk.red(
        ` Make sure you aren't including the word \`bolt\` in your ${generatorType} name -- we take care of adding that automatically!`,
      ),
    );
    return false;
  } else if (!input) {
    console.log(
      chalk.red(`You need to name your new Bolt ${generatorType} something!`),
    );
    return false;
  }
  return true;
}

module.exports = validateAnswers;
