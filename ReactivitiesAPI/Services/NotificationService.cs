using API.SignalR;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.SignalR;

namespace API.Services
{
    public class NotificationService(IHubContext<NotificationHub> notificationHubContext) : INotificationService
    {

        public async Task SendNotificationAsync(Notification notification, string? NotifierName = null)
        {
            if (notification.ForAll)
            {
                await notificationHubContext.Clients.All.SendAsync("ReceiveNotification",
                    new
                    {
                        notification.ID,
                        notification.Description,
                        notification.NotificationTypeId,
                        notification.IsRead,
                        notification.ReadDateTime,
                        notification.IsHidden,
                        notification.HiddenDateTime,
                        notification.ForAll,
                        notification.NotifierId,
                        NotifierName,
                        notification.CreatedAt,
                    }
                );
            }
            else if (!string.IsNullOrEmpty(notification.ReceiverId))
            {
                await notificationHubContext.Clients.User(notification.ReceiverId).SendAsync("ReceiveNotification",
                   new
                   {
                       notification.ID,
                       notification.Description,
                       notification.NotificationTypeId,
                       notification.IsRead,
                       notification.ReadDateTime,
                       notification.IsHidden,
                       notification.HiddenDateTime,
                       notification.NotifierId,
                       NotifierName,
                       notification.CreatedAt,
                   }
               );
            }
        }
        async Task INotificationService.SendNotificationAsync(List<Notification> notifications, string? NotifierName)
        {
            List<string> userIds = notifications.Select(x => x.ReceiverId!).ToList();
            var notification = notifications.FirstOrDefault();
            await notificationHubContext.Clients.Users(userIds).SendAsync("ReceiveNotification", new
            {
                notification!.ID,
                notification.Description,
                notification.NotificationTypeId,
                notification.IsRead,
                notification.ReadDateTime,
                notification.IsHidden,
                notification.HiddenDateTime,
                notification.ForAll,
                notification.NotifierId,
                NotifierName,
                notification.CreatedAt,
            });
        }
    }
}
