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

  if (!options.rtl) {
    const { rtl } = await inquirer.prompt({
      type: "list",
      name: "rtl",
      message: "What is the default direction of this language?",
      choices: [
        { value: true, name: "Right to left (RTL)" },
        { value: false, name: "Left to right (LTR)" },
      ],
    });
    options.rtl = rtl;
  }
}
