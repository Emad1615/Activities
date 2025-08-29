using API.DTOS;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController(SignInManager<UserApplication> signInManager) : BaseApiController
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
            if (result.Succeeded) return Ok();

            foreach (var item in result.Errors)
            {
                ModelState.AddModelError(item.Code, item.Description);
            }
            return ValidationProblem();
        }
        [HttpGet("user-info")]
        public async Task<ActionResult> UserInfo()
        {
            if (User.Identity?.IsAuthenticated == false) return Unauthorized();
            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return NoContent();
            return Ok(new UserApplication
            {
                Id=user.Id,
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
    }
}
