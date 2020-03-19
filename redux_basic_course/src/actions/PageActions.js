import { ActionTypes } from './actionTypes';

export function setYearActionCreator(year) {
  return {
    type: ActionTypes.setYear,
    payload: year,
  };
}
