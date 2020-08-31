import { generatePage, generateComponent } from "../templates";
import { generateLanguage } from "./utils/language";

export async function nextCrazy(options) {
  if (options.module === "page")
    generatePage(options.name, options.out, options.ssr);

  if (options.module === "component") generateComponent(options.name);

  if (options.module === "language")
    generateLanguage(options.name, options.rtl);
}
