import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import {AppState} from "@app/app.reducer";
import {IncomeExpenseService} from "@app/dashboard/services/income-expense.service";
import * as incomeExpenseActions from '../dashboard/state/income-expense.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  incomeExpenseSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({user}) => user != null))
      .subscribe(user => {
        this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpenseListener(user.user?.uid!)
          .subscribe((incomeExpenses) => {
            const filteredIE = incomeExpenses.filter(incomeExpense => incomeExpense.amount > 0)
            this.store.dispatch(incomeExpenseActions.setItems({items: filteredIE}))
          })
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.incomeExpenseSubscription.unsubscribe();
    this.store.dispatch(incomeExpenseActions.unSetItems())
  }

}
