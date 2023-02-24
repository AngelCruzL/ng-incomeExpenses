import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/app.reducer';
import * as incomeExpenseActions from '@app/dashboard/state/income-expense.actions';
import * as authActions from '@auth/state/auth.actions';
import { Store } from '@ngrx/store';

import { UserFirebase } from '@auth/types/user-firebase';
import { User } from '../models/user.model';
import { CreateUserData, LoginUserData } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!: Subscription;
  #currentUser!: User;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    return authState(this.auth).subscribe(async (fuser: any) => {
      if (!fuser) return this.cleanUserStateAndSubscription();

      this.userSubscription = this.getUserById(fuser.uid).subscribe(user => {
        if (user.length > 0) {
          const newUser = { ...user[0], uid: fuser.uid };
          this.store.dispatch(authActions.setUser({ user: newUser }));
          this.#currentUser = newUser;
        } else {
          this.cleanUserStateAndSubscription();
        }
      });
    });
  }

  createUser({ name, email, password }: CreateUserData) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser = new User(name, user.email!, user.uid!);
        const userRef = collection(this.firestore, user.uid);
        addDoc(userRef, { ...newUser }).then(console.log);
      })
      .catch(error => {
        console.warn(error);
        throw error;
      });
  }

  loginUser({ email, password }: LoginUserData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(map(fuser => fuser != null));
  }

  getUserById(id: string): Observable<UserFirebase[]> {
    const userRef = collection(this.firestore, id);
    return collectionData(userRef, { idField: 'uid' }) as Observable<
      UserFirebase[]
    >;
  }

  cleanUserStateAndSubscription() {
    this.store.dispatch(authActions.unSetUser());
    this.store.dispatch(incomeExpenseActions.unSetItems());
    this.userSubscription?.unsubscribe();
  }

  get currentUser() {
    return { ...this.#currentUser };
  }
}
