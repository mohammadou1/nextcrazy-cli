import inquirer from "inquirer";

export async function promptComponentOptions(options) {
  if (!options.name) {
    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "What is this component's name?",
    });
    if(name.trim()) options.name = name.split(" ").join("-");
  }
}
