namespace SaltVenture.API.Models.Games;

public enum TowerLevels {Easy, Medium, Hard, Master, Expert};
public class Tower
{
    public int Id { get; set; }
    public User? User {get;set;}
    public Bet? Bet {get; set;}
    public bool IsCompleted {get; set;}
    public string? Grid {get; set;}
    public int Floor {get; set;}
    public TowerLevels Level {get; set;}

}
