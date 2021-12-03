import { ERROR_ACTIONS, ErrorAction } from './ActionTypes';

export const setError = (params: string): ErrorAction => {
  return {
    type: ERROR_ACTIONS.ERROR,
    payload: params
  };
};
