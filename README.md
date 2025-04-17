# GitHub Repository Search App

A full-stack application built with **Angular 18+** and **.NET Core 9**, allowing users to search GitHub repositories and bookmark their favorites.

---

## Technologies Used

- **Frontend**: Angular 18+, Angular Material, SCSS
- **Backend**: ASP.NET Core 9 Web API
- **Auth**: JWT-based authentication (admin / 1234)
- **Storage**: sessionStorage for bookmarks

---

## Features

-  Search repositories from GitHub by keyword
-  Bookmark repositories (stored per session)
-  Login-protected bookmarks screen
-  Responsive design with Angular Material
-  Clean and well-commented codebase

---

## Project Structure


---

## Setup Instructions

### Backend (.NET Core 9)

1. Open `GithubSearchAPI` in **Visual Studio 2022+**
2. Run the project (`Ctrl+F5`) or via terminal:

cd GithubSearchAPI
dotnet restore
dotnet run

API runs at: https://localhost:7106/api
---
### Frontend (Angular)

cd github-search-client
npm install
ng serve

App runs at: http://localhost:4200

---

 ## Login Info (for test)
Username: admin
Password: 1234

Use this to log in and access the protected bookmarks screen.

 ##  Notes
Bookmarks are saved only for the session

Routes protected using AuthGuard

Built-in responsive styling with Angular Material
