import {Component, OnDestroy, OnInit} from '@angular/core';

import {IncomeExpenses} from "@app/dashboard/models/income-expenses.model";
import {Store} from "@ngrx/store";
import {AppStateWithIncomeExpense} from "@app/dashboard/state/income-expense.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpenseSubscription!: Subscription

  constructor(private store: Store<AppStateWithIncomeExpense>) {
  }

  ngOnInit(): void {
    this.incomeExpenseSubscription = this.store.select('incomeExpense').subscribe(({items}) => this.incomeExpenses = items)
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubscription.unsubscribe()
  }

  delete(itemId: string) {
    console.log(itemId);
  }
}
