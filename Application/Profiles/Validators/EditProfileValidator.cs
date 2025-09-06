using Application.Profiles.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.Validators
{
    public class EditProfileValidator : AbstractValidator<EditProfile.Command>
    {
        public EditProfileValidator()
        {
            RuleFor(x => x.userProfile.DisplayName).NotEmpty().WithMessage("DisplayName is required");
            RuleFor(x => x.userProfile.BirthDate).NotEmpty().WithMessage("BirthDate is required");
            RuleFor(x => x.userProfile.Gender).NotNull().WithMessage("Gender is required");
        }
    }
}
