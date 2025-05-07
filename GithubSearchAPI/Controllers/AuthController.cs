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
        private static Dictionary<string, string> RefreshTokens = new(); // username -> refreshToken

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Accepts dummy credentials and returns JWT if valid
        [HttpPost("login_old")]
        public IActionResult Login_old([FromBody] UserCredentials credentials)
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

        // Accepts dummy credentials and returns JWT if valid + RefreshToken
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCredentials credentials)
        {
            if (credentials.Username == "admin" && credentials.Password == "1234")
            {
                var key = _configuration["Jwt:Key"];
                var accessToken = JwtHelper.GenerateJwtToken(credentials.Username, key);
                var refreshToken = Guid.NewGuid().ToString();

                RefreshTokens[credentials.Username] = refreshToken;

                return Ok(new AuthResponse
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }

            return Unauthorized("Invalid credentials");
        }


        [HttpPost("refresh")]
        public IActionResult Refresh([FromBody] AuthResponse request)
        {
            var username = JwtHelper.ValidateToken(request.AccessToken, _configuration["Jwt:Key"]);

            if (username != null &&
                RefreshTokens.TryGetValue(username, out var storedToken) &&
                storedToken == request.RefreshToken)
            {
                var newAccessToken = JwtHelper.GenerateJwtToken(username, _configuration["Jwt:Key"]);
                return Ok(new { AccessToken = newAccessToken });
            }

            return Unauthorized("Invalid refresh token");
        }
    }

    public class AuthResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}