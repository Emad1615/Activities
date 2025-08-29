using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class UploadPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public required IFormFile file { get; set; }
        }
        public class Handler(AppDbContext context, IPhotoService photoService, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Photo>>
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var uploadResult = await photoService.AddPhoto(request.file);
                if (uploadResult is null) return Result<Photo>.Failure("An Error occured duirng upload photo to the cloud please try again or call technical support", 400);
                var user = await userAccessor.GetUserAsync();
                var photo = new Photo()
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.Url,
                    UserId = user.Id
                };
                if (string.IsNullOrEmpty(user.ImageUrl))
                    user.ImageUrl = uploadResult.Url;
                //user.ImageUrl ??= uploadResult.Url;
                await context.Photos.AddAsync(photo, cancellationToken);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Photo>.Success(photo) : Result<Photo>.Failure("An error occured during save file at DB", 400);
            }
        }
    }
}
