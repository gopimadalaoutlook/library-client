import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}
  
  onSubmit() {
  if (this.username && this.password) {
    const loginData = { username: this.username, password: this.password };

    this.apiService.post('auth/login', loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.access_token);
        this.router.navigate(['/library']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password. Please try again.';
      },
      complete: () => {
        console.log('Login request completed.');
      }
    });
  } else {
    this.errorMessage = 'Please fill in both fields.';
  }
}
}
