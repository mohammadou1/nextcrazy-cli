import fs from "fs";
import write from "write";

export function generateLanguage(name) {
  try {
    const translationJson = process.cwd() + "/translation.json";
    const raw = fs.readFileSync(translationJson);

    const rawParsed = JSON.parse(raw);
    if (!rawParsed.languages.includes(name)) rawParsed.languages.push(name);

    fs.writeFileSync(
      translationJson,
      JSON.stringify(rawParsed)
        .replace(",", ",\n")
        .replace("{", "{\n")
        .replace("}", "\n}")
    );

    const translationsFolder = process.cwd() + "/translations/" + name;

    const index = `import common from './common.json';
export default {
   common,
};
`;

    const json = `{
    "nextcrazy":""
}`;
    write(translationsFolder + "/index.ts", index, {
      overwrite: false,
      increment: false,
    });

    write(translationsFolder + "/common.json", json, {
      overwrite: false,
      increment: false,
    });
  } catch (error) {
    console.log(error);
  }
}
