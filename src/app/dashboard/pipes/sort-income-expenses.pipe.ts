import {Pipe, PipeTransform} from '@angular/core';

import {IncomeExpenses} from "@app/dashboard/models/income-expenses.model";

@Pipe({
  name: 'sortIncomeExpenses'
})
export class SortIncomeExpensesPipe implements PipeTransform {

  transform(items: IncomeExpenses[]): IncomeExpenses[] {
    return [...items].sort((a) => {
      if (a.type === 'income') return -1;
      else return 1;
    })
  }
}
