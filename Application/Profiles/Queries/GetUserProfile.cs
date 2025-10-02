﻿using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOS;
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

namespace Application.Profiles.Queries
{
    public class GetUserProfile
    {
        public class Query : IRequest<Result<UserProfile>>
        {
            public required string UserId { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper,IUserAccessor userAccessor) : IRequestHandler<Query, Result<UserProfile>>
        {
            public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.ProjectTo<UserProfile>(mapper.ConfigurationProvider, new { currentUser = userAccessor.UserId() }).FirstOrDefaultAsync(x => x.ID == request.UserId, cancellationToken);
                return user is null ?
                    Result<UserProfile>.Failure("User not found", 404) :
                    Result<UserProfile>.Success(user);
            }
        }
    }
}
