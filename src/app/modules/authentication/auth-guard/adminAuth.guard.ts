import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateAdminGuard implements CanActivate {
  status: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  handleGuard() {
    if (this.authService.getUserRole() === 'super_admin') {
      return true;
    } else {
      this.router.navigateByUrl('/authentication');
      localStorage.removeItem('user-role');
      localStorage.removeItem('userId');
      localStorage.removeItem('user-token');
      localStorage.removeItem('Admin-userName');
      localStorage.clear();
      return false;
    }
  }

  canActivate() {
    return this.handleGuard();
  }
}

