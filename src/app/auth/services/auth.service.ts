import {Injectable} from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

import {CreateUserData, LoginUserData} from "../types/user";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {
  }

  initAuthListener() {
    return authState(this.auth)
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
}
