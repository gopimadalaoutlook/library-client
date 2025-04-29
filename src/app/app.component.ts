import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedInUser: string | null = null;
  private userSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  title = 'library-client';
  ngOnInit() {    
    this.userSubscription = this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
