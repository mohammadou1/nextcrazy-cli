export enum ConsoleMessage {
  TITLE = "NEXTCRAZY-CLI",
  BANNER = "Generate files to support NextCrazy boilerplate.",
  MAIN_QUEST = "What would you like to generate?",

  // PAGES QUESTIONS
  PAGE_QUESTION = "What is the page path? (eg: /blogs/[slug])",
  PAGE_TYPE_QUEST = "What type do you want this page to be?",
  DYNAMIC_SSG = "Path contains dynamic route, an example is generated for you!",
  PAGE_GENERATED_SUCCESSUFLLY = "Page generated successfully!",
  PAGE_EXISTS = "Page already exists",

  // COMPONENTS
  COMPONENT_QUESTION = "What is the component path? (eg:/common/button)",
  COMPONENT_EXISTS = "Component already exists",
  COMPONENT_GENERATED_SUCCESSFULLY = "Component generated successfully!",

  // LANGUAGE
  LANGUAGE_QUESTION = "Specify language key (eg: en-UK)",
  LANGUAGE_DIRECTION = "What is the text direction of this language?",
  LANGUAGE_GENERATED_SUCCESSFULLY = "Language generated successfully!",
  LANGUAGE_EXISTS = "Language exists, ignored generating folders, updating JSON only (in case the dir was manipulated)",
  TRANSLATIONS_JSON_NOT_FOUND = "translations.json not found in root directory.",

  // PROJECT
  GENERATING_PROJECT="Project is generating, please wait",
  PROJECT_GENERATED="The Project was successfully generated!",
  PROJECT_NAME_QUESTION = "What do you want to name this project?",
  NAME_REQUIRED = "Please pass project name as (nextcrazy-cli project project-name)",

  INFO = "INFO: ",
  SUCCESS = "SUCCESS: ",
  ERROR = "ERROR: ",
  GENERATING_PAGE = "Generating page file",
  PATH_REQUIRED = "Path is required to generate a file",
  KEY_REQUIRED = "Language key is required",
}

export enum Options {
  PAGE = "page",
  COMPONENT = "component",
  LANGUAGE = "language",
  PROJECT = "project",

  SSR = "ssr",
  SSG = "ssg",

  RTL = "rtl",
  LTR = "ltr",
}
