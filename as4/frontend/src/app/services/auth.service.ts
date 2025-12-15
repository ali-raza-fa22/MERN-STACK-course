import { Injectable, signal, inject } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'creator' | 'admin';
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<AuthResponse['user'] | null>(null);

  constructor() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (!isExpired) {
          this.isAuthenticated.set(true);
          // The user object from the token might be nested under a 'user' property
          this.currentUser.set(decodedToken.user || decodedToken);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // TODO: Replace with actual API endpoint
    return this.http
      .post<AuthResponse>('http://localhost:3001/auth/login', credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            this.isAuthenticated.set(true);
            this.currentUser.set(response.user || null);
          }
        })
      );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    // TODO: Replace with actual API endpoint
    return this.http
      .post<AuthResponse>('http://localhost:3001/auth/register', data)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            this.isAuthenticated.set(true);
            this.currentUser.set(response.user || null);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
