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

            public DateTime? Cursor { get; set; }
            private int _pageSize = 3;

            public int PageSize
            {
                get => _pageSize;
                set => _pageSize = value > MaximumPageSize ? MaximumPageSize : value;
            }

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

                var query = context.Activities.OrderBy(x => x.Date).AsQueryable();

                if (request.Cursor.HasValue)
                {
                    query = query.Where(x => x.Date > request.Cursor.Value);
                }

                var activities = await query
                    .Take(request.PageSize + 1)
                    .AsNoTracking()
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.UserId() }).ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if (activities.Count > request.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(activities.Count - 1);
                }



                if (activities.Count() == 0 || activities is null)
                {
                    logger.LogInformation("No Activities in Database");
                    return Result<PagedList<ActivityDTO, DateTime?>>.Failure("No Activities in Database", 404);
                }
                return Result<PagedList<ActivityDTO, DateTime?>>.Success(new PagedList<ActivityDTO, DateTime?>() { Items = activities, NextCursor = nextCursor });
            }
        }
    }
}
