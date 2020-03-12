"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    counter: 0,
};
const counter = (state = initialState, action) => {
    switch (action.type) {
        case types_1.INCREMENT_COUNT:
            return Object.assign(Object.assign({}, state), { counter: state.counter + 1 });
        case types_1.DECREMENT_COUNT:
            return Object.assign(Object.assign({}, state), { counter: state.counter - 1 });
        default:
            return state;
    }
};
exports.default = counter;
