export const ERROR_ACTIONS = {
  ERROR: 'ERROR'
};

interface ErrorAction {
  type: typeof ERROR_ACTIONS.ERROR;
  payload: string;
}

export type { ErrorAction };
