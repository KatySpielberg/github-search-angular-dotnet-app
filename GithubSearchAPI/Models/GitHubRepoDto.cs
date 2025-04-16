namespace GithubSearchAPI.Models
{
    public class GitHubRepoDto
    {
        // GitHub repository IDs can exceed Int32.MaxValue (2,147,483,647),
        // so we'll use long (Int64) to avoid overflow issues.
        public long Id { get; set; }
        public string Name { get; set; }
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        public string OwnerLogin { get; set; }
        public string OwnerAvatarUrl { get; set; }
    }
}