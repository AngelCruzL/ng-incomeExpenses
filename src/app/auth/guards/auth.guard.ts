import {Injectable} from '@angular/core';
import {CanActivate, CanMatch, Router} from '@angular/router';
import {Observable, take, tap} from 'rxjs';

import {AuthService} from "../services/auth.service";

/**
 * Guard to check if user is authenticated using the AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  /**
   * Make the dependency injection of the AuthService and Router
   * @param authService
   * @param router
   */
  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Check if user is authenticated, if not redirect to login page
   */
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth/login'])
      }
    }))
  }

  /**
   * Check if user is authenticated, if not redirect to login page
   */
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
