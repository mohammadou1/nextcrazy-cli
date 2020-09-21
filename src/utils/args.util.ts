import { showError, showInfo } from "./logger.util";
import arg from "arg";

export const parseArgs = () => {
  try {
    const args = arg(
      {
        "--help": Boolean,
        "--version": Boolean,
        "-v": "--version",
        "-h": "--help",
      },
      { permissive: false, argv: process.argv.slice(2) }
    );

    if (args["--version"]) {
      const pkg = require("../../package.json");
      showInfo(pkg.version);
    }

    if (args["--help"]) {
      console.log(`
            Options:
            ----------------------------------------------------
            Page         creates a new page inside [lang] folder
                         it supports both SSG and SSR, if SSG was
                         selected, it will provide an example 
                         for "getStaticPaths".
            ---------------------------------------------------- 
            Component    creates a new component inside component
                         folder, it will import "useAuth"
                         and a "translation" example for you.  
            ---------------------------------------------------- 
            Language     creates a language folder inside 
                         "translations" directory, it will update
                         "translations.json" and add the specified
                         language with it's direction

            Project      creates a new project from "nextcrazy" 
                         repo, use it the folder you want to
                         install your template to,
                         you need to pass a name,
                         you can shorten it by using
                         "nextcrazy-cli project project-name"             
            `);
    }

    return {
      args,
      error: false,
    };
  } catch (error) {
    if (error.code === "ARG_UNKNOWN_OPTION") {
      showError("Unkown option was provided");
    } else {
      console.log(error);
    }
    return {
      args: null,
      error: true,
    };
  }
};
