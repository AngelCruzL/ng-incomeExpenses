import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

type CreateUserData = {
  name: string,
  email: string,
  password: string
}

type LoginUserData = Omit<CreateUserData, "name">

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  createUser({name, email, password}: CreateUserData) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  loginUser({email, password}: LoginUserData) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
}
