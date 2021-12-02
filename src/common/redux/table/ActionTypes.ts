export const COMPANY_ACTIONS = {
  IS_DELETE: 'IS_DELETE',
  SELECT_COMPANY: 'SELECT_COMPANY'
};

interface DeleteAction {
  type: typeof COMPANY_ACTIONS.IS_DELETE;
  payload: boolean;
}

interface SelectCompanyAction {
  type: typeof COMPANY_ACTIONS.IS_DELETE;
  payload: string;
}

export type { DeleteAction, SelectCompanyAction };
