import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from "../shared/shared.module";
import { IncomeExpensesComponent } from './pages/income-expenses/income-expenses.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DetailsComponent } from './pages/details/details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
