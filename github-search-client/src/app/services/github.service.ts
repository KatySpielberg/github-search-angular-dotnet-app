import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  searchRepositories(query: string): Observable<any> {
    const url = `${environment.apiUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get<any>(url);
  }
}