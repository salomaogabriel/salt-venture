namespace SaltVenture.API.Models;

public class Game 
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool? Exists { get; set; }
    public int TimesPlayed { get; set; }
}
