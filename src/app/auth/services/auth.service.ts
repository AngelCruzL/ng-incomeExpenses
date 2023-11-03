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

/**
 * Service to manage the authentication of the user
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!: Subscription;
  #currentUser!: User;

  /**
   * Make the dependency injection of the Auth, Firestore and Store
   * @param auth
   * @param firestore
   * @param store
   */
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>,
  ) {}

  /**
   * Get the current user
   */
  get currentUser(): User {
    return { ...this.#currentUser };
  }

  /**
   * Initialize the listener of the authentication state
   */
  initAuthListener(): Subscription {
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

  /**
   * Create a new user in firebase
   */
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

  /**
   * Login the user
   */
  loginUser({ email, password }: LoginUserData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logout the user
   */
  logout() {
    return this.auth.signOut();
  }

  /**
   * Check if user is authenticated
   */
  isAuth(): Observable<boolean> {
    return authState(this.auth).pipe(map(fuser => fuser != null));
  }

  /**
   * Get firebase user by id
   */
  getUserById(id: string): Observable<UserFirebase[]> {
    const userRef = collection(this.firestore, id);
    return collectionData(userRef, { idField: 'uid' }) as Observable<
      UserFirebase[]
    >;
  }

  /**
   * Clean the user state and unsubscribe the user subscription
   */
  cleanUserStateAndSubscription(): void {
    this.store.dispatch(authActions.unSetUser());
    this.store.dispatch(incomeExpenseActions.unSetItems());
    this.userSubscription?.unsubscribe();
  }
}
