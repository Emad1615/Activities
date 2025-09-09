using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Notification
    {
        public string ID { get; set; } = Guid.NewGuid().ToString();
        public required string Description { get; set; }
        public bool IsRead { get; set; }
        public DateTime? ReadDateTime { get; set; }
        public bool IsHidden { get; set; }
        public DateTime? HiddenDateTime { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool ForAll { get; set; }
        // nav props
        public required int NotificationTypeId { get; set; }
        public NotificationType NotificationType { get; set; } = null!;
        public required string NotifierId { get; set; }
        public UserApplication Notifier { get; set; } = null!;
        public string? ReceiverId { get; set; }
        public UserApplication Receiver { get; set; } = null!;

        public string? ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
    }
}
