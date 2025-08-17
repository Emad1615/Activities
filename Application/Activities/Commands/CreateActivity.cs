using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Application.Interfaces;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDTO ActivityDTO { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper,IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
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
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<string>.Failure("Failed to create activity", 400);
                return Result<string>.Success(activity.Id);
            }
        }
    }
}
