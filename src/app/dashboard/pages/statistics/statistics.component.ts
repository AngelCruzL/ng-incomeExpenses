import {Component, OnInit} from '@angular/core';

import {Store} from "@ngrx/store";
import {AppStateWithIncomeExpense} from "@app/dashboard/state/income-expense.reducer";
import {IncomeExpenses} from "@app/dashboard/models/income-expenses.model";

import {ChartData} from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {
  incomes: number = 0;
  expenses: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: []}
    ]
  };

  constructor(private store: Store<AppStateWithIncomeExpense>) {
  }

  ngOnInit(): void {
    this.store.select('incomeExpense').subscribe(({items}) => this.generateStatistics(items));
  }

  generateStatistics(items: IncomeExpenses[]) {
    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes += item.amount;
        this.incomes++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    }

    this.doughnutChartData.datasets = [{data: [this.totalIncomes, this.totalExpenses]}];
  }
}
