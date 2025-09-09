using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Domain.Common;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDTO ActivityDTO { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor, INotificationService notificationService) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                var activity = mapper.Map<Activity>(request.ActivityDTO);
                context.Activities.Add(activity);
                ActivityAttendee attendee = new ActivityAttendee()
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = true
                };
                activity.attendees.Add(attendee);
                var notification = new Notification()
                {
                    NotificationTypeId = (int)Enums.NotificationType.AddActivity,
                    Description = $"New activity created by {user.DisplayName} at {activity.Date.ToString("yyyy/MM/dd hh:mm tt")} about {activity.Category}",
                    IsRead = false,
                    IsHidden = false,
                    NotifierId = userAccessor.UserId(),
                    ActivityId = activity.Id,
                    ForAll = true,
                };
                context.Notifications.Add(notification);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<string>.Failure("Failed to create activity", 400);
                // send notification 
                await notificationService.SendNotificationAsync(notification, user.DisplayName);
                return Result<string>.Success(activity.Id);
            }
        }
    }
}
