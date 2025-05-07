import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepo } from '../../models/github-repo.model';
import { RepoCard } from '../repo-card/repo-card';
import { BookmarkService } from '../../services/bookmark.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RepoCard, MatCardModule, MatIconModule],
  templateUrl: './bookmarks.html',
  styleUrls: ['./bookmarks.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: GithubRepo[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    // Load bookmarks from the BookmarkService
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  /**
   * Removes the selected repository from bookmarks
   * @param repo - repository to remove
   */
  deleteBookmark(repo: GithubRepo): void {
    console.log("deleteBookmark called");
    this.bookmarkService.removeBookmark(repo.id);
    this.bookmarks = this.bookmarkService.getBookmarks(); // refresh view
  }
}
