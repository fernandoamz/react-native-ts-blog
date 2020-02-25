"use strict";
/**
 * @format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("react-native");
const react_1 = __importDefault(require("react"));
const App_1 = __importDefault(require("../components/App"));
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const placeReducer_1 = __importDefault(require("../reducers/placeReducer"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const store = redux_1.createStore(placeReducer_1.default);
it('renders correctly', () => {
    react_test_renderer_1.default.create(react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(App_1.default, null)));
});
