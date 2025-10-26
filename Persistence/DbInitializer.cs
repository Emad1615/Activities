using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DbInitializer
    {
        public static async Task SeedData(AppDbContext context, UserManager<UserApplication> userManager)
        {
            if (!userManager.Users.Any())
            {

                var users = new List<UserApplication> {
                    new UserApplication{ DisplayName="Emad",UserName="emad@gmail.com",Email="emad@gamil.com" ,Bio="Software developer ,Programming, fullstack developer, react developer , backend developer", BirthDate=new DateTime(1995,10,18)},
                    new UserApplication{ DisplayName="Farida",UserName="farida@gmail.com",Email="farida@gamil.com",Bio="baby home ", BirthDate=new DateTime(2023,03,28)},
                    new UserApplication{ DisplayName="Dalida",UserName="dalida@gmail.com",Email="dalida@gamil.com",Bio="baby home (comming soon in shaAllah) ", BirthDate=new DateTime(2023,03,28)},
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "123456");
                }
            }
            if (!context.NotificationTypes.Any())
            {
                List<NotificationType> types = new List<NotificationType>()
                {
                    new (){Type="Add Activity" },
                    new (){Type="Add Comment" },
                    new (){Type="Going To Event" },
                    new (){Type="Cancel Attendence" },
                    new (){ Type="Cancelled Activtiy"},
                    new (){ Type="Follow"}
                };
                await context.NotificationTypes.AddRangeAsync(types);
                await context.SaveChangesAsync();
            }
            if (context.Activities.Any()) return;

            var _userList = await context.Users.ToListAsync();
            List<Activity> activities = new List<Activity> {
                new Activity {
                    Title = "World wise activity",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "let's discover the open world ",
                    Category = "travel",
                    City = "London",
                    Venue = "Pub",
                    latitude= 48.8566,
                    longitude= 2.3522,
                    attendees=[
                            new (){ UserId=_userList[0].Id ,IsHost=true},
                            new (){ UserId=_userList[1].Id ,IsHost=false},
                            new (){ UserId=_userList[2].Id ,IsHost=false},
                        ]
                    },
                 new Activity
                {
                    Title = "Holla at me",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "drink",
                    City = "Paris",
                    Venue = "Louvre",
                    latitude= 51.5074,
                    longitude= -0.1278,
                      attendees=[
                            new (){ UserId=_userList[0].Id ,IsHost=false},
                            new (){ UserId=_userList[1].Id ,IsHost=true},
                            new (){ UserId=_userList[2].Id ,IsHost=false},
                        ]
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                    latitude= 52.3676,
                    longitude= 4.9041,
                      attendees=[
                            new (){ UserId=_userList[0].Id ,IsHost=false},
                            new (){ UserId=_userList[1].Id ,IsHost=false},
                            new (){ UserId=_userList[2].Id ,IsHost=true},
                        ]
                },
            };
            await context.AddRangeAsync(activities);

            if (!context.NotificationTypes.Any())
            {
                List<NotificationType> types = new List<NotificationType>()
                {
                    new (){Type="Add Activity" },
                    new (){Type="Add Comment" },
                    new (){Type="Going To Event" },
                    new (){Type="Cancel Attendence" },
                    new (){ Type="Cancelled Activtiy"},
                    new (){ Type="Follow"}
                };

                await context.NotificationTypes.AddRangeAsync(types);
            }
            await context.SaveChangesAsync();
        }
    }
}
