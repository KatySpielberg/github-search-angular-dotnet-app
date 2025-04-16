export interface GithubRepo {
    id: number;
    name: string;
    htmlUrl: string;
    description?: string;
    ownerLogin: string;
    ownerAvatarUrl?: string;
  }