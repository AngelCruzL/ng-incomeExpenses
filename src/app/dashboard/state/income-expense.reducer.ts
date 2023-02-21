import {createReducer, on} from '@ngrx/store';
import {setItems, unSetItems} from './income-expense.actions';

import {IncomeExpenses} from "../models/income-expenses.model";
import {AppState} from "@app/app.reducer";

export interface State {
  items: IncomeExpenses[];
}

export interface AppStateWithIncomeExpense extends AppState {
  incomeExpense: State;
}

export const initialState: State = {
  items: [],
}

const _incomeExpenseReducer = createReducer(initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unSetItems, state => ({...state, items: []}))
);

export function incomeExpenseReducer(state: any, action: any) {
  return _incomeExpenseReducer(state, action);
}
