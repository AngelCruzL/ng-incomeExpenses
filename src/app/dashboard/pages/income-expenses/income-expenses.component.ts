import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeExpenseService} from "../../services/income-expense.service";
import {Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import * as ui from "@shared/state/ui.actions";
import {AppState} from "@app/app.reducer";

import Swal from "sweetalert2";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: []
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {
  incomeExpensesForm!: FormGroup;
  type: 'income' | 'expense' = 'income';
  uiSubscription!: Subscription;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.incomeExpensesForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  save() {
    if (this.incomeExpensesForm.invalid) return;

    this.store.dispatch(ui.isLoading());
    const newIncomeExpense = {...this.incomeExpensesForm.value, type: this.type}
    this.incomeExpenseService.createIncomeExpense(newIncomeExpense)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Agregado exitosamente', newIncomeExpense.description, 'success')
        this.incomeExpensesForm.reset()
      })
      .catch(() => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', 'Something went wrong', 'error')
      })
  }
}
