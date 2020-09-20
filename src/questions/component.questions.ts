import prompts from "prompts";
import { ConsoleMessage } from "../interfaces/console.enum";

export const provideComponentQuestions = async () => {
  return await prompts({
    name: "path",
    type: "text",
    message: ConsoleMessage.COMPONENT_QUESTION,
    validate: (value: string) =>
      !!value ? true : ConsoleMessage.PATH_REQUIRED,
  });
};
