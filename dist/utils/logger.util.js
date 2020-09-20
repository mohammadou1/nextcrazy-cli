"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = exports.showSuccess = exports.showInfo = exports.showTitleAndBanner = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const figlet = tslib_1.__importStar(require("figlet"));
const console_enum_1 = require("../interfaces/console.enum");
const newLine = "\n";
exports.showTitleAndBanner = () => {
    console.log(chalk_1.default.cyan(figlet.textSync(console_enum_1.ConsoleMessage.TITLE, { horizontalLayout: "fitted" })));
    console.info(chalk_1.default.cyan(console_enum_1.ConsoleMessage.BANNER));
};
exports.showInfo = (message) => {
    console.info(chalk_1.default.cyan(console_enum_1.ConsoleMessage.INFO + message) + newLine);
};
exports.showSuccess = (message) => {
    console.info(chalk_1.default.green(console_enum_1.ConsoleMessage.SUCCESS + message));
};
exports.showError = (message) => {
    console.info(chalk_1.default.red(console_enum_1.ConsoleMessage.ERROR + message));
};
