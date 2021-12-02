export const COMPANY_ACTIONS = {
  IS_DELETE: 'IS_DELETE'
};
interface DeleteAction {
  type: typeof COMPANY_ACTIONS.IS_DELETE;
  payload: boolean;
}

export type { DeleteAction };
