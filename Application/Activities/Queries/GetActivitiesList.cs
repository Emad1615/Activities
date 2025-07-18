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
        public class Query : IRequest<List<Activity>> { }
        public class Handler(AppDbContext context, ILogger<GetActivitiesList> logger) : IRequestHandler<Query, List<Activity>>
        {
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                #region CancellationToken Purpose
                // this section of code for cancellation op process when end user cancel the request  aim of CancellationToken
                try
                {
                    for (int i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000);
                        logger.LogInformation($"Completed Task {i}");
                    }
                }
                catch (Exception ex)
                {
                    logger.LogInformation($"{ex.Message}");
                }
                #endregion
                return await context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
