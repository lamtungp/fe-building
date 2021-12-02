import { COMPANY_ACTIONS } from './ActionTypes';

export interface TableState {
  isDelete: boolean;
}

const initialState: TableState = {
  isDelete: false
};

const reducer = (state = initialState, action: any): TableState => {
  switch (action.type) {
    case COMPANY_ACTIONS.IS_DELETE:
      return {
        ...state,
        isDelete: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
