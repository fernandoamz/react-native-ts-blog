"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    placeName: '',
    places: [],
    key: 0,
};
const placeReducer = (state = initialState, action) => {
    const key = Math.random();
    switch (action.type) {
        case types_1.ADD_PLACE:
            return Object.assign(Object.assign({}, state), { places: state.places.concat({
                    key,
                    value: action.payload,
                }) });
        case types_1.REMOVE_PLACE:
            const filteredPlaces = state.places.filter((place) => place.key !== action.payload);
            return Object.assign(Object.assign({}, state), { places: filteredPlaces });
        default:
            return state;
    }
};
exports.default = placeReducer;
