"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const tslib_1 = require("tslib");
const nextcrazy_1 = tslib_1.__importDefault(require("./nextcrazy"));
const clear_1 = tslib_1.__importDefault(require("clear"));
function index() {
    clear_1.default();
    return nextcrazy_1.default();
}
exports.index = index;
index();
