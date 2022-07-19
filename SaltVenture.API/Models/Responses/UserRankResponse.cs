namespace SaltVenture.API.Models.Responses;

public class UserRankResponse 
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public int Balance { get; set; }
    public UserRankResponse(User user)
    {
        Id = user.Id;
        Username = user.Username;
        Balance = user.Balance;
    }    
}
