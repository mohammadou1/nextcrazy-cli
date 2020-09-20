import { ConsoleMessage, Options } from "../interfaces/console.enum";
import { providePageQuestions } from "../questions";
import { GeneratedPageProps, SSGExampleObject } from "../interfaces";
import { showError, showInfo, showSuccess } from "../utils/logger.util";
import handlerbars from "handlebars";
import camelcase from "camelcase";
import write from "write";
import fs from "fs";
import path from "path";

handlerbars.registerHelper("dynamic", function (context) {
  return JSON.stringify(context);
});

interface Answers {
  path: string;
  type: Options.SSG | Options.SSR;
}

export const generatePage = async () => {
  const { path, type }: Answers = await providePageQuestions();

  showInfo(ConsoleMessage.GENERATING_PAGE);

  /* -- If there is any page inside "[]", it will be treated as dnyamic page -- */
  const dynamicRoutes = path.match(/\[\w*\]/g);

  /* ---------------------------- splitting by "/" ---------------------------- */
  const directories = path.split("/");

  /* --------------------------- generate page name --------------------------- */
  let pageName = directories[directories.length - 1].replace(/(\[|\])/g, "");
  pageName = camelcase(pageName, { pascalCase: true });

  /* ----------- to add example params inside an SSG generated page ----------- */
  const exampleObject: SSGExampleObject = {};

  /* ---------- dynamic params should be only usable inside SSG pages --------- */
  if (dynamicRoutes && type === Options.SSG) {
    showInfo(ConsoleMessage.DYNAMIC_SSG);

    /* ------ creating a key value paris for every dynamic route (example) ------ */
    dynamicRoutes.forEach(
      (route) => (exampleObject[route.replace(/(\[|\])/g, "")] = "test")
    );
  }

  if (type === Options.SSG)
    /* ------------------------ getting template for SSG ----------------------- */
    generateFromTemplate("ssg-page.hbs", path, {
      pageName,
      isDynamicRoute: !!dynamicRoutes,
      dynamicParams: exampleObject,
    });
  else {
    /* ------------------------ getting template for SSR ----------------------- */
    generateFromTemplate("ssr-page.hbs", path, { pageName });
  }
};

const generateFromTemplate = async (
  template: string,
  destination: string,
  payload: GeneratedPageProps
) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "../../src/templates/page", template)
    );

    /* -------------------------------------------------------------------------- */
    /*      since the template is built with Handlebars, we are compiling it      */
    /* -------------------------------------------------------------------------- */

    const compiled = handlerbars.compile(data.toString(), { noEscape: true });
    const output = compiled({
      outside: false,
      ...payload,
    });

    /* ----------- generting the files for the user inside his project ---------- */
    const dir = `${process.cwd()}/pages/[lang]/${destination
      .split(" ")
      .join("-")}.tsx`;

    await write(dir, output, { overwrite: false, increment: false });

    showSuccess(ConsoleMessage.PAGE_GENERATED_SUCCESSUFLLY);
  } catch (error) {
    showError(ConsoleMessage.PAGE_EXISTS);
  }
};
