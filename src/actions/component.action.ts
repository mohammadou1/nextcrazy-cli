import { GeneratedComponentProps } from "../interfaces";
import { provideComponentQuestions } from "../questions";
import handlerbars from "handlebars";
import camelCase from "camelcase";
import write from "write";
import path from "path";
import fs from "fs";
import { showError, showSuccess } from "../utils/logger.util";
import { ConsoleMessage } from "../interfaces/console.enum";

interface Answers {
  path: string;
}

export const generateComponent = async () => {
  const { path }: Answers = await provideComponentQuestions();

  /* ---------------------------- splitting by "/" ---------------------------- */
  const directories = path.split("/");
  let name = directories[directories.length - 1].replace(/(\[|\])/g, "");
  name = camelCase(name, { pascalCase: true });
    /* --------------------- getting template for component ------------------- */
  generateFromTemplate("component.hbs", path, { name });
};

const generateFromTemplate = async (
  template: string,
  destination: string,
  payload: GeneratedComponentProps
) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "../../templates/component", template)
    );

    const compiled = handlerbars.compile(data.toString(), { noEscape: true });
    const output = compiled(payload);

    const dir = `${process.cwd()}/components/${destination
      .split(" ")
      .join("-")}.tsx`;

    await write(dir, output, { overwrite: false, increment: false });
    showSuccess(ConsoleMessage.COMPONENT_GENERATED_SUCCESSFULLY);
  } catch (error) {
    showError(ConsoleMessage.COMPONENT_EXISTS);
  }
};
