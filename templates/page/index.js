import handlerbars from "handlebars";
import camelCase from "camelcase";
import write from "write";
import fs from "fs";
import chalk from "chalk";
import path from "path";

handlerbars.registerHelper('dynamic', function(context) {
    return JSON.stringify(context);
});

const getPath = (dest) => path.join(__dirname, dest);

export function generatePage(path, outside = false,ssr = false) {
  const isDynamic = path.match(/\[\w*\]/g);

  let pageName = path.split("/");

  pageName = pageName[pageName.length - 1].replace(/(\[|\])/g, "");
  pageName = camelCase(pageName, { pascalCase: true });

  const dynamicParams = [];
  const dynamicParamsObject = {};
  if (isDynamic && !ssr) {
    console.log(
      chalk.blue(
        "Path contains dynamic parameters, an example was generated for you."
      )
    );
    isDynamic.forEach(
      (key) => (dynamicParamsObject[key.replace(/(\[|\])/g, "")] = "test")
    );
    dynamicParams.push(dynamicParamsObject);
  }

  fs.readFile(getPath(ssr ? './ssr-page.hbs' : "./ssg-page.hbs"), (err, data) => {
    if (!err) {
      const source = data.toString();
      const compiled = handlerbars.compile(source,{noEscape:true});
      const output = compiled({
        outside,
        pageName,
        isDynamicRoute:isDynamic,
        dynamicParams,
        ssr
      });

      const destination = `${process.cwd()}/pages/${
        outside ? "" : "[lang]"
      }/${path}.tsx`;

      write(destination, output, {
        overwrite: false,
        increment: false,
      }).then(() => console.log(chalk.green('File was generated successfully!')));
    }
  });
}
