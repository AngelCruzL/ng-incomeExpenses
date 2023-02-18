import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/auth/login'])
      })
  }
}
