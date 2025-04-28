import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:8000/api/login';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // You can modify the body and endpoint according to your API
    const body = { username, password };
    return this.http.post(this.apiUrl, body);
  }
}
