using Domain;
using Microsoft.AspNetCore.Identity;
using Resend;

namespace Infrastructure.EmailService
{
    public class EmailSender(IResend resend) : IEmailSender<UserApplication>
    {
        public async Task SendConfirmationLinkAsync(UserApplication user, string email, string confirmationLink)
        {
            var subject = "E-mail confirmation 😉";
            var body = $@"
                          <p>Hi {user.UserName} 👋</p>
                          <p>Please Confirme you email account by click on the below link ⬇️</p>
                          <p><a type='button' href={confirmationLink} style='padding:15px 30px;color:white;border:none;background-color:tomato'>Click Me my bro</a></p>
                          <p>Thanks my bro 😍</p>
                        ";
            await SendEmailAsync(email, subject, body);
        }

       

        public Task SendPasswordResetCodeAsync(UserApplication user, string email, string resetCode)
        {
            throw new NotImplementedException();
        }

        public Task SendPasswordResetLinkAsync(UserApplication user, string email, string resetLink)
        {
            throw new NotImplementedException();
        }
        private async Task SendEmailAsync(string email, string subject, string body)
        {
            var message = new EmailMessage()
            {
                From = "onboarding@resend.dev",
                Subject = subject,
                HtmlBody = body
            };
            message.To.Add(email);
            //await resend.EmailSendAsync(message); 
            Console.WriteLine(message.HtmlBody);
        }
    }
}
