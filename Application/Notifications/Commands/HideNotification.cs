using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Notifications.Commands
{
    public class HideNotification
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext context, ILogger<HideNotification> logger) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                logger.LogInformation("An action taken by user now  called HideNotification");
                var selectedNotification = await context.Notifications.FindAsync([request.Id], cancellationToken);
                if (selectedNotification is null) return Result<Unit>.Failure("Notification  not found", 400);
                selectedNotification.IsHidden = true;
                selectedNotification.HiddenDateTime = DateTime.UtcNow;
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("An error occured during save action in database", 400);
            }
        }
    }
}
