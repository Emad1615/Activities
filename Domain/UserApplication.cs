using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserApplication : IdentityUser
    {
        public string? DisplayName { get; set; } = string.Empty;
        public string? Bio { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; } = null;
        public bool? Gender { get; set; } = true; // 1 for male , 0 for female
        public ICollection<ActivityAttendee> Activities { get; set; } = [];
        public ICollection<Photo> Photo { get; set; } = [];
    }
}
