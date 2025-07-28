using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController() : BaseApiController
    {

        [HttpGet("GetActivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            return await Mediator.Send(new GetActivitiesList.Query(), ct);
        }
        [HttpGet("GetActivity")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query() { Id = id }));
        }
        [HttpPost("CreateActivity")]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDTO)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command() { ActivityDTO = activityDTO }));
        }
        [HttpPut("EditActivity")]
        public async Task<ActionResult> EditActivity(EditActivityDTO activityDTO)
        {
            return HandleResult(await Mediator.Send(new EditAcivity.Command() { ActivityDTO = activityDTO }));
        }
        [HttpDelete("DeleteActivity")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command() { Id = id }));

        }

    }
}
