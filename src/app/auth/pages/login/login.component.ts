import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

    this.authService.loginUser(this.loginForm.value)
      .then(credentials => {
        this.router.navigate(['/'])
        console.log(credentials)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
