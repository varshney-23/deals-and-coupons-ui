import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8765/auth'; // API Gateway endpoint

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap(token => localStorage.setItem('authToken', token))
    );
  }

  signup(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }

  getUserEmail(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.sub || ''; // JWT's 'sub' is usually email
  }

  getUserName(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.name || 'User'; // if name is stored
  }

  getUserRole(): string {
    const userInfo = this.getUserInfo();
    return userInfo?.role || 'USER';  // default USER
  }

}
