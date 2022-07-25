namespace SaltVenture.API.Models.Games;

public class Hangman
{
    public int Id { get; set; }
    public User? User { get; set; }
    public Bet? Bet { get; set; }
    public bool IsCompleted { get; set; }
    public string? Word { get; set; }
    public int WordLength { get; set; }
    public int WordPickAmount { get; set; }
    public List<LetterPick>? UserWord { get; set; }

}

public class LetterPick
{
    public string? Letter { get; set; }
}