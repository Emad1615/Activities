using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class SetAsMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();
                if (user is null) return Result<Unit>.Failure("No user logged in", 400);
                var photo = user.Photo.FirstOrDefault(x => x.Id == request.Id);
                if (photo is null) return Result<Unit>.Failure("No photo with this id", 404);
                user.ImageUrl = photo.Url;
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("An error occured during set photo as main profile photo or already this is a main photo...!", 400);
            }
        }
    }
}
