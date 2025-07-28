
namespace Application.Activities.DTOs
{
    public class BaseActivityDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        //Location Props
        public string City { get; set; } = string.Empty;
        public string Venue { get; set; } = string.Empty;
        public int longitude { get; set; }
        public int latitude { get; set; }
    }
}
