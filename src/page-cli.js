import inquirer from "inquirer";

export async function promptPageOptions(options) {
  if (!options.name) {
    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "What is this page's name?",
    });
    options.name = name.split(" ").join("-");
  }
  if (options.out !== false && !options.out) {
    const { out } = await inquirer.prompt({
      type: "list",
      name: "out",
      message: "Where do you want the file to be generated ?",
      choices: ["Inside [lang]", "Outside [lang]"],
    });
    options.out = out === "Outside [lang]";
  }

  if (options.ssr !== false && !options.ssr) {
    const { ssr } = await inquirer.prompt({
      type: "list",
      name: "ssr",
      message: "What type of page do you want it?",
      choices: ["SSR", "SSG"],
    });
    options.ssr = ssr === "SSR";
  }
}
