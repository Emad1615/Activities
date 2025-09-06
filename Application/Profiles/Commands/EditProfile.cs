using Application.Core;
using Application.Profiles.DTOS;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Commands
{
    public class EditProfile
    {
        public class Command : IRequest<Result<Unit>> {
            public required UserProfile userProfile { get; set; }
        }
        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FindAsync([request.userProfile.ID], cancellationToken);
                if (user is null) return Result<Unit>.Failure("User not found...!", 400);
                user.DisplayName=request.userProfile.DisplayName;
                user.BirthDate=request.userProfile.BirthDate;
                user.Gender = request.userProfile.Gender.HasValue ? request.userProfile.Gender.Value : null;
                user.Bio= request.userProfile.Bio;
                user.PhoneNumber=string.IsNullOrEmpty(request.userProfile.PhoneNumber)?user.PhoneNumber : request.userProfile.PhoneNumber;
                var result=await context.SaveChangesAsync()>0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("An error occured during update info please try again or call technical support", 400);
            }
        }
    }
}
