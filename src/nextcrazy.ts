import { showTitleAndBanner } from "./utils/logger.util";
import { generateComponent, generateLanguage, generatePage } from "./actions";
import { provideQuestions } from "./questions";
import { Options } from "./interfaces/console.enum";

const NextCrazy = async (): Promise<any> => {
  showTitleAndBanner();

  const answer = await provideQuestions();
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
