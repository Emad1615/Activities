using Application.Notifications.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NotificationsController : BaseApiController
    {
        [HttpPut("readNotification")]
        public async Task<ActionResult> ReadNotification(string id, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new ReadNotification.Command { Id = id }, cancellation));
        }
        [HttpPut("hideNotification")]

        public async Task<ActionResult> HideNotification(string id, CancellationToken cancellation)
        {
            return HandleResult(await Mediator.Send(new HideNotification.Command { Id = id }, cancellation));
        }
    }
}
