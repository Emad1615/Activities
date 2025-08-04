using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class RegisterDTO
    {
        [Required(ErrorMessage ="UserName is required")]
        public string DisplayName { get; set; } = "";
        [Required(ErrorMessage ="Email is required")]
        [EmailAddress()]
        public string Email { get; set; } = "";
        //Identity will handle passowrd validation like  complixety password
        public string Password { get; set; } = "";
    }
}
