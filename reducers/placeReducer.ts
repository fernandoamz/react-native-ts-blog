import {ADD_PLACE} from '../actions/types';

const initialState = {
  placeName: '',
  places: [],
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

    default:
      return state;
  }
};

export default placeReducer;
