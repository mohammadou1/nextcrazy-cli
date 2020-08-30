import handlerbars from "handlebars";
import camelCase from "camelcase";
import write from "write";
import fs from "fs";
import chalk from "chalk";
import path from "path";

const getPath = (dest) => path.join(__dirname, dest);

export function generateComponent(path) {
  let name = path.split("/");

  name = name[name.length - 1].replace(/(\[|\])/g, "");
  name = camelCase(name, { pascalCase: true });

  fs.readFile(getPath("./component.hbs"), (err, data) => {
    if (!err) {
      const source = data.toString();
      const compiled = handlerbars.compile(source, { noEscape: true });
      const output = compiled({
        name,
      });

      const destination = `${process.cwd()}/components/${path}.tsx`;

      write(destination, output, {
        overwrite: false,
        increment: false,
      }).then(() =>
        console.log(chalk.green("File was generated successfully!"))
      );
    }
  });
}
