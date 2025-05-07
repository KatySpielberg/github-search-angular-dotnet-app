import { Injectable } from '@angular/core';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly storageKey = 'bookmarkedRepos';

  /**
   * Returns the list of bookmarked GitHub repositories from sessionStorage.
   */
  getBookmarks(): GithubRepo[] {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Saves a GitHub repository to bookmarks if it's not already stored.
   * @param repo GitHub repository to save
   */
  addBookmark(repo: GithubRepo): void {
    const bookmarks = this.getBookmarks();
  
    const exists = bookmarks.some(b => b.id === repo.id);
    if (exists) {    
      console.log('Repository is already bookmarked. Prevent adding duplicate bookmarks');
      return;
    }
  
    bookmarks.push(repo);
    sessionStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  
  /**
   * Removes a GitHub repository from bookmarks by ID.
   * Not required now. For future using.
   * @param id Repository ID to remove
   */
  removeBookmark(id: number): void {
    const updated = this.getBookmarks().filter(repo => repo.id !== id);
    sessionStorage.setItem(this.storageKey, JSON.stringify(updated));
  }
  
  
}
