import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = `${environment.apiUrl}/github`;
  constructor(private http: HttpClient) {}
  
  
  /**
 * Sends a GET request to the backend API to search for GitHub repositories
 * matching the given query string. The response is typed as an array of GithubRepo.
 * @param query - The search term entered by the user
 * @returns Observable<GithubRepo[]> - a stream of repository data from the API
 */
  searchRepos(query: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
    //Katy: encodeURIComponent is safer - handles special characters
  }

  // Katya's comment - why to use GET in this case:
  // Using GET here is appropriate since we're simply retrieving public non-sensitive data (search results) 
  // based on a text query. It's fast, cacheable, and semantically correct.
  // If the search evolves to support complex filters or sensitive input, switching to POST may be preferable.
}