using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Commands
{
    public class AddComment
    {
        public class Command : IRequest<Result<CommentDTO>>
        {
            public required string ActivityId { get; set; }
            public required string Body { get; set; }
        }
        public class Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<CommentDTO>>
        {
            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .Where(x => x.Id == request.ActivityId)
                    .Include(x => x.Comments)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(cancellationToken);
                if (activity == null) return Result<CommentDTO>.Failure("Activity not found", 400);
                var comment = new Comment
                {
                    ActivityId = request.ActivityId,
                    Body = request.Body,
                    UserId = userAccessor.UserId()
                };
                activity.Comments.Add(comment);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<CommentDTO>.Success(mapper.Map<CommentDTO>(comment))
                    : Result<CommentDTO>.Failure("An error occured during add comment to Database", 400);
            }
        }
    }
}
