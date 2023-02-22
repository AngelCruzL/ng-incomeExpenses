import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "@app/app.reducer";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: string = '';
  userSubscription!: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({user}) => user != null))
      .subscribe(({user}) => this.currentUser = user!.name)
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
