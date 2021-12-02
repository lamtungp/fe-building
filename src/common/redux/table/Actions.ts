import {
  DeleteAction,
  SelectCompanyAction,
  COMPANY_ACTIONS
} from './ActionTypes';

export const deleteItem = (params: boolean): DeleteAction => {
  return {
    type: COMPANY_ACTIONS.IS_DELETE,
    payload: params
  };
};

export const selectCompany = (params: string): SelectCompanyAction => {
  return {
    type: COMPANY_ACTIONS.SELECT_COMPANY,
    payload: params
  };
};
