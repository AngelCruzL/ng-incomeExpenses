import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

    this.authService.createUser(this.registerForm.value)
      .then(credentials => {
        console.log(credentials)
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.error(error)
      })
  }
}
