namespace SaltVenture.API.Models.Responses;

public class UserAuthResponse 
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public int Balance { get; set; }
    public string? Token {get; set;}
    
}
