using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string TargetId { get; set; }
        }
        public class Hnadler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();
                var target = await context.Users.FindAsync([request.TargetId], cancellationToken);
                if (target is null) return Result<Unit>.Failure("User not found", 400);
                var userFollowing = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);
                if (userFollowing is null)
                {
                    await context.UserFollowings.AddAsync(new UserFollowing { ObserverId = observer.Id, TargetId = target.Id });
                }
                else
                {
                    context.UserFollowings.Remove(userFollowing);
                }
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("An error occured during follow this user ", 400);
            }
        }
    }
}
