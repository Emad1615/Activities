using API.DTOS;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace API.Controllers
{
    public class AccountController(SignInManager<UserApplication> signInManager, IEmailSender<UserApplication> emailSender, IConfiguration config) : BaseApiController
    {
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
