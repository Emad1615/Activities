using Application.Profiles.DTOS;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.DTOs
{
    public class ActivityDTO : BaseActivityDTO
    {
        public required string Id { get; set; }
        public string? HostDisplayName { get; set; }
        public string? HostUserId { get; set; }
        public bool IsCancelled { get; set; }
        public string Status => IsCancelled ? "Cancelled ✖️✖️✖️" : "Active ✔️✔️✔️";
        public ICollection<UserProfile> attendees { get; set; } = [];
    }
}
