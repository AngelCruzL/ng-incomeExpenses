import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/state/ui.reducer';
import * as auth from './auth/state/auth.reducer';
import * as incomeExpense from './dashboard/state/income-expense.reducer';

export type AppState = {
  ui: ui.State;
  auth: auth.State;
  incomeExpense: incomeExpense.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  incomeExpense: incomeExpense.incomeExpenseReducer
}
