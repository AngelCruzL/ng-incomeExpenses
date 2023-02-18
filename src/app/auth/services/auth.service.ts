import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";

import {CreateUserData, LoginUserData} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser)
    })
  }

  createUser({email, password}: CreateUserData) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  loginUser({email, password}: LoginUserData) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(map(fuser => fuser != null))
  }
}
