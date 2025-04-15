using GithubSearchAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace GithubSearchAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GitHubController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public GitHubController()
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("DotNetClient", "1.0"));
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchRepos(string query)
        {
            var url = $"https://api.github.com/search/repositories?q={query}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "GitHub API error");

            using var contentStream = await response.Content.ReadAsStreamAsync();
            var jsonDoc = await JsonDocument.ParseAsync(contentStream);

            var repos = jsonDoc.RootElement
                .GetProperty("items")
                .EnumerateArray()
                .Select(item => new GitHubRepoDto
                {
                    Name = item.GetProperty("name").GetString(),
                    HtmlUrl = item.GetProperty("html_url").GetString(),
                    Description = item.GetProperty("description").GetString(),
                    OwnerLogin = item.GetProperty("owner").GetProperty("login").GetString(),
                    OwnerAvatarUrl = item.GetProperty("owner").GetProperty("avatar_url").GetString()
                })
                .ToList();

            return Ok(repos);
        }
    }
}