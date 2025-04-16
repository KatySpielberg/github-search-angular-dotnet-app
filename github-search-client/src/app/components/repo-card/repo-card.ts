import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GithubRepo } from '../../models/github-repo.model'; 
import { CommonModule } from '@angular/common'; // Katya: Angular doesn't automatically include CommonModule in standalone components. Added manually for *ngFor, *ngIf
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.html',
  styleUrl: './repo-card.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule], //  CommonModule required for *ngFor, *ngIf

   // This component is standalone, meaning it doesn't rely on being declared in any NgModule.
  // It can be imported directly using the `imports` array in other standalone components or routes. 
})
export class RepoCard { 
  @Input() repo!: GithubRepo;      // Receive a single repo object of type GithubRepo from the parent component

   // Emit the current repo when bookmarked
   @Output() bookmark = new EventEmitter<GithubRepo>();

   onBookmarkClick(): void {
     this.bookmark.emit(this.repo);
   }
}
