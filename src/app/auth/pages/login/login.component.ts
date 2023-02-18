import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {getTranslatedError} from '@nafuzi/firebase-auth-error-translator'

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  isValidField(field: string): boolean {
    return this.loginForm.get(field)?.valid || false;
  }

  login() {
    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.loginUser(this.loginForm.value)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])
        console.log(credentials)
      })
      .catch(error => {
        Swal.fire({
          title: '¡Error!',
          text: getTranslatedError('es', error.code),
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }
}
