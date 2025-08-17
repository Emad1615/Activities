using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext db) : IUserAccessor
    {
        public async Task<UserApplication> GetUserAsync()
        {
            return await db.Users.FindAsync(UserId()) ?? throw new UnauthorizedAccessException("No user is logged in");
        }

        public string UserId()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No user found");
        }
    }
}
