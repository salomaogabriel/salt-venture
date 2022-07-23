namespace SaltVenture.API.Models;

public enum BetStatus { Finished, NotFinished };
public class Bet
{
    public int Id { get; set; }
    public int Game { get; set; }
    public BetStatus Status { get; set; }
    public int Amount { get; set; }
    public double Multiplier {get; set;}
    public int Balance {get; set;}
    public DateTime Date {get; set;}
    public User? User {get; set;}
    public Bet()
    {
        Date = DateTime.Now;
    }
    
}
