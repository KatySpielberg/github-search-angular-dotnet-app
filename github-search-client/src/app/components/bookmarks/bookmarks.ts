import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepo } from '../../models/github-repo.model';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { BookmarkService } from '../../services/bookmark.service'; 

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss'
})
export class BookmarksComponent implements OnInit {
  bookmarks: GithubRepo[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  /**
   * Load bookmarks using the BookmarkService when the component is initialized
   */
  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}