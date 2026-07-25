import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((res: any) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          if (res.name) localStorage.setItem('user_name', res.name);
          this.loggedIn.next(true);
        }
      })
    );
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((res: any) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          if (res.name) localStorage.setItem('user_name', res.name);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}