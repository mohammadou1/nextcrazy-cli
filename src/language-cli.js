import inquirer from "inquirer";

export async function promptLanguageOptions(options) {
  if (!options.name) {
    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "Please insert a key (eg: fr)",
    });
    if (name.trim()) options.name = name.split(" ").join("-");
  }
}
