"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providePageQuestions = void 0;
const tslib_1 = require("tslib");
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const console_enum_1 = require("../interfaces/console.enum");
exports.providePageQuestions = async () => {
    return await prompts_1.default([
        {
            name: "path",
            type: "text",
            message: console_enum_1.ConsoleMessage.PAGE_QUESTION,
            validate: (value) => !!value ? true : console_enum_1.ConsoleMessage.PATH_REQUIRED,
        },
        {
            name: "type",
            type: "select",
            message: console_enum_1.ConsoleMessage.PAGE_TYPE_QUEST,
            choices: [
                { title: "Static Site Page (SSG)", value: console_enum_1.Options.SSG },
                { title: "Server Site Page (SSR)", value: console_enum_1.Options.SSR },
            ],
        },
    ]);
};
