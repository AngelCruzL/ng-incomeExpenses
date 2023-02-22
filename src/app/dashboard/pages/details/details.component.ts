import {Component, OnDestroy, OnInit} from '@angular/core';

import {IncomeExpenses} from "@app/dashboard/models/income-expenses.model";
import {Store} from "@ngrx/store";
import {AppStateWithIncomeExpense} from "@app/dashboard/state/income-expense.reducer";
import {Subscription} from "rxjs";
import {IncomeExpenseService} from "@app/dashboard/services/income-expense.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpenseSubscription!: Subscription

  constructor(
    private store: Store<AppStateWithIncomeExpense>,
    private incomeExpenseService: IncomeExpenseService
  ) {
  }

  ngOnInit(): void {
    this.incomeExpenseSubscription = this.store.select('incomeExpense').subscribe(({items}) => this.incomeExpenses = items)
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubscription.unsubscribe()
  }

  delete(itemId: string) {
    this.incomeExpenseService.deleteIncomeExpense(itemId)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }
}
