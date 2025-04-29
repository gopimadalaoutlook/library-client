import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<string | null>(null);
  public loggedInUser$ = this.loggedInUserSubject.asObservable(); 

  constructor() {}

  // Save the JWT token to localStorage
  setToken(token: string, userName: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', userName);
    this.loggedInUserSubject.next(userName)
  }

  // Get the JWT token from localStorage
  getToken(): { authToken: string | null; user: string | null } {
    return {
      authToken: localStorage.getItem('authToken'),
      user: localStorage.getItem('user'),
    };
  }

  // Remove the JWT token from localStorage
  removeToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(null);
  }

  // Check if the token exists
  isAuthenticated(): boolean {
    const tokenData = this.getToken();
    return tokenData.authToken !== null; 
  }
}
