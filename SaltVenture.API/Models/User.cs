namespace SaltVenture.API.Models;

public class User 
{
    public int Id { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public int Balance { get; set; }
    public bool IsActive { get; set; } = true;
    public List<Bet>? Bets {get; set;}
    
}
