import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'incomeExpense'
})
export class IncomeExpensePipe implements PipeTransform {
  transform(incomeExpenseType: string): string {
    if (incomeExpenseType === 'income') return 'Ingreso';
    if (incomeExpenseType === 'expense') return 'Egreso';

    return incomeExpenseType;
  }
}
