import { format } from 'date-fns';
import { COMPANY_ACTIONS } from './ActionTypes';

export interface TableState {
  isDelete: boolean;
  selectCompany: string;
  selectTime: string;
}

const initialState: TableState = {
  isDelete: false,
  selectCompany: '',
  selectTime: format(new Date(), 'MM/yyyy')
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
    case COMPANY_ACTIONS.SELECT_TIME:
      return {
        ...state,
        selectTime: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
