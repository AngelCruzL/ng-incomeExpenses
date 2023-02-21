import {Injectable} from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

import {Store} from "@ngrx/store";
import {AppState} from "@app/app.reducer";
import * as authActions from "@auth/state/auth.actions";

import {CreateUserData, LoginUserData} from "../types/user";
import {User} from "../models/user.model";
import {UserFirebase} from "@auth/types/user-firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription!: Subscription;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>) {
  }

  initAuthListener() {
    return authState(this.auth).subscribe(async (fuser: any) => {
      if (!fuser) return this.cleanUserStateAndSubscription();

      this.userSubscription = this.getUserById(fuser.uid).subscribe(user => {
        if (user.length > 0) {
          this.store.dispatch(authActions.setUser({user: User.fromFirebase(user[0])}))
        } else {
          this.cleanUserStateAndSubscription()
        }
      })
    })
  }

  createUser({name, email, password}: CreateUserData) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        console.log(user);
        const newUser = new User(name, user.email!, user.uid!);
        const userRef = collection(this.firestore, `user`);
        addDoc(userRef, {...newUser}).then(console.log)
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  }

  loginUser({email, password}: LoginUserData) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return authState(this.auth).pipe(map(fuser => fuser != null))
  }

  getUserById(id: string): Observable<UserFirebase[]> {
    const userRef = collection(this.firestore, id);
    return collectionData(userRef, {idField: 'uid'}) as Observable<UserFirebase[]>;
  }

  cleanUserStateAndSubscription() {
    this.store.dispatch(authActions.unSetUser());
    this.userSubscription?.unsubscribe();
  }
}
