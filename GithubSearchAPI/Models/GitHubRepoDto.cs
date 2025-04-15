namespace GithubSearchAPI.Models
{
    public class GitHubRepoDto
    {
        public string Name { get; set; }
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        public string OwnerLogin { get; set; }
        public string OwnerAvatarUrl { get; set; }
    }
}