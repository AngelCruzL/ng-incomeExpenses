import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AppState } from "@app/app.reducer";
import { Store } from "@ngrx/store";
import * as ui from "@shared/state/ui.actions";

import { Subscription } from "rxjs";

import { getTranslatedError } from '@nafuzi/firebase-auth-error-translator';
import Swal from 'sweetalert2';

import { AuthService } from "@auth/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading!: boolean;
  uiSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  isValidField(field: string): boolean {
    return this.loginForm.get(field)?.valid || false;
  }

  login() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    this.authService.loginUser(this.loginForm.value)
      .then(credentials => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          title: '¡Error!',
          text: getTranslatedError('es', error.code),
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }
}
