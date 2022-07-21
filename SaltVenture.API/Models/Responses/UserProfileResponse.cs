namespace SaltVenture.API.Models.Responses;

public class UserProfileResponse 
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public int Balance { get; set; }
    public List<Bet>? Bets {get; set;}
    
}
