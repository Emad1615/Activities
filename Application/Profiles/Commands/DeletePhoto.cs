using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext context, IPhotoService photoService, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();
                if (user is null) return Result<Unit>.Failure("No user logged in", 400);
                var photo = user.Photo.FirstOrDefault(x => x.Id == request.Id);
                if (photo is null) return Result<Unit>.Failure("No photo with this id", 404);
                if (photo.Url == user.ImageUrl) return Result<Unit>.Failure("You cannot delete your main photo", 400);
                var deleteResult = await photoService.DeletePhoto(photo.PublicId);
                if (deleteResult.Error is not null)
                {
                    return Result<Unit>.Failure(deleteResult.Error.Message, 400);
                }
                context.Photos.Remove(photo);
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("an error occured during delete photo...!", 400);
            }
        }
    }
}
