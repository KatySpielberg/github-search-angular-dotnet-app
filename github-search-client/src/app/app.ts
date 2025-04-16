import { Component } from '@angular/core';
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

export class App {
  title = 'github-search-client';
  searchInput: string = ''; 
  repos: GithubRepo[] = []; // Store GitHub repositories here

  constructor(private githubService: GithubService) {}

  // Called when user searches
  searchRepos(query: string): void {
    this.githubService.searchRepos(query).subscribe(data => {
      console.log('Repos:', data); // Debug: log result
      this.repos = data; // Store result in local state
    });
  }
}