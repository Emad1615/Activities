using Application.Core;
using Application.Interfaces;
using Application.Notifications.DTOS;
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

namespace Application.Notifications.Queries
{
    public class GetNotifications
    {
        public class Query : IRequest<Result<List<NotificationDTO>>>
        {
        }
        public class Handler(AppDbContext db, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Query, Result<List<NotificationDTO>>>
        {
            public async Task<Result<List<NotificationDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                if (user == null) return Result<List<NotificationDTO>>.Failure("User not found or Unauthorized", 400);
                var notifications = await db.Notifications
                    .Where(x => x.NotifierId != user.Id && (x.ForAll || x.ReceiverId == user.Id))
                    .ProjectTo<NotificationDTO>(mapper.ConfigurationProvider)
                    .OrderByDescending(x => x.CreatedAt)
                    .ToListAsync();
                return Result<List<NotificationDTO>>.Success(notifications);
            }
        }
    }
}
