using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Activities.Commands
{
    public class UpdateActivityAttendees
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                if (user == null) return Result<Unit>.Failure("User not found", 404);
                var activity = await context.Activities
                    .Include(x => x.attendees)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                var attendee = activity?.attendees.FirstOrDefault(x => x.UserId == user.Id);
                if (attendee is not null)
                {
                    if (attendee.IsHost)
                        activity!.IsCancelled = !activity.IsCancelled;
                    else
                        activity!.attendees.Remove(attendee);
                }
                else
                {
                    await context.ActivityAttendees.AddAsync(new ActivityAttendee()
                    {
                        ActivityId = activity!.Id,
                        UserId = user.Id,
                        IsHost = false
                    });
                }
                var result = await context.SaveChangesAsync() > 0;
                if (!result)
                    return Result<Unit>.Failure("Failed to update activity attendees", 400);
                else
                    return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
