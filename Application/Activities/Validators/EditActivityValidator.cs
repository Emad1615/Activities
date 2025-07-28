using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Validators
{
    public class EditActivityValidator : BaseActivityValidator<EditAcivity.Command, EditActivityDTO>
    {
        public EditActivityValidator() : base(x => x.ActivityDTO)
        {
            RuleFor(x => x.ActivityDTO.Id).NotEmpty().WithMessage("Id is required");
        }
    }
}
