using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetActivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }
        [HttpGet("GeActivity")]
        public async Task<ActionResult<Activity>> GeActivity(Guid id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity != null)
                return activity;
            else return NotFound();
        }
    }
}
