import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; 
  constructor(private http: HttpClient) {}

  login_old(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }
  
  refreshToken(): Observable<string> {
    console.log("refreshToken RUN");
    const token = this.getToken();
    const refreshToken = sessionStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/refresh`,
      { accessToken: token, refreshToken: refreshToken }
    ).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.accessToken);
      }),
      map(res => res.accessToken)
    );
  }


  logout() {
    console.log("logout called");

    sessionStorage.removeItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    console.log("isLoggedIn called");
    
    return !!this.getToken();
  }
}
