import { combineReducers } from 'redux';

// Import all reducers here
import companyReducer, { CompanyState } from './company/reducer';
import tableReducer, { TableState } from './table/reducer';

export interface GlobalState {
  company: CompanyState;
  table: TableState;
}

export const combinedReducer = combineReducers({
  company: companyReducer,
  table: tableReducer
});
