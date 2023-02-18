import {Injectable} from '@angular/core';
import {CanActivate, CanMatch, Router} from '@angular/router';
import {Observable, take, tap} from 'rxjs';

import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth/login'])
      }
    }))
  }

  canMatch(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth/login'])
        }
      }),
      take(1)
    )
  }
}
