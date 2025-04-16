import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GithubService } from './services/github.service';
import { GithubRepo } from './models/github-repo.model';
import { RepoCard } from './components/repo-card/repo-card';
import { CommonModule } from '@angular/common';
// Katya: Import the standalone RepoCard component here directly,
// since using standalone components instead of NgModules.
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RepoCard, 
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  title = 'github-search-client';
  searchInput: string = ''; 
  repos: GithubRepo[] = []; // Store GitHub repositories here
  bookmarks: GithubRepo[] = [];

  constructor(private githubService: GithubService) {}

ngOnInit(): void {
  // Load bookmarked repositories from sessionStorage when app loads
  // This helps preserve bookmarks even after refreshing the page
  const stored = sessionStorage.getItem('bookmarks');
  // If bookmarks are found in sessionStorage, parse them into objects
  // Otherwise, initialize with an empty array
  this.bookmarks = stored ? JSON.parse(stored) : [];
}

  // Called when user searches
  searchRepos(query: string): void {
    this.githubService.searchRepos(query).subscribe(data => {
      console.log('Repos:', data); // Debug: log result
      this.repos = data; // Store result in local state
    });
  }

  onBookmark(repo: GithubRepo): void {
    // Prevent adding duplicates — check if repo already bookmarked
    const alreadyExists = this.bookmarks.find(r => r.id === repo.id);
    if (!alreadyExists) {
      this.bookmarks.push(repo);    // Add new repo to bookmarks list
      // Save updated list to sessionStorage
      // This makes bookmarks persist across page refreshes during session
      sessionStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      console.log('Bookmarked:', repo);
    }
  }
}