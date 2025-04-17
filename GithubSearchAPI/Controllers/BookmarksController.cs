using GithubSearchAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GithubSearchAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookmarksController : ControllerBase
    {
        private const string SessionKey = "BookmarkedRepos";

        /// <summary>
        /// Returns the list of bookmarked GitHub repositories from session.
        /// </summary>
        [HttpGet]
        public IActionResult GetBookmarks()
        {
            var bookmarksJson = HttpContext.Session.GetString(SessionKey);
            if (string.IsNullOrEmpty(bookmarksJson))
                return Ok(new List<GitHubRepoDto>());

            var bookmarks = System.Text.Json.JsonSerializer.Deserialize<List<GitHubRepoDto>>(bookmarksJson);
            return Ok(bookmarks);
        }

        /// <summary>
        /// Saves the list of GitHub repositories to session.
        /// </summary>
        [HttpPost]
        public IActionResult SaveBookmarks([FromBody] List<GitHubRepoDto> repos)
        {
            var bookmarksJson = System.Text.Json.JsonSerializer.Serialize(repos);
            HttpContext.Session.SetString(SessionKey, bookmarksJson);
            return Ok();
        }
    }
}
