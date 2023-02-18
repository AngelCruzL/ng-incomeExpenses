import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  isValidField(field: string): boolean {
    return this.registerForm.get(field)?.valid || false;
  }

  createAccount() {
    if (this.registerForm.invalid) return;

     Swal.fire({
        title: 'Espere por favor...',
        didOpen: () => {
          Swal.showLoading();
        }
      });

    this.authService.createUser(this.registerForm.value)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])
        console.log(credentials)
      })
      .catch(error => {
        if(error.message.includes('(auth/weak-password)')){
          error.message = 'La contraseña debe tener al menos 6 caracteres.'
        }

        if(error.message.includes('(auth/email-already-in-use)')){
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
