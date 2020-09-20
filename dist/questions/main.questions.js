"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideQuestions = void 0;
const tslib_1 = require("tslib");
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const console_enum_1 = require("../interfaces/console.enum");
exports.provideQuestions = async () => {
    const { type } = await prompts_1.default({
        type: "select",
        name: "type",
        message: console_enum_1.ConsoleMessage.MAIN_QUEST,
        choices: [
            { title: "Page", value: console_enum_1.Options.PAGE },
            { title: "Component", value: console_enum_1.Options.COMPONENT },
            { title: "Language", value: console_enum_1.Options.LANGUAGE },
        ],
    });
    return type;
};
