import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Save the JWT token to localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove the JWT token from localStorage
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the token exists
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
