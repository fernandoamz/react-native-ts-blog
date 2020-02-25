import {ADD_PLACE, REMOVE_PLACE} from '../actions/types';

const initialState = {
  name: '',
  placeName: '',
  places: [],
  key: 0,
};

const placeReducer = (state = initialState, action: any) => {
  const key: number = Math.random();

  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key,
          value: action.payload,
        } as any),
      };

    case REMOVE_PLACE:
      const filteredPlaces = state.places.filter(
        (place: any) => place.key !== action.payload,
      );

      return {
        ...state,
        places: filteredPlaces,
      };

    default:
      return state;
  }
};

export default placeReducer;
