import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

type CreateUserData = {
  name: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  createUser({name, email, password}: CreateUserData) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
}
