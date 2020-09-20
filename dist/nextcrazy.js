"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = require("./utils/logger.util");
const actions_1 = require("./actions");
const questions_1 = require("./questions");
const console_enum_1 = require("./interfaces/console.enum");
const NextCrazy = async () => {
    logger_util_1.showTitleAndBanner();
    const answer = await questions_1.provideQuestions();
    if (answer === console_enum_1.Options.PAGE) {
        return actions_1.generatePage();
    }
    if (answer === console_enum_1.Options.COMPONENT) {
        return actions_1.generateComponent();
    }
    if (answer === console_enum_1.Options.LANGUAGE) {
        return actions_1.generateLanguage();
    }
};
exports.default = NextCrazy;
