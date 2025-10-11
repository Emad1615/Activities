using Application.Core;
using Application.Interfaces;
using Domain;
using Domain.Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        public class Hnadler(AppDbContext context, IUserAccessor userAccessor, INotificationService notificationService) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Notification notification;
                string _description;
                var observer = await userAccessor.GetUserAsync();
                var target = await context.Users.FindAsync([request.TargetId], cancellationToken);
                if (target is null) return Result<Unit>.Failure("User not found", 400);
                var userFollowing = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);

                if (userFollowing is null)
                {
                    await context.UserFollowings.AddAsync(new UserFollowing { ObserverId = observer.Id, TargetId = target.Id });
                    _description = $"{observer.DisplayName} is now following you 🎉";
                }
                else
                {
                    context.UserFollowings.Remove(userFollowing);
                    _description = $"{observer.DisplayName} just unfollowed you 💔";
                }
                notification = new Notification()
                {
                    Description = _description,
                    NotificationTypeId = (int)Enums.NotificationType.Follow,
                    NotifierId = userAccessor.UserId(),
                    ForAll = false,
                    IsRead = false,
                    IsHidden = false,
                    ReceiverId = target.Id,
                };
                await context.Notifications.AddAsync(notification);
                var result = await context.SaveChangesAsync() > 0;
                // send notification 
                await notificationService.SendNotificationAsync(notification, observer.DisplayName);
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("An error occured during follow this user ", 400);
            }
        }
    }
}
