"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const placeReducer_1 = __importDefault(require("./reducers/placeReducer"));
const rootReducer = redux_1.combineReducers({
    places: placeReducer_1.default,
});
const configureStore = () => {
    return redux_1.createStore(rootReducer);
};
exports.default = configureStore;
