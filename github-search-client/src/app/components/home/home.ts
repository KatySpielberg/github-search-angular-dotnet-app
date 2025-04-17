// home.ts
// This component handles GitHub search logic, displaying results and managing bookmarks

import { Component, OnInit } from '@angular/core';
import { GithubRepo } from '../../models/github-repo.model';
import { GithubService } from '../../services/github.service';
import { RepoCard } from '../repo-card/repo-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [
    RepoCard,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class HomeComponent implements OnInit {
  searchInput: string = '';
  repos: GithubRepo[] = [];
  bookmarks: GithubRepo[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    // Load any previously saved bookmarks from session storage
    const stored = sessionStorage.getItem('bookmarks');
    this.bookmarks = stored ? JSON.parse(stored) : [];
  }

  searchRepos(query: string): void {
    // Fetch GitHub repositories from the backend API based on query
    this.githubService.searchRepos(query).subscribe(data => {
      console.log('Repos:', data);
      this.repos = data;
    });
  }

  onBookmark(repo: GithubRepo): void {
    // Avoid duplicates in bookmarks
    const alreadyExists = this.bookmarks.find(r => r.id === repo.id);
    if (!alreadyExists) {
      this.bookmarks.push(repo);
      sessionStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      console.log('Bookmarked:', repo);
    }
  }
}
