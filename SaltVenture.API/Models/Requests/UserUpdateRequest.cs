using System.ComponentModel.DataAnnotations;

namespace SaltVenture.API.Models.Request;

public class UserUpdateRequest
{
    [MinLength(3)]
    [RegularExpression("^[a-zA-Z0-9]*$", ErrorMessage = "Only Letters and Numbers allowed.")]
    public string? Username { get; set; }
    
    [DataType(DataType.Password)]
    [MinLength(8)]
    public string? Password { get; set; }
}
