import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.html',
  styleUrl: './repo-card.scss'
})
export class RepoCard implements OnInit {
  repos: any[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.searchRepositories('angular')
      .subscribe({
        next: (data) => {
          this.repos = data;
          console.log('Repos:', data);
        },
        error: (err) => console.error('API Error', err)
      });
  }
}