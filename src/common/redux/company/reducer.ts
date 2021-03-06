import { COMPANY_ACTIONS } from './ActionTypes';

export interface CompanyState {
  isDelete: boolean;
}

const initialState: CompanyState = {
  isDelete: false
};

const reducer = (state = initialState, action: any): CompanyState => {
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
