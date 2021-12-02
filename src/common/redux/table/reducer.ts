import { COMPANY_ACTIONS } from './ActionTypes';

export interface TableState {
  isDelete: boolean;
  selectCompany: string;
}

const initialState: TableState = {
  isDelete: false,
  selectCompany: ''
};

const reducer = (state = initialState, action: any): TableState => {
  switch (action.type) {
    case COMPANY_ACTIONS.IS_DELETE:
      return {
        ...state,
        isDelete: action.payload
      };
    case COMPANY_ACTIONS.SELECT_COMPANY:
      return {
        ...state,
        selectCompany: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
