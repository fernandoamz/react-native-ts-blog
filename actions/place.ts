import {ADD_PLACE, REMOVE_PLACE, EDIT_NAME} from './types';

export const addPlace = (placeName: string) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};

export const removePlace = (key: number) => {
  return {
    type: REMOVE_PLACE,
    payload: key,
  };
};

export const nameTextBox = (name: string) => {
  return {
    type: EDIT_NAME,
    payload: name,
  };
};
