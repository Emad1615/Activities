using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditAcivity
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var acivity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken)
                    ?? throw new Exception("Activity not found");
                mapper.Map(request.Activity, acivity);
                await context.SaveChangesAsync();
            }
        }
    }
}
