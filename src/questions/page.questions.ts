import prompts from "prompts";
import { ConsoleMessage, Options } from "../interfaces/console.enum";

export const providePageQuestions = async () => {
  return await prompts([
    {
      name: "path",
      type: "text",
      message: ConsoleMessage.PAGE_QUESTION,
      validate: (value: string) =>
        !!value ? true : ConsoleMessage.PATH_REQUIRED,
    },
    {
      name: "type",
      type: "select",
      message: ConsoleMessage.PAGE_TYPE_QUEST,
      choices: [
        { title: "Static Site Page (SSG)", value: Options.SSG },
        { title: "Server Site Page (SSR)", value: Options.SSR },
      ],
    },
  ]);
};
