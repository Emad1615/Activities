using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators
{
    public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
    {
        public CreateActivityValidator()
        {
            RuleFor(x => x.ActivityDTO.Title).NotEmpty().WithMessage("Title is Required");
            RuleFor(x => x.ActivityDTO.Description).NotEmpty().WithMessage("Description is Required");
            RuleFor(x => x.ActivityDTO.Category).NotEmpty().WithMessage("Category is Required");
            RuleFor(x => x.ActivityDTO.City).NotEmpty().WithMessage("City is Required");
            RuleFor(x => x.ActivityDTO.Venue).NotEmpty().WithMessage("Venue is Required");
            RuleFor(x => x.ActivityDTO.Date).NotEmpty().WithMessage("Date is Required");
        }
    }
}
