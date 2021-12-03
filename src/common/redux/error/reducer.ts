import { ERROR_ACTIONS } from './ActionTypes';

export interface TableState {
  error: string;
}

const initialState: TableState = {
  error: ''
};

const reducer = (state = initialState, action: any): TableState => {
  switch (action.type) {
    case ERROR_ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
