using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public string ID { get; set; } = Guid.NewGuid().ToString();
        public required string Body { get; set; }
        public DateTime CreateDateTime { get; set; } = DateTime.UtcNow;

        // Nav props
        public required string UserId { get; set; }
        public UserApplication User { get; set; } = null!;
        public required string ActivityId { get; set; }
        public Activity Activity { get; set; } = null!;
    }
}
