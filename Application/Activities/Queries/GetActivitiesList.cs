using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
    public class GetActivitiesList
    {
        public class Query : IRequest<Result<List<ActivityDTO>>> { }
        public class Handler(AppDbContext context, ILogger<GetActivitiesList> logger, IMapper mapper) : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
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

                var activities = await context.Activities
                    .AsNoTracking()
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
                if (activities.Count() == 0 || activities is null)
                {
                    logger.LogInformation("No Activities in Database");
                    return Result<List<ActivityDTO>>.Failure("No Activities in Database", 404);
                }
                return Result<List<ActivityDTO>>.Success(activities);
            }
        }
    }
}
