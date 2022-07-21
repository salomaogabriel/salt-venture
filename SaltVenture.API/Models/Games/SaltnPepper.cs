namespace SaltVenture.API.Models.Games;

public class SaltnPepper
{
    public int Id { get; set; }
    public User? User {get;set;}
    public Bet? Bet {get; set;}
    public bool IsCompleted {get; set;}
    public string? Grid {get; set;}
    public int PepperNumbers {get; set;}
    public int NumberOfPicks {get; set;}

}
