"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.addPlace = (placeName) => {
    return {
        type: types_1.ADD_PLACE,
        payload: placeName,
    };
};
exports.removePlace = (key) => {
    return {
        type: types_1.REMOVE_PLACE,
        payload: key,
    };
};
