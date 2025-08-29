using Application.Profiles.Commands;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpPost("Add-Photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new UploadPhoto.Command { file = file }, cancellation));
        }
        [HttpDelete("{id}/delete-photo")]
        public async Task<ActionResult> DeletePhoto(string id, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }, cancellation));
        }
        [HttpPut("{id}/setMain-photo")]
        public async Task<ActionResult> SetMainPhoto(string id, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new SetAsMainPhoto.Command { Id = id }, cancellation));
        }
        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> ProfilePhotos(string userId, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }, cancellation));
        }
        [HttpGet("{userId}/user-profile")]
        public async Task<ActionResult<List<Photo>>> UserProfile(string userId, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new GetUserProfile.Query { UserId = userId }, cancellation));
        }
    }
}
