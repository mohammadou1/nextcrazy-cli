"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLanguage = void 0;
const tslib_1 = require("tslib");
const questions_1 = require("../questions");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const write_1 = tslib_1.__importDefault(require("write"));
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const logger_util_1 = require("../utils/logger.util");
const console_enum_1 = require("../interfaces/console.enum");
exports.generateLanguage = async () => {
    const { dir, key } = await questions_1.provideLanguageQuestion();
    try {
        const json = process.cwd() + "/translation.json";
        const raw = fs_1.default.readFileSync(json);
        const parsed = JSON.parse(raw.toString());
        parsed.languages[key] = dir;
        const defaultLanguage = parsed.defaultLanguage;
        generateLanguageFromTemplate("translation-json.hbs", key, parsed.languages, defaultLanguage, json);
    }
    catch (error) {
        logger_util_1.showError(console_enum_1.ConsoleMessage.TRANSLATIONS_JSON_NOT_FOUND);
    }
};
const generateLanguageFromTemplate = async (template, language, allLanguages, defaultLanguage, jsonPath) => {
    try {
        const data = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/templates/translation", template));
        const compiled = handlebars_1.default.compile(data.toString(), { noEscape: true });
        const output = compiled({
            allLanguages,
            defaultLanguage,
        });
        const index = `import common from './common.json';
export default {
   common,
};
`;
        const json = `{
   "nextcrazy":""
}
`;
        const dir = process.cwd() + "/translations/";
        const createIndex = write_1.default(dir + language + "/index.ts", index, {
            overwrite: false,
            increment: false,
        });
        const createDummy = write_1.default(dir + language + "/common.json", json, {
            overwrite: false,
            increment: false,
        });
        const updateLanguagesJson = write_1.default(jsonPath, output, {
            overwrite: true,
            increment: false,
        });
        await Promise.all([createIndex, createDummy, updateLanguagesJson]);
        logger_util_1.showSuccess(console_enum_1.ConsoleMessage.LANGUAGE_GENERATED_SUCCESSFULLY);
    }
    catch (error) {
        logger_util_1.showError(console_enum_1.ConsoleMessage.LANGUAGE_EXISTS);
    }
};
