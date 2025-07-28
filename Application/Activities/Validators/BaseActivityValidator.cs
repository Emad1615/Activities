using Application.Activities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Validators
{
    public class BaseActivityValidator<T, DTO> : AbstractValidator<T> where DTO : BaseActivityDTO
    {
        public BaseActivityValidator(Func<T, DTO> selector)
        {
            RuleFor(x => selector(x).Title).NotEmpty()
                .WithMessage("Title is Required")
                .MaximumLength(100).WithMessage("Title must be less than 100 character");
            RuleFor(x => selector(x).Description).NotEmpty()
                .WithMessage("Description is Required")
                .MaximumLength(700).WithMessage("Description must be less than 100 character");
            RuleFor(x => selector(x).Category)
                .NotEmpty().WithMessage("Category is Required");
            RuleFor(x => selector(x).City)
                .NotEmpty().WithMessage("City is Required");
            RuleFor(x => selector(x).Venue)
                .NotEmpty().WithMessage("Venue is Required");
            RuleFor(x => selector(x).Date)
                .NotEmpty().WithMessage("Date is required")
                .GreaterThan(DateTime.UtcNow).WithMessage("Date is must be in he future not past");
            RuleFor(x => selector(x).latitude)
               .NotEmpty().WithMessage("Location coordinates (ltd) is required")
               .ExclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90 deg");
            RuleFor(x => selector(x).longitude)
              .NotEmpty().WithMessage("Location coordinates (lng)  is required")
              .ExclusiveBetween(-180, 180).WithMessage("Latitude must be between -180 and 180 deg");
        }
    }
}
