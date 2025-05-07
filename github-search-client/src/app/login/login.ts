import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = ''; 

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login failed', error);
  
        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Is the backend running?';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    });
  }
  // login() {
  //   const credentials = { username: this.username, password: this.password };
  //   console.log('Login attempt with', this.username, this.password);

  //   this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, credentials)
  //     .subscribe({
  //       next: (response) => {
  //         // Save JWT token in session storage so it persists across reloads
  //         sessionStorage.setItem('token', response.token);
  //         console.log('Login successful');
  //         this.errorMessage = ''; // Clear error if success

  //         // Navigate to home page after successful login
  //         this.router.navigate(['']);
  //       },
  //       error: (error) => {
  //         console.error('Login failed', error);

  //         // Update UI with a friendly message
  //         if (error.status === 401 || error.status === 403) {
  //           this.errorMessage = 'Invalid username or password.';
  //         } else if (error.status === 0) {
  //           this.errorMessage = 'Cannot connect to server. Is the backend running?';
  //         } else {
  //           this.errorMessage = 'An unexpected error occurred.';
  //         }
  //       }
  //     });
  // }
}
