using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetProfileUserActivities
    {
        public class Query : IRequest<Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public required ActivityParams Params { get; set; }
            public required string UserId { get; set; }
        }
        public class Handler(AppDbContext context, ILogger<GetProfileUserActivities> logger, IMapper mapper) : IRequestHandler<Query, Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public async Task<Result<PagedList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Activities
                    .OrderBy(x => x.Date)
                    .Where(x => x.attendees.Any(x=>x.UserId==request.UserId))
                    .AsQueryable();
                if (!string.IsNullOrEmpty(request.Params.Filter))
                {
                    var today=DateTime.UtcNow;
                    query = request.Params.Filter switch
                    {
                        "future" => query.Where(x => x.Date >= today),
                        "past" => query.Where(x => x.Date <= today),
                        "host" => query.Where(x => x.attendees.Any(a => a.IsHost==true && a.UserId==request.UserId)),
                        _ => query.Where(x => x.attendees.Any(a => a.IsHost==false && a.UserId == request.UserId))
                    };
                }
                var ProjectedActivities = query.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider, new { currentUserId = request.UserId });
                var activities = await ProjectedActivities
                    .Take(request.Params.PageSize + 1)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
                DateTime? nextCursor = null;
                if (activities.Count() > request.Params.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(activities.Count() - 1);
                }

                return Result<PagedList<ActivityDTO, DateTime?>>.Success(new PagedList<ActivityDTO, DateTime?> { Items = activities, NextCursor = nextCursor });
            }
        }
    }
}
