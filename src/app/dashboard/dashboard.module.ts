import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from "@shared/shared.module";
import {IncomeExpensesComponent} from './pages/income-expenses/income-expenses.component';
import {StatisticsComponent} from './pages/statistics/statistics.component';
import {DetailsComponent} from './pages/details/details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {NgChartsModule} from 'ng2-charts';

import {incomeExpenseReducer} from "@app/dashboard/state/income-expense.reducer";
import {IncomeExpensePipe} from './pipes/income-expense.pipe';
import {SortIncomeExpensesPipe} from './pipes/sort-income-expenses.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailsComponent,
    IncomeExpensePipe,
    SortIncomeExpensesPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
    NgChartsModule
  ]
})
export class DashboardModule {
}
