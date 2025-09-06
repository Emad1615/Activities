using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
    public class GetUserActivities
    {
        public class Query : IRequest<Result<List<ActivityDTO>>>
        {
        }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await context.Activities.AsNoTracking()
                    .Where(x => x.attendees.Any(a => a.UserId == userAccessor.UserId()))
                    .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                if (activities is null) return Result<List<ActivityDTO>>.Failure("No activities created by this user till now", 400);
                return Result<List<ActivityDTO>>.Success(activities);
            }
        }
    }
}
