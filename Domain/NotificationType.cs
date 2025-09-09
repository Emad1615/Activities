using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class NotificationType
    {
        public int ID { get; set; }
        public required string Type { get; set; }
        public ICollection<Notification> Notifications { get; set; } = [];
    }
}
