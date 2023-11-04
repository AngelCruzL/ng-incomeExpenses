import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { driver } from 'driver.js';

import { AuthService } from '@auth/services/auth.service';

import { AppState } from '@app/app.reducer';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser: string = '';
  userSubscription!: Subscription;
  driver;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.driver = driver({
      showProgress: true,
      popoverClass: 'driverjs-theme',
      steps: [
        {
          element: '#dashboard-tour',
          popover: {
            title: 'Dashboard',
            description: 'Aquí puedes un panorama general de como va tu dinero',
          },
        },
        {
          element: '#income-expense-tour',
          popover: {
            title: 'Ingresos y Gastos',
            description: 'Aquí puedes ver el listado de tus ingresos y gastos',
          },
        },
        {
          element: '#details-tour',
          popover: {
            title: 'Detalles',
            description:
              'Aquí puedes ver el detalle de tus movimientos registrados',
          },
        },
      ],
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.currentUser = user!.name));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  takeTour() {
    this.driver.drive();
  }
}
