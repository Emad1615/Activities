using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Notifications.DTOS
{
    public class NotificationDTO
    {
        public required string ID { get; set; }
        public required string Description { get; set; }
        public bool IsRead { get; set; }
        public DateTime ReadDateTime { get; set; }
        public bool IsHidden { get; set; }
        public DateTime HiddenDateTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool ForAll { get; set; }
        public required string NotifierId { get; set; }
        public required string NotifierName { get; set; }
        public string? NotifierImageUrl { get; set; }
    }
}
