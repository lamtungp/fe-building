export const COMPANY_ACTIONS = {
  IS_DELETE: 'IS_DELETE',
  SELECT_COMPANY: 'SELECT_COMPANY',
  SELECT_TIME: 'SELECT_TIME'
};

interface DeleteAction {
  type: typeof COMPANY_ACTIONS.IS_DELETE;
  payload: boolean;
}

interface SelectCompanyAction {
  type: typeof COMPANY_ACTIONS.SELECT_COMPANY;
  payload: string;
}

interface SelectTimeAction {
  type: typeof COMPANY_ACTIONS.SELECT_TIME;
  payload: string;
}

export type { DeleteAction, SelectCompanyAction, SelectTimeAction };
