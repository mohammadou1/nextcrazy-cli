import chalk from "chalk";
import * as figlet from "figlet";
import { ConsoleMessage } from "../interfaces/console.enum";

// const newLine = "\n";

export const showTitleAndBanner = (): void => {
  console.log(
    chalk.cyan(
      figlet.textSync(ConsoleMessage.TITLE, { horizontalLayout: "fitted" })
    )
  );
  console.info(chalk.cyan(ConsoleMessage.BANNER));
};

export const showInfo = (message: string): void => {
  console.info(chalk.cyan(ConsoleMessage.INFO + message));
};

export const showSuccess = (message: string): void => {
  console.info(chalk.green(ConsoleMessage.SUCCESS + message));
};

export const showError = (message: string): void => {
  console.info(chalk.red(ConsoleMessage.ERROR + message));
};
