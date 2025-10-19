using Microsoft.EntityFrameworkCore;

namespace Domain
{
    [Index(nameof(Date))]
    public class Activity
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCancelled { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; } = string.Empty;
        public string Venue { get; set; } = string.Empty;
        public double longitude { get; set; }
        public double latitude { get; set; }
        public ICollection<ActivityAttendee> attendees { get; set; } = [];
        public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<Notification> Notifications { get; set; } = [];
    }
}
