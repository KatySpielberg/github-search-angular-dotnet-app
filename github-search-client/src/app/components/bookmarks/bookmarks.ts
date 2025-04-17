import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepo } from '../../models/github-repo.model';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss'
})
export class BookmarksComponent implements OnInit {
  bookmarks: GithubRepo[] = [];

  // Load bookmarks from sessionStorage when the component is initialized
  ngOnInit(): void {
    const stored = sessionStorage.getItem('bookmarkedRepos');
    this.bookmarks = stored ? JSON.parse(stored) : [];
  }
}