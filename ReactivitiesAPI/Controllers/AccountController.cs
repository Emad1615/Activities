using API.DTOS;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net.Http.Headers;
using System.Text;
using static API.DTOS.GithubInfo;
using static API.DTOS.GoogleInfo;

namespace API.Controllers
{
    public class AccountController(SignInManager<UserApplication> signInManager, IEmailSender<UserApplication> emailSender, IConfiguration config, AppDbContext dbContext) : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost("github-login")]
        public async Task<ActionResult> LoginWithGithub(string code)
        {
            if (string.IsNullOrEmpty(code))
                return BadRequest("Unable to complete GitHub login: no authorization code was provided.");
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // step 1 exchange code for token access
            var tokenResponse = await httpClient.PostAsJsonAsync("https://github.com/login/oauth/access_token",
                new GithubAuthRequest
                {
                    Code = code,
                    ClientID = config["authentications:github:client_id"]!,
                    ClientSecret = config["authentications:github:client_secret"]!,
                    RedirectURI = $"{config["frontend_urls"]}/auth-callback"
                });

            if (!tokenResponse.IsSuccessStatusCode)
                return BadRequest("GitHub authentication failed: unable to obtain access token.");

            var tokenContent = await tokenResponse.Content.ReadFromJsonAsync<GitHubTokenRespons>();

            if (string.IsNullOrEmpty(tokenContent?.AccessToken))
                return BadRequest("Unable to complete GitHub login: missing access token.");

            // fetch user info from github
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenContent.AccessToken);
            httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Reactivities");

            var userResponse = await httpClient.GetAsync("https://api.github.com/user");
            if (!userResponse.IsSuccessStatusCode)
                return BadRequest("Failed to fetch GitHub user profile.");
            var user = await userResponse.Content.ReadFromJsonAsync<GithubUser>();
            if (user is null)
                return BadRequest("Failed to get user data.");

            // step 3 getting email 
            if (string.IsNullOrEmpty(user.Email))
            {
                var emailResponse = await httpClient.GetAsync("https://api.github.com/user/emails");
                if (!emailResponse.IsSuccessStatusCode)
                    return BadRequest("GitHub email request was unsuccessful.");
                var emailsContent = await emailResponse.Content.ReadFromJsonAsync<List<Emails>>();
                if (emailsContent is null)
                    return BadRequest("GitHub emails readed unsuccessful.");
                var email = emailsContent.FirstOrDefault(x => x.Primary && x.Verified)?.Email;
                if (email is null)
                    return BadRequest("Unable to complete GitHub login: missing verified primary email.");
                user.Email = email!;
            }
            // step 4 find or create user sign in
            var existingUser = await signInManager.UserManager.FindByEmailAsync(user.Email);
            if (existingUser is null)
            {
                existingUser = new UserApplication
                {
                    Email = user.Email,
                    DisplayName = user.Name,
                    UserName = user.Email,
                    ImageUrl = user.ImageUrl,
                };

                var createdUser = await signInManager.UserManager.CreateAsync(existingUser);
                if (!createdUser.Succeeded)
                    return BadRequest($"{user.Name} is not created (unsuccessful).");
            }

            await signInManager.SignInAsync(existingUser, false);
            existingUser.ImageUrl = user.ImageUrl;
            await dbContext.SaveChangesAsync();
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost("google-login")]
        public async Task<ActionResult> LoginWithGoogle(string code)
        {
            if (string.IsNullOrEmpty(code))
                return BadRequest("No code provided");
            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            // step 1 exchange code for token access
            var tokenResponse = await httpClient.PostAsJsonAsync("https://oauth2.googleapis.com/token", new GoogleAuthRequest
            {
                Code = code,
                ClientID = config["authentications:google:client_id"]!,
                ClientSecret = config["authentications:google:client_secret"]!,
                RedirectURI = $"{config["frontend_urls"]}/google-auth-callback",
                GrantType = "authorization_code"
            });
            if (!tokenResponse.IsSuccessStatusCode)
                return BadRequest("Google authentication failed: unable to obtain access token.");
            var tokenContent = await tokenResponse.Content.ReadFromJsonAsync<GoogleTokenResponse>();
            if (string.IsNullOrEmpty(tokenContent?.AccessToken))
                return BadRequest("Unable to complete Google login: missing access token.");

            // step 2 fetch user info from google
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenContent.AccessToken);
            httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Reactivities");
            var userResponse = await httpClient.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");
            if (!userResponse.IsSuccessStatusCode)
                return BadRequest("Failed to fetch Google user profile.");
            var user = await userResponse.Content.ReadFromJsonAsync<GoogleUser>();
            if (user is null)
                return BadRequest("Failed to get user data.");
            // step 3 find or create user sign in
            var existingUser = await signInManager.UserManager.FindByEmailAsync(user.Email);
            if (existingUser is null)
            {
                existingUser = new UserApplication
                {
                    Email = user.Email,
                    DisplayName = user.Name,
                    UserName = user.Email,
                    ImageUrl = user.ImageUrl,
                };
                var createdUser = await signInManager.UserManager.CreateAsync(existingUser);
                if (!createdUser.Succeeded)
                    return BadRequest($"{user.Name} is not created (unsuccessful).");
            }
            await signInManager.SignInAsync(existingUser, false);
            existingUser.ImageUrl = user.ImageUrl;
            await dbContext.SaveChangesAsync();
            return Ok();
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new UserApplication()
            {
                DisplayName = registerDTO.DisplayName,
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
            };
            var result = await signInManager.UserManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                await SendConfirmationEmailAsync(user, registerDTO.Email);
                return Ok();
            }

            foreach (var item in result.Errors)
            {
                ModelState.AddModelError(item.Code, item.Description);
            }
            return ValidationProblem();
        }
        [AllowAnonymous]
        [HttpGet("ResendConfirmationEmail")]
        public async Task<ActionResult> ResendConfirmationEmail(string? email, string? userId)
        {
            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(userId))
                return BadRequest("No email or userId not found");
            var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(x => x.Id == userId || x.Email == email);
            if (user is null || user.Email is null) return BadRequest("User not found");
            await SendConfirmationEmailAsync(user, user.Email);
            return Ok();
        }
        private async Task SendConfirmationEmailAsync(UserApplication user, string email)
        {
            var code = await signInManager.UserManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var confirmationLink = $"{config["frontend_urls"]}/confirm-email?userId={user.Id}&code={code}";
            await emailSender.SendConfirmationLinkAsync(user, email, confirmationLink);
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> UserInfo()
        {
            if (User.Identity?.IsAuthenticated == false) return Unauthorized();
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return NoContent();
            return Ok(new UserApplication
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                ImageUrl = user.ImageUrl,
                Bio = user.Bio,
                BirthDate = user.BirthDate,
                PhoneNumber = user.PhoneNumber,
            });
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }
        [AllowAnonymous]
        [HttpGet("is-authenticated")]
        public ActionResult<bool> isAuthenticated()
        {
            return Ok(User.Identity?.IsAuthenticated);
        }
        [HttpPost("change-password")]
        public async Task<ActionResult> ChangePassord(ChangePasswordDTO changePasswordDTO)
        {
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user is null) return Unauthorized();
            var result = await signInManager.UserManager.ChangePasswordAsync(user, changePasswordDTO.CurrentPassword, changePasswordDTO.NewPassword);
            if (result.Succeeded) return Ok();
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }

    }
}
