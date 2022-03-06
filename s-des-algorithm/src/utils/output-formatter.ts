import boxen from 'boxen';
import chalk from 'chalk';

export const createCliOutput = (text: string, textColor: chalk.Chalk, borderColor: string) => {
  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderColor
  };

  const formattedBinary = textColor.bold(text);
  return boxen(formattedBinary, boxenOptions);
};
