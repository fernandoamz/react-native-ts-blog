"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.incrementCount = (counter) => {
    return {
        type: types_1.INCREMENT_COUNT,
        payload: counter,
    };
};
exports.decrementCount = (counter) => {
    return {
        type: types_1.DECREMENT_COUNT,
        payload: counter,
    };
};
