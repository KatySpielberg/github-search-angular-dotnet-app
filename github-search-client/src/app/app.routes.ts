// Angular routes for navigating between main app pages

import { Routes } from '@angular/router';
import { App } from './app';
import { HomeComponent } from './components/home/home';
import { BookmarksComponent } from './components/bookmarks/bookmarks';
import { LoginComponent } from './login/login';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent // This renders the search page
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard] // Only accessible when logged in
  }
];