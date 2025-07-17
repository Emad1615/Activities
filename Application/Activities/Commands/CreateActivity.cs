using MediatR;
using Persistence;
using Domain;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<string>
        {
            public required Activity activity { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.activity);
                await context.SaveChangesAsync();
                return request.activity.Id;

            }
        }
    }
}
