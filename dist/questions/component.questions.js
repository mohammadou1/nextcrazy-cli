"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideComponentQuestions = void 0;
const tslib_1 = require("tslib");
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const console_enum_1 = require("../interfaces/console.enum");
exports.provideComponentQuestions = async () => {
    return await prompts_1.default({
        name: "path",
        type: "text",
        message: console_enum_1.ConsoleMessage.COMPONENT_QUESTION,
        validate: (value) => !!value ? true : console_enum_1.ConsoleMessage.PATH_REQUIRED,
    });
};
