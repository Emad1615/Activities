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
            return await mediator.Send(new GetActivitiesList.Query());
        }
        [HttpGet("GeActivity")]
        public async Task<ActionResult<Activity>> GeActivity(Guid id)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity != null)
                return activity;
            else return NotFound();
        }
    }
}
