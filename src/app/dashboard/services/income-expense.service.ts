import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";

import {IncomeExpenses} from "../models/income-expenses.model";
import {AuthService} from "@auth/services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {
  currentUserId!: string;

  constructor(private firestore: Firestore, private authService: AuthService) {
  }

  initIncomeExpenseListener(userId: string) {
    return this.getIncomeExpensesByUser(userId)
  }

  createIncomeExpense(incomeExpense: IncomeExpenses) {
    this.currentUserId = this.authService.currentUser.uid;
    const incomeExpenseRef = collection(this.firestore, this.currentUserId);
    return addDoc(incomeExpenseRef, {...incomeExpense})
  }

  getIncomeExpensesByUser(userId: string) {
    const incomeExpenseRef = collection(this.firestore, userId);
    return collectionData(incomeExpenseRef, {idField: 'uid'}) as Observable<IncomeExpenses[]>;
  }
}
