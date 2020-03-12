"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const counterReducer_1 = __importDefault(require("./reducers/counterReducer"));
const rootReducer = redux_1.combineReducers({
    counter: counterReducer_1.default,
});
const configureStore = () => {
    return redux_1.createStore(rootReducer);
};
exports.default = configureStore;
