import { generatePage, generateComponent } from "../templates";
import { generateLanguage } from "./utils/language";

export async function nextCrazy(options) {
  options = {
    ...options,
    directory: process.cwd(),
  };
  if (options.module === "page")
    generatePage(options.name, options.out, options.ssr);

  if (options.module === "component") generateComponent(options.name);

  if (options.module === "language") generateLanguage(options.name);
}
