"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideLanguageQuestion = void 0;
const tslib_1 = require("tslib");
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const console_enum_1 = require("../interfaces/console.enum");
exports.provideLanguageQuestion = async () => {
    return await prompts_1.default([
        {
            name: "key",
            type: "text",
            message: console_enum_1.ConsoleMessage.LANGUAGE_QUESTION,
            validate: (value) => !!value ? true : console_enum_1.ConsoleMessage.KEY_REQUIRED,
        },
        {
            name: "dir",
            type: "select",
            message: console_enum_1.ConsoleMessage.LANGUAGE_DIRECTION,
            choices: [
                { title: "Right to Left (RTL)", value: console_enum_1.Options.RTL },
                { title: "Left to Right (LTR)", value: console_enum_1.Options.LTR },
            ],
        },
    ]);
};
