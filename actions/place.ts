import {ADD_PLACE} from './types';

export const addPlace = (placeName: string) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};
