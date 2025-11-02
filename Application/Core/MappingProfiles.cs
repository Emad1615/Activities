using Application.Activities.DTOs;
using Application.Notifications.DTOS;
using Application.Profiles.DTOS;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string? currentUserId = null;
            CreateMap<Activity, Activity>().ReverseMap();
            CreateMap<CreateActivityDTO, Activity>().ReverseMap();
            CreateMap<EditActivityDTO, Activity>().ReverseMap();
            CreateMap<Activity, ActivityDTO>()
                .ForMember(d => d.HostDisplayName, o => o.MapFrom(x => x.attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
                .ForMember(d => d.HostUserId, o => o.MapFrom(x => x.attendees.FirstOrDefault(x => x.IsHost)!.User.Id));
            CreateMap<ActivityAttendee, UserProfile>()
                .ForMember(d => d.ID, o => o.MapFrom(x => x.User.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(x => x.User.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(x => x.User.Bio))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(x => x.User.ImageUrl))
                .ForMember(d => d.Gender, o => o.MapFrom(x => x.User.Gender))
                .ForMember(d => d.BirthDate, o => o.MapFrom(x => x.User.BirthDate))
                .ForMember(d => d.IsHost, o => o.MapFrom(x => x.IsHost))
                .ForMember(d => d.Following, o => o.MapFrom(x => x.User.Followers.Any(x => x.ObserverId == currentUserId)))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(x => x.User.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(x => x.User.Followings.Count));
            CreateMap<UserApplication, UserProfile>()
                           .ForMember(x => x.Following, o => o.MapFrom(x => x.Followers.Any(f => f.Observer.Id == currentUserId)))
                           .ForMember(d => d.FollowersCount, o => o.MapFrom(x => x.Followers.Count))
                           .ForMember(d => d.FollowingCount, o => o.MapFrom(x => x.Followings.Count))
                           .ForMember(d=>d.IsCurrentUser,o=>o.MapFrom(x=>x.Id==currentUserId)); 
            CreateMap<Comment, CommentDTO>()
                .ForMember(d => d.UserId, o => o.MapFrom(x => x.User.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(x => x.User.UserName))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(x => x.User.ImageUrl));
            CreateMap<Notification, NotificationDTO>()
                .ForMember(d => d.NotifierId, o => o.MapFrom(x => x.Notifier.Id))
                .ForMember(d => d.NotifierName, o => o.MapFrom(x => x.Notifier.DisplayName))
                .ForMember(d => d.NotifierImageUrl, o => o.MapFrom(x => x.Notifier.ImageUrl));

        }
    }
}
