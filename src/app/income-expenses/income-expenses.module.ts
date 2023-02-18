import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeExpensesRoutingModule } from './income-expenses-routing.module';
import { IncomeExpensesComponent } from './income-expenses.component';
import { DetailComponent } from './detail/detail.component';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [
    IncomeExpensesComponent,
    DetailComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    IncomeExpensesRoutingModule
  ]
})
export class IncomeExpensesModule { }
