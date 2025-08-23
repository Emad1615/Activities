using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }
    public class IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : AuthorizationHandler<IsHostRequirement>
    {
        protected  override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null) return;
            var httpContext = httpContextAccessor.HttpContext;
            if (httpContext?.GetRouteValue("id") is not string ActivityId) return;
            var attendee = await dbContext.ActivityAttendees.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId && x.ActivityId == ActivityId);
            if (attendee is null) return;
            if (attendee.IsHost) context.Succeed(requirement);
        }
    }
}
