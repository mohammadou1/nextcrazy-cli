import prompts from "prompts";
import { ConsoleMessage, Options } from "../interfaces/console.enum";

export const provideProjectQuestions = async () => {
  const { path } = await prompts({
    name: "path",
    type: "text",
    message: ConsoleMessage.PROJECT_NAME_QUESTION,
    validate: (value: string) =>
      !!value ? true : ConsoleMessage.NAME_REQUIRED,
  });

  const { manager } = await provideManagerQuestion();

  return { path, manager };
};

export const provideManagerQuestion = async () => {
  return await prompts({
    name: "manager",
    type: "select",
    message: ConsoleMessage.PROJECT_PACKAGE_MANAGER,
    choices: [
      { title: "Yarn", value: Options.YARN },
      { title: "Npm", value: Options.NPM },
    ],
  });
};
