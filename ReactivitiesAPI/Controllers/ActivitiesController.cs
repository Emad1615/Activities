using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{

    public class ActivitiesController() : BaseApiController
    {

        [HttpGet("GetActivities")]
        public async Task<ActionResult<Result<PagedList<ActivityDTO, DateTime?>>>> GetActivities([FromQuery] ActivityParams activityParams, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new GetActivitiesList.Query { Params = activityParams }, cancellation));
        }
        [HttpGet("GetActivity")]
        public async Task<ActionResult<ActivityDTO>> GetActivity(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query() { Id = id }));
        }
        [HttpGet("GetUserActivities")]
        public async Task<ActionResult<List<ActivityDTO>>> GetUserActivities(CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new GetUserActivities.Query() { }, cancellation));
        }
        [HttpPost("CreateActivity")]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDTO)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command() { ActivityDTO = activityDTO }));
        }
        [Authorize(policy: "IsHost")]
        [HttpPut("EditActivity/{id}")]
        public async Task<ActionResult> EditActivity(string id, EditActivityDTO activityDTO)
        {
            return HandleResult(await Mediator.Send(new EditAcivity.Command() { ActivityDTO = activityDTO }));
        }
        [Authorize(policy: "IsHost")]
        [HttpDelete("DeleteActivity/{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command() { Id = id }));

        }
        [HttpPut("{id}/attend")]
        public async Task<ActionResult> UpdateAttendee(string id, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new UpdateActivityAttendees.Command() { Id = id }, cancellation));
        }

    }
}
