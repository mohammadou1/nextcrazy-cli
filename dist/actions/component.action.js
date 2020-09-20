"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = void 0;
const tslib_1 = require("tslib");
const questions_1 = require("../questions");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const write_1 = tslib_1.__importDefault(require("write"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const logger_util_1 = require("../utils/logger.util");
const console_enum_1 = require("../interfaces/console.enum");
exports.generateComponent = async () => {
    const { path } = await questions_1.provideComponentQuestions();
    const directories = path.split("/");
    let name = directories[directories.length - 1].replace(/(\[|\])/g, "");
    name = camelcase_1.default(name, { pascalCase: true });
    generateFromTemplate("component.hbs", path, { name });
};
const generateFromTemplate = async (template, destination, payload) => {
    try {
        const data = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/templates/component", template));
        const compiled = handlebars_1.default.compile(data.toString(), { noEscape: true });
        const output = compiled(payload);
        const dir = `${process.cwd()}/components/${destination
            .split(" ")
            .join("-")}.tsx`;
        await write_1.default(dir, output, { overwrite: false, increment: false });
        logger_util_1.showSuccess(console_enum_1.ConsoleMessage.COMPONENT_GENERATED_SUCCESSFULLY);
    }
    catch (error) {
        logger_util_1.showError(console_enum_1.ConsoleMessage.COMPONENT_EXISTS);
    }
};
