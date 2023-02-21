import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: []
})
export class IncomeExpensesComponent implements OnInit {
  incomeExpensesForm!: FormGroup;
  type: 'income' | 'expense' = 'income';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.incomeExpensesForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    })
  }

  save() {
    if (this.incomeExpensesForm.invalid) return;

    console.log(this.incomeExpensesForm.value);
    this.incomeExpensesForm.reset()
  }
}
