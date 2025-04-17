import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { GithubRepo } from '../../models/github-repo.model';
import { BookmarkService } from '../../services/bookmark.service'; 
import { RepoCard } from '../repo-card/repo-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RepoCard,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  searchInput: string = '';
  repos: GithubRepo[] = [];

  constructor(
    private githubService: GithubService,
    private bookmarkService: BookmarkService 
  ) {}

  /**
   * Fetch GitHub repositories from the backend API using a search query.
   * Updates the `repos` array with the results.
   */
  searchRepos(query: string): void {
    this.githubService.searchRepos(query).subscribe(data => {
      console.log('Repos:', data);
      this.repos = data;
    });
  }

  /**
   * Handle bookmark click from RepoCard. Adds the repo using the service.
   */
  onBookmark(repo: GithubRepo): void {
    this.bookmarkService.addBookmark(repo); 
    console.log('Bookmarked via service:', repo);
    alert(`Bookmarked "${repo.name}"!`);
  }
}
