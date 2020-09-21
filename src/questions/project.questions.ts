import prompts from "prompts";
import { ConsoleMessage } from "../interfaces/console.enum";

export const provideProjectQuestions = async () => {
  return await prompts({
    name: "path",
    type: "text",
    message: ConsoleMessage.PROJECT_NAME_QUESTION,
    validate: (value: string) =>
      !!value ? true : ConsoleMessage.NAME_REQUIRED,
  });
};
