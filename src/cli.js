import arg from "arg";
import chalk from "chalk";
import inquirer from "inquirer";
import { nextCrazy } from "./main";
import { promptPageOptions } from "./page-cli";
import { promptComponentOptions } from "./component-cli";
import { promptLanguageOptions } from "./language-cli";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--name": String,
      "--out": Boolean,
      "--ssr": Boolean,
      "-n": "--name",
      "-o": "--out",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args["--name"],
    out: args["--out"],
    ssr: args["--ssr"],
    module: args._[0],
  };
}

async function handleAndPromptOptions(options) {
  const valid_modules = ["page", "language", "component"];
  if (options.module && !valid_modules.includes(options.module)) {
    return console.log(chalk.red(`Invalid argument ${options.module}`));
  }
  if (!options.module) {
    const { module } = await inquirer.prompt({
      type: "list",
      name: "module",
      message: "Want to create a page or a language?",
      choices: ["Page", "Component", "Language"],
      default: "page",
    });
    options.module = module.toLowerCase();
  }
  if (options.module === "page") {
    options.out = options.out;
    options.ssr = options.ssr;
    await promptPageOptions(options);
  }

  if (options.module === "component") {
    await promptComponentOptions(options);
  }

  if (options.module === "language") {
    await promptLanguageOptions(options);
  }

  return options;
}

export async function cli(args) {
  try {
    let options = parseArgumentsIntoOptions(args);
    options = await handleAndPromptOptions(options);
    if (!options.name)
      return console.log(chalk.red(`${options.module} name is required`));
    await nextCrazy(options);
  } catch (error) {
    console.log(error);
    console.error(error, chalk.red.bold("ERROR"));
  }
}
