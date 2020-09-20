import prompts from "prompts";
import { ConsoleMessage, Options } from "../interfaces/console.enum";

export const provideLanguageQuestion = async () => {
  return await prompts([
    {
      name: "key",
      type: "text",
      message: ConsoleMessage.LANGUAGE_QUESTION,
      validate: (value: string) =>
        !!value ? true : ConsoleMessage.KEY_REQUIRED,
    },
    {
      name: "dir",
      type: "select",
      message: ConsoleMessage.LANGUAGE_DIRECTION,
      choices: [
        { title: "Right to Left (RTL)", value: Options.RTL },
        { title: "Left to Right (LTR)", value: Options.LTR },
      ],
    },
  ]);
};
