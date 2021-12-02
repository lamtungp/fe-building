import { DeleteAction, COMPANY_ACTIONS } from './ActionTypes';

export const deleteItem = (params: boolean): DeleteAction => {
  return {
    type: COMPANY_ACTIONS.IS_DELETE,
    payload: params
  };
};
