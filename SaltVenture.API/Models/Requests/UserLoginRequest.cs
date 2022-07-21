using System.ComponentModel.DataAnnotations;

namespace SaltVenture.API.Models.Request;

public class UserLoginRequest
{
    [Required]
    public string? Email { get; set; }
    [Required]
    [DataType(DataType.Password)]
    [MinLength(8,ErrorMessage = "Password has to be at least 8 characters!")]
    public string? Password { get; set; }
}
