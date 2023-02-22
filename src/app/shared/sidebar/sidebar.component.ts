import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "@auth/services/auth.service";

import {AppState} from "@app/app.reducer";
import {Store} from "@ngrx/store";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser: string = '';
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({user}) => user != null))
      .subscribe(({user}) => this.currentUser = user!.name)
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/auth/login'])
      })
  }
}
