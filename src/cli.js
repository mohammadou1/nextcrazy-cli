import arg from "arg";
import chalk from "chalk";
import inquirer from "inquirer";
import { nextCrazy } from "./main";
import { promptPageOptions } from "./page-cli";
import { promptComponentOptions } from "./component-cli";
import { promptLanguageOptions } from "./language-cli";
import fs from "fs";
import path from "path";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--name": String,
      "--out": Boolean,
      "--ssr": Boolean,
      "--version": Boolean,
      "--rtl": Boolean,
      "-n": "--name",
      "-o": "--out",
      "-v": "--version",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    module: args._[0],
    out: args["--out"],
    ssr: args["--ssr"],
    rtl: args["--rtl"],
    name: args["--name"],
    version: args["--version"],
  };
}

function parseVersion() {
  const jsonPath = path.join(__dirname, "..", "package.json");
  const json = JSON.parse(fs.readFileSync(jsonPath));
  return json.version;
}

async function handleAndPromptOptions(options) {
  if (options.version) return console.log(parseVersion());

  const valid_modules = ["page", "language", "component", "p", "l", "c"];
  if (options.module && !valid_modules.includes(options.module)) {
    return console.log(chalk.red(`Invalid argument ${options.module}`));
  }
  if (!options.module) {
    const { module } = await inquirer.prompt({
      type: "list",
      name: "module",
      message: "What do you want to generate?",
      choices: ["Page", "Component", "Language"],
      default: "page",
    });
    options.module = module.toLowerCase();
  }
  if (options.module === "page" || options.module === "p") {
    options.out = options.out;
    options.ssr = options.ssr;
    options.module = "page";
    await promptPageOptions(options);
  }

  if (options.module === "component" || options.module === "c") {
    options.module = "component";
    await promptComponentOptions(options);
  }

  if (options.module === "language" || options.module === "l") {
    options.module = "language";
    await promptLanguageOptions(options);
  }

  return options;
}

export async function cli(args) {
  try {
    let options = parseArgumentsIntoOptions(args);
    options = await handleAndPromptOptions(options);
    if (options && !options.name)
      return console.log(chalk.red(`${options.module} name is required`));
    await nextCrazy(options);
  } catch (error) {
    console.log(error);
    console.error(error, chalk.red.bold("ERROR"));
  }
}
