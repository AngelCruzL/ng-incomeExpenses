import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";

import {IncomeExpenses} from "../models/income-expenses.model";
import {AuthService} from "@auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {
  currentUserId!: string;

  constructor(private firestore: Firestore, private authService: AuthService) {
  }

  createIncomeExpense(incomeExpense: IncomeExpenses) {
    this.currentUserId = this.authService.currentUser.uid;
    const incomeExpenseRef = collection(this.firestore, this.currentUserId);
    return addDoc(incomeExpenseRef, {...incomeExpense})
  }
}
