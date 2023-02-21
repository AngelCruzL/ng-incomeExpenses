import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeExpenseService} from "../../services/income-expense.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: []
})
export class IncomeExpensesComponent implements OnInit {
  incomeExpensesForm!: FormGroup;
  type: 'income' | 'expense' = 'income';

  constructor(
    private formBuilder: FormBuilder,
    private incomeExpenseService: IncomeExpenseService) {
  }

  ngOnInit(): void {
    this.incomeExpensesForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    })
  }

  save() {
    if (this.incomeExpensesForm.invalid) return;

    const newIncomeExpense = {...this.incomeExpensesForm.value, type: this.type}
    this.incomeExpenseService.createIncomeExpense(newIncomeExpense)
      .then(() => {
        Swal.fire('Agregado exitosamente', newIncomeExpense.description, 'success')
        this.incomeExpensesForm.reset()
      })
      .catch(() => {
        Swal.fire('Error', 'Something went wrong', 'error')
      })
  }
}
