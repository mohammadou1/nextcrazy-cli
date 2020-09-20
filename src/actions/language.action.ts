import { provideLanguageQuestion } from "../questions";
import fs from "fs";
import path from "path";
import write from "write";
import handlerbars from "handlebars";
import { showError, showSuccess } from "../utils/logger.util";
import { ConsoleMessage } from "../interfaces/console.enum";

interface Answers {
  dir: string;
  key: string;
}
export const generateLanguage = async () => {
  const { dir, key }: Answers = await provideLanguageQuestion();

  try {
    const json = process.cwd() + "/translation.json";
    const raw = fs.readFileSync(json);
    const parsed = JSON.parse(raw.toString());

    parsed.languages[key] = dir;
    const defaultLanguage = parsed.defaultLanguage;

    generateLanguageFromTemplate(
      "translation-json.hbs",
      key,
      parsed.languages,
      defaultLanguage,
      json
    );
  } catch (error) {
    showError(ConsoleMessage.TRANSLATIONS_JSON_NOT_FOUND);
  }
};

const generateLanguageFromTemplate = async (
  template: string,
  language: string,
  allLanguages: string[],
  defaultLanguage: string,
  jsonPath: string
) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "../../src/templates/translation", template)
    );
    const compiled = handlerbars.compile(data.toString(), { noEscape: true });
    const output = compiled({
      allLanguages,
      defaultLanguage,
    });

    /* ---------------------- add index inside lang folder ---------------------- */
    const index = `import common from './common.json';
export default {
   common,
};
`;

    /* ---------------------------- example json file --------------------------- */
    const json = `{
   "nextcrazy":""
}
`;

    const dir = process.cwd() + "/translations/";

    const createIndex = write(dir + language + "/index.ts", index, {
      overwrite: false,
      increment: false,
    });

    const createDummy = write(dir + language + "/common.json", json, {
      overwrite: false,
      increment: false,
    });

    const updateLanguagesJson = write(jsonPath, output, {
      overwrite: true,
      increment: false,
    });

    await Promise.all([createIndex, createDummy, updateLanguagesJson]);

    showSuccess(ConsoleMessage.LANGUAGE_GENERATED_SUCCESSFULLY);
  } catch (error) {
    showError(ConsoleMessage.LANGUAGE_EXISTS);
  }
};
