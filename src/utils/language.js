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

    // const allLanguages = Object.keys(rawParsed.languages);
    const defaultLanguage = rawParsed.defaultLanguage;

    fs.readFile(
      getPath("../../templates/translation/translation-json.hbs"),
      (err, data) => {
        if (!err) {
          const source = data.toString();
          const compiled = handlerbars.compile(source, { noEscape: true });
          const output = compiled({
            allLanguages:rawParsed.languages,
            defaultLanguage,
          });

          write(translationJson, output, {
            overwrite: true,
            increment: false,
          });
        }
      }
    );

    const index = `import common from './common.json';
    export default {
      common,
    };
    `;

    const json = `{
      "nextcrazy":""
    }`;

    const translationsFolder = process.cwd() + "/translations/";

    write(translationsFolder + lang + "/index.ts", index, {
      overwrite: false,
      increment: false,
    });

    write(translationsFolder + lang + "/common.json", json, {
      overwrite: false,
      increment: false,
    });

    // fs.readFile(
    //   getPath("../../templates/translation/translation-index.hbs"),
    //   (err, data) => {
    //     if (!err) {
    //       const source = data.toString();
    //       const compiled = handlerbars.compile(source, { noEscape: true });
    //       const output = compiled({
    //         allLanguages,
    //       });

    //       const destination = `${process.cwd()}/translations/index.ts`;

    //       write(destination, output, {
    //         overwrite: true,
    //         increment: false,
    //       }).then(() =>
    //         console.log(chalk.green("Language was generated successfully!"))
    //       );
    //     }
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
}
