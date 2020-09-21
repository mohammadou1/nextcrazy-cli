import { showError, showTitleAndBanner } from "./utils/logger.util";
import { parseArgs } from "./utils/args.util";
import { generateComponent, generateLanguage, generatePage } from "./actions";
import { provideProjectQuestions, provideQuestions } from "./questions";
import { ConsoleMessage, Options } from "./interfaces/console.enum";
import { createProject } from "./utils/create-project.util";

const NextCrazy = async (): Promise<any> => {
  showTitleAndBanner();

  const { args, error } = parseArgs();

  if (error) return;

  if (args) {
    if (args["--help"] || args["--version"]) return;

    // If "project" arg was passed to create a new project
    if (args["_"].find((arg) => arg === "project")) {
      if (!args["_"][1]) return showError(ConsoleMessage.NAME_REQUIRED);

      await createProject(args["_"][1]);
      return;
    }
  }

  const answer = await provideQuestions();

  if (answer === Options.PROJECT) {
    const { path } = await provideProjectQuestions();
    if(path) createProject(path);
    return
  }
  if (answer === Options.PAGE) {
    return generatePage();
  }
  if (answer === Options.COMPONENT) {
    return generateComponent();
  }
  if (answer === Options.LANGUAGE) {
    return generateLanguage();
  }
};

export default NextCrazy;
