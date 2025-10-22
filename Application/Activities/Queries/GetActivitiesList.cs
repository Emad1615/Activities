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
    public class GetActivitiesList
    {
        private const int MaximumPageSize = 50;
        public class Query : IRequest<Result<PagedList<ActivityDTO, DateTime?>>>
        {

            public required ActivityParams Params { get; set; }

        }
        public class Handler(AppDbContext context, ILogger<GetActivitiesList> logger, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public async Task<Result<PagedList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                #region CancellationToken Purpose
                // this section of code for cancellation op process when end user cancel the request  aim of CancellationToken
                //try
                //{
                //    for (int i = 0; i < 10; i++)
                //    {
                //        cancellationToken.ThrowIfCancellationRequested();
                //        await Task.Delay(1000);
                //        logger.LogInformation($"Completed Task {i}");
                //    }
                //}
                //catch (Exception ex)
                //{
                //    logger.LogInformation($"{ex.Message}");
                //}
                #endregion

                var query = context.Activities.OrderBy(x => x.Date)
                    .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                    .AsQueryable();
                if (!string.IsNullOrEmpty(request.Params.Filter))
                {

                    query = request.Params.Filter switch
                    {
                        "isHost" => query.Where(x => x.attendees.Any(a => a.IsHost && a.UserId == userAccessor.UserId())),
                        "isGoing" => query.Where(x => x.attendees.Any(a => a.UserId == userAccessor.UserId())),
                        _ => query
                    };
                }

                var projectedActivities = query.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.UserId() });

                var activities = await projectedActivities
                    .Take(request.Params.PageSize + 1)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if (activities.Count > request.Params.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(activities.Count - 1);
                }

                return Result<PagedList<ActivityDTO, DateTime?>>.Success(new PagedList<ActivityDTO, DateTime?>() { Items = activities, NextCursor = nextCursor });
            }
        }
    }
}
