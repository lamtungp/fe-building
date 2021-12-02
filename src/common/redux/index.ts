import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

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
