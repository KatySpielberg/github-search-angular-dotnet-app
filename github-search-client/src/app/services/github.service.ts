// src/app/services/github.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  
  private apiUrl = `${environment.apiUrl}/github`; // base API URL (https://localhost:7106/api)

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET request to the backend API to search GitHub repositories.
   */
  searchRepos(query: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }

  /**
   * Sends a POST request to store a repository in the user's session.
   */
  addBookmark(repo: GithubRepo): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookmarks`, repo);
  }

  /**
   * Sends a GET request to retrieve all bookmarked repositories from session.
   */
  getBookmarks(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.apiUrl}/bookmarks`);
  }
}
