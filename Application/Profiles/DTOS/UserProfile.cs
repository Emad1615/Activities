using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles.DTOS
{
    public class UserProfile
    {
        public required string ID { get; set; }
        public required string DisplayName { get; set; }
        public string? Bio { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public bool Gender { get; set; }
        public DateTime? BirthDate { get; set; } = null;
        public bool IsHost { get; set; }

    }
}
