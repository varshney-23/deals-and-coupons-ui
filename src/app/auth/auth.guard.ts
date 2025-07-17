// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000;
        if (Date.now() < exp) {
          return true; // Token is valid
        } else {
          this.router.navigate(['/landing']);
          return false;
        }
      } catch (err) {
        this.router.navigate(['/landing']);
        return false;
      }
    } else {
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
