import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {Store} from "@ngrx/store";
import * as ui from "@shared/state/ui.actions";
import {AppState} from "@app/app.reducer";

import {Subscription} from "rxjs";

import Swal from 'sweetalert2'

import {AuthService} from "@auth/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoading!: boolean;
  uiSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  isValidField(field: string): boolean {
    return this.registerForm.get(field)?.valid || false;
  }

  createAccount() {
    if (this.registerForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    this.authService.createUser(this.registerForm.value)
      .then(credentials => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/'])
        console.log(credentials)
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());

        if (error.message.includes('(auth/weak-password)')) {
          error.message = 'La contraseña debe tener al menos 6 caracteres.'
        }

        if (error.message.includes('(auth/email-already-in-use)')) {
          error.message = 'El correo electrónico ya existe.'
        }

        Swal.fire({
          title: '¡Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }
}
