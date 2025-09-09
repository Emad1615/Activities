using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationAsync(Notification notification, string? NotifierName = null);
        Task SendNotificationAsync(List<Notification> notification, string? NotifierName = null);
    }
}
