"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
var toString = function (num) {
    return String(num);
};
exports.toString = toString;
console.log((0, exports.toString)("hello"));
console.log((0, exports.toString)(undefined));
console.log({ cat: "cat" });
