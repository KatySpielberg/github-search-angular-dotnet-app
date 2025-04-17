import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet]
})
export class App {
  constructor(private authService: AuthService, private router: Router) {}

    // Navigate to home page
    gotoHome(): void {
      this.router.navigate(['/']);
    }
  
    // Navigate to bookmarks
    gotoBookmarks(): void {
      this.router.navigate(['/bookmarks']);
    }
    
  /**
   * Logs out the user by clearing the session token,
   * and navigates them back to the login screen.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
