using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.EmailService
{
    public class EmailSender(IResend resend, IConfiguration configuration) : IEmailSender<UserApplication>
    {
        public async Task SendConfirmationLinkAsync(UserApplication user, string email, string confirmationLink)
        {
            var subject = "E-mail confirmation 😉";
            var body = $@"
                          <p>Hi {user.UserName} 👋</p>
                          <p>Please Confirm you email account by click on the below link ⬇️</p>
                          <p><a type='button' href={confirmationLink} style='padding:10px 30px;color:white;border:none;background-color:tomato;margin:8px'>Click Me my bro</a></p>
                          <p>Thanks bro 😍</p>
                        ";
            await SendEmailAsync(email, subject, body);
        }



        public async Task SendPasswordResetCodeAsync(UserApplication user, string email, string resetCode)
        {
            var subject = "Password Reset Code 🔐";
            var body = $@"
                          <p>Hi {user.UserName} 👋</p>
                          <p>Your password reset code is ⬇️</p>
                          <p><a type='button' href='{configuration["frontend_urls"]}/reset-password?email={email}&resetCode={resetCode}' 
                                style='padding:8px 28;color:white;border:none;background-color:#10b75b;margin:12px'>
                             Click me to reset password 🔗
                            </a>
                          </p>
                          <p>If you didn't request a password reset, please ignore this email.</p>
                          <p>Thanks bro 😍</p>
                        ";
            await SendEmailAsync(email, subject, body);

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
            await resend.EmailSendAsync(message);
        }
    }
}
