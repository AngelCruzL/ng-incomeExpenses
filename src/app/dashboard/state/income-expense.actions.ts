import {createAction, props} from '@ngrx/store';

import {IncomeExpenses} from "../models/income-expenses.model";

export const unSetItems = createAction('[IncomeExpense] unSetItems');
export const setItems = createAction(
  '[IncomeExpense] setItems',
  props<{ items: IncomeExpenses[] }>()
);
