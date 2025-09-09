using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence
{
    public class AppDbContext : IdentityDbContext<UserApplication>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public required DbSet<Activity> Activities { get; set; }
        public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public required DbSet<Photo> Photos { get; set; }
        public required DbSet<Comment> Comments { get; set; }
        public required DbSet<NotificationType> NotificationTypes { get; set; }
        public required DbSet<Notification> Notifications { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.UserId, a.ActivityId }));
            builder.Entity<ActivityAttendee>()
                .HasOne(x => x.Activity)
                .WithMany(x => x.attendees)
                .HasForeignKey(x => x.ActivityId);
            builder.Entity<ActivityAttendee>()
                .HasOne(x => x.User)
                .WithMany(x => x.Activities)
                .HasForeignKey(x => x.UserId);

            builder.Entity<Notification>()
                 .HasOne(x => x.Notifier)
                 .WithMany(x => x.SentNotifications)
                 .HasForeignKey(x => x.NotifierId)
                 .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Notification>()
                .HasOne(x=>x.Receiver)
                .WithMany(x=>x.ReceivedNotifications)
                .HasForeignKey(x=>x.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Notification>()
                .HasOne(x => x.Activity)
                .WithMany(x => x.Notifications)
                .HasForeignKey(x => x.ActivityId)
                .OnDelete(DeleteBehavior.Cascade);


            var DateTimeConveter = new ValueConverter<DateTime, DateTime>(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
                );
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(DateTimeConveter);
                    }
                }
            }

        }
    }
}
