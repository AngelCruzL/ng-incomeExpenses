import {UserFirebase} from "@auth/types/user-firebase";

export class User {
  static fromFirebase({email, uid, name}: UserFirebase): User {
    return new User(name, email, uid);
  }

  constructor(
    public name: string,
    public email: string,
    public uid: string
  ) {
  }
}
