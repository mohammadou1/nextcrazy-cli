import prompts from "prompts";
import { ConsoleMessage, Options } from "../interfaces/console.enum";

export const provideQuestions = async (): Promise<any> => {
  const { type } = await prompts({
    type: "select",
    name: "type",
    message: ConsoleMessage.MAIN_QUEST,
    choices: [
      { title: "Page", value: Options.PAGE },
      { title: "Component", value: Options.COMPONENT },
      { title: "Language", value: Options.LANGUAGE },
      { title: "Project", value: Options.PROJECT },
    ],
  });

  return type;
};
