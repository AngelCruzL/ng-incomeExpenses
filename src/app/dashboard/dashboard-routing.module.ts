import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {IncomeExpensesComponent} from "./pages/income-expenses/income-expenses.component";
import {DetailsComponent} from "./pages/details/details.component";
import {StatisticsComponent} from "./pages/statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: IncomeExpensesComponent
      },
      {
        path: 'detalles',
        component: DetailsComponent
      },
      {
        path: 'estadisticas',
        component: StatisticsComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
