import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  name: string;
  role: string;
  email: string;
  phone: string;
  // tslint:disable-next-line:variable-name
  profile_image: string;
  user = JSON.parse(localStorage.getItem('userData'));

  constructor(private router: Router) {
    this.role = localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('user-token');
    localStorage.removeItem('userId');
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }
}
