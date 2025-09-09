using Application.Interfaces;
using Application.Notifications.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.SignalR
{
    public class NotificationHub(IMediator? mediator) : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var result = await mediator!.Send(new GetNotifications.Query { });
            await Clients.Caller.SendAsync("LoadNotifications", result.Value);
        }
    }
}
