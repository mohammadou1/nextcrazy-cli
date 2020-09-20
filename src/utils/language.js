import fs from "fs";
import write from "write";
import path from "path";
import handlerbars from "handlebars";
import chalk from "chalk";

const getPath = (dest) => path.join(__dirname, dest);

export async function generateLanguage(lang, rtl) {
  const dir = rtl ? "rtl" : "ltr";

  try {
    const translationJson = process.cwd() + "/translation.json";

    const raw = fs.readFileSync(translationJson);

    const rawParsed = JSON.parse(raw);
    if (!rawParsed.languages[lang]) rawParsed.languages[lang] = dir;

    const defaultLanguage = rawParsed.defaultLanguage;

    fs.readFile(
      getPath("../../templates/translation/translation-json.hbs"),
      async (err, data) => {
        if (!err) {
          const source = data.toString();
          const compiled = handlerbars.compile(source, { noEscape: true });
          const output = compiled({
            allLanguages: rawParsed.languages,
            defaultLanguage,
          });

          const index = `import common from './common.json';
          export default {
            common,
          };
          `;

          const json = `{
            "nextcrazy":""
          }`;

          const translationsFolder = process.cwd() + "/translations/";

          const updateFolders = write(
            translationsFolder + lang + "/index.ts",
            index,
            {
              overwrite: false,
              increment: false,
            }
          );

          const writeTranslation = write(translationJson, output, {
            overwrite: true,
            increment: false,
          });

          const writeJsonExample = write(
            translationsFolder + lang + "/common.json",
            json,
            {
              overwrite: false,
              increment: false,
            }
          );

          await Promise.all([
            writeTranslation,
            updateFolders,
            writeJsonExample,
          ]);

          console.log(chalk.green("Language was added successfully!"));
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
