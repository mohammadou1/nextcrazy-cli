"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePage = void 0;
const tslib_1 = require("tslib");
const console_enum_1 = require("../interfaces/console.enum");
const questions_1 = require("../questions");
const logger_util_1 = require("../utils/logger.util");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const write_1 = tslib_1.__importDefault(require("write"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
handlebars_1.default.registerHelper("dynamic", function (context) {
    return JSON.stringify(context);
});
exports.generatePage = async () => {
    const { path, type } = await questions_1.providePageQuestions();
    logger_util_1.showInfo(console_enum_1.ConsoleMessage.GENERATING_PAGE);
    const dynamicRoutes = path.match(/\[\w*\]/g);
    const directories = path.split("/");
    let pageName = directories[directories.length - 1].replace(/(\[|\])/g, "");
    pageName = camelcase_1.default(pageName, { pascalCase: true });
    const exampleObject = {};
    if (dynamicRoutes && type === console_enum_1.Options.SSG) {
        logger_util_1.showInfo(console_enum_1.ConsoleMessage.DYNAMIC_SSG);
        dynamicRoutes.forEach((route) => (exampleObject[route.replace(/(\[|\])/g, "")] = "test"));
    }
    if (type === console_enum_1.Options.SSG)
        generateFromTemplate("ssg-page.hbs", path, {
            pageName,
            isDynamicRoute: !!dynamicRoutes,
            dynamicParams: exampleObject,
        });
    else {
        generateFromTemplate("ssr-page.hbs", path, { pageName });
    }
};
const generateFromTemplate = async (template, destination, payload) => {
    try {
        const data = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/templates/page", template));
        const compiled = handlebars_1.default.compile(data.toString(), { noEscape: true });
        const output = compiled({
            outside: false,
            ...payload,
        });
        const dir = `${process.cwd()}/pages/[lang]/${destination
            .split(" ")
            .join("-")}.tsx`;
        await write_1.default(dir, output, { overwrite: false, increment: false });
        logger_util_1.showSuccess(console_enum_1.ConsoleMessage.PAGE_GENERATED_SUCCESSUFLLY);
    }
    catch (error) {
        logger_util_1.showError(console_enum_1.ConsoleMessage.PAGE_EXISTS);
    }
};
