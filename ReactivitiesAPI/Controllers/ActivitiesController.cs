using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController(AppDbContext context, IMediator mediator) : BaseApiController
    {

        [HttpGet("GetActivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivitiesList.Query());
        }
        [HttpGet("GeActivity")]
        public async Task<ActionResult<Activity>> GeActivity(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query() { Id = id });
        }
        [HttpPost("CreateActivity")]
        public async Task<ActionResult<string>> CreateActivity(Activity activity)
        {
            return await Mediator.Send(new CreateActivity.Command() { activity = activity });
        }
        [HttpPut("EditActivity")]
        public async Task<ActionResult> EditActivity(Activity activity)
        {
            await Mediator.Send(new EditAcivity.Command() { Activity = activity });
            return NoContent();
        }
        [HttpDelete("DeleteActivity")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            await Mediator.Send(new DeleteActivity.Command() { Id = id });
            return NoContent();
        }

    }
}
