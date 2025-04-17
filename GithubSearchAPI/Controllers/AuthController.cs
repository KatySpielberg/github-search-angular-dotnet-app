using GithubSearchAPI.Helpers;
using GithubSearchAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GithubSearchAPI.Controllers
{
    //Katy - JWT tutorial:
    //https://jasonwatmore.com/post/2022/11/15/angular-14-jwt-authentication-example-tutorial

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Accepts dummy credentials and returns JWT if valid
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCredentials credentials)
        {
            // For demo purposes only: hardcoded user check
            if (credentials.Username == "admin" && credentials.Password == "1234")
            {
                var key = _configuration["Jwt:Key"];
                var token = JwtHelper.GenerateJwtToken(credentials.Username, key);
                return Ok(new { token });
            }

            return Unauthorized("Invalid username or password");
        }
    }
}